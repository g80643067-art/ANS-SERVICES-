import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type, Schema } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
// We do it lazily or check if key exists
let ai: GoogleGenAI | null = null;
try {
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
} catch (error) {
  console.error("Failed to initialize Gemini Client:", error);
}

app.post("/api/voice-agent", async (req, res) => {
  try {
    if (!ai) {
      if (process.env.GEMINI_API_KEY) {
        ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      } else {
        return res.status(500).json({ error: "GEMINI_API_KEY is missing." });
      }
    }

    const { transcript, history = [], context = {} } = req.body;
    if (!transcript) {
      return res.status(400).json({ error: "Transcript is required." });
    }

    const isDemoActive = context.search?.includes("demo=") || context.hash?.includes("demo=");
    
    const systemInstruction = `You are a premium AI Voice Agent / Receptionist embedded invisibly into the ANX Agency website.
You speak naturally in a mix of Hindi and English (Hinglish).
Keep your responses short, conversational, and professional. Be human-like. Do NOT use emojis.
Remember the context of the conversation.

ANX AGENCY INFORMATION (Use this to answer questions):
- What they do: ANX Agency builds premium, high-conversion modern websites and digital experiences for businesses, startups, and individuals.
- Services: E-commerce, Corporate Websites, Portfolios, 3D WebGL experiences, Custom Web Apps.
- Contact: User can contact via WhatsApp or the contact section.
- Team: Developers like Nikhil (+91 9219694862) and Aditya (+917348382816).
- Timeframe: Depends on the project, usually a few weeks.
- Demos available: Pizza/Restaurant, Salon/Beauty, Fashion/Clothes, Electronics/Gadgets, Bakery, E-commerce.

USER CONTEXT:
Current URL/Page: ${context.url || "Unknown"}
Are they inside a Demo currently?: ${isDemoActive ? "YES" : "NO"}
Currently Selected Portfolio Member ID: ${context.activeMemberId ? context.activeMemberId : "None"}

NAVIGATION RULES - CRITICAL:
1. INTELLIGENT CATEGORY-BASED DEMO DETECTION:
   When the user asks for a specific business category demo, you MUST map it to the correct existing demo. Do NOT fall back to Portfolio.
   - BEAUTY / MAKEUP / BRIDAL / SHAADI / WEDDING (e.g. "beauty", "makeup", "bridal", "salon", "parlour", "shadi", "shaadi", "wedding", "marriage") -> SHOW_SALON_DEMO
   - CLOTHES / FASHION (e.g. "clothes", "clothing", "fashion", "dress", "saree", "jeans", "boutique", "kapdo wali site") -> SHOW_TUITION_DEMO
   - RESTAURANT / FOOD (e.g. "restaurant", "cafe", "food", "pizza", "burger", "menu", "food ordering") -> SHOW_PIZZA_DEMO (or SHOW_BAKERY_DEMO if they ask for bakery/cake)
   - E-COMMERCE / ONLINE STORE (e.g. "ecommerce", "online store", "shopping", "shop", "products") -> SHOW_BUSINESS_DEMO
   - ELECTRONICS (e.g. "electronics", "mobile", "laptop", "gadgets", "TV", "accessories") -> SHOW_ELECTRONICS_DEMO

2. Do NOT automatically navigate to OPEN_PORTFOLIO when the user mentions "demo", "demos", "website demo", etc.
3. If the user asks for a SPECIFIC demo by category (as above) or by name, open that specific demo immediately (e.g. SHOW_SALON_DEMO, SHOW_TUITION_DEMO).
4. If the user just says "demo sites dikhao", "demos dekhte hain", or "demo section me chalo", use the OPEN_DEMO_SITES action.
5. ONLY go to OPEN_PORTFOLIO if the user explicitly mentions "portfolio", "portfolio members", "projects list", "past work", etc. Never use Portfolio as a generic fallback.
6. If the user says "iska demo dikhao", "ye member ka demo dikhao", or "iska project dikhao":
   - If "Currently Selected Portfolio Member ID" is NOT "None", use the action SHOW_MEMBER_DEMOS and set the payload to that ID (e.g. "1" or "2").
   - If it is "None", use OPEN_DEMO_SITES instead.
7. If the user asks to go to the next section or scroll down, use NEXT_SECTION or SCROLL_DOWN.
8. If the user asks to go to the top, use SCROLL_TOP or OPEN_HOME.

Available Actions:
OPEN_HOME : Go to Home/Top of ANX Agency.
OPEN_ABOUT : Go to About section.
OPEN_SERVICES : Go to Services section.
OPEN_PORTFOLIO : Go to Portfolio section.
OPEN_DEMO_SITES: Go directly to the Demo Sites showcase section.
SHOW_MEMBER_DEMOS: Show the demos of a specific member (PAYLOAD: Member ID, e.g. "1" or "2").
OPEN_CONTACT : Go to Contact section.
OPEN_MENU : Open mobile menu.
CLOSE_MENU : Close mobile menu.
NEXT_SECTION : Go to the next relevant section.
SCROLL_TOP : Scroll to top.
SCROLL_DOWN : Scroll down slightly.
SHOW_PIZZA_DEMO : Open Pizza/Food demo.
SHOW_SALON_DEMO : Open Salon/Beauty demo.
SHOW_TUITION_DEMO : Open Tuition/Custom demo (Clothes/Fashion).
SHOW_BUSINESS_DEMO : Open Business/Corporate demo (E-commerce).
SHOW_ELECTRONICS_DEMO: Open Electronics demo.
SHOW_BAKERY_DEMO: Open Bakery demo.
OPEN_WHATSAPP : Redirect to WhatsApp.
RETURN_TO_ANX : Return to ANX Agency from a demo (Back).
REPLY_ONLY : Just chat, no website action needed.

DEMO SPECIFIC ACTIONS (Use only if user is inside a demo OR asks to do something generic like "buy", "cart", "gallery", "menu"):
If the user asks to perform an action on the CURRENT DEMO they are viewing, output a generic action string of your choice in ALL CAPS (e.g., "DEMO_ADD_TO_CART", "DEMO_OPEN_MENU", "DEMO_CHECKOUT", "DEMO_NEXT_SLIDE") that the frontend demo might listen to.

Match the user's intent to the correct action string above, and provide a natural Hinglish response that you will speak.`;

    const responseSchema: Schema = {
      type: Type.OBJECT,
      properties: {
        action: {
          type: Type.STRING,
          description: "One of the predefined action strings or a custom DEMO_ action.",
        },
        payload: {
          type: Type.STRING,
          description: "Keep this empty.",
        },
        response: {
          type: Type.STRING,
          description: "The conversational spoken response in Hinglish.",
        },
      },
      required: ["action", "payload", "response"],
    };

    // Construct history for Gemini
    const contents = history.map((msg: any) => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));
    contents.push({ role: 'user', parts: [{ text: transcript }] });

    // Fallback keyword handler if API is completely unavailable or rate limited
    const getLocalFallback = (text: string) => {
      const lower = text.toLowerCase();
      // INTELLIGENT CATEGORY DETECTION FALLBACK
      if (lower.includes("beauty") || lower.includes("makeup") || lower.includes("bridal") || lower.includes("salon") || lower.includes("parlour") || lower.includes("shadi") || lower.includes("shaadi") || lower.includes("wedding") || lower.includes("marriage")) {
        return { action: "SHOW_SALON_DEMO", payload: "", response: "Yeh lijiye, hamara luxury salon, beauty aur bridal website ka demo." };
      }
      if (lower.includes("cloth") || lower.includes("fashion") || lower.includes("dress") || lower.includes("saree") || lower.includes("jeans") || lower.includes("boutique") || lower.includes("kapd")) {
        return { action: "SHOW_TUITION_DEMO", payload: "", response: "Zaroor, yeh raha fashion aur clothing store ka demo." };
      }
      if (lower.includes("bakery") || lower.includes("cake") || lower.includes("pastry")) {
        return { action: "SHOW_BAKERY_DEMO", payload: "", response: "Bakery ka live demo aapke saamne hai." };
      }
      if (lower.includes("pizza") || lower.includes("food") || lower.includes("restaurant") || lower.includes("khana") || lower.includes("cafe") || lower.includes("burger") || lower.includes("menu")) {
        return { action: "SHOW_PIZZA_DEMO", payload: "", response: "Bilkul, main aapko hamari restaurant aur food ordering website ka live demo dikhata hoon." };
      }
      if (lower.includes("ecommerce") || lower.includes("online store") || lower.includes("shopping") || lower.includes("shop") || lower.includes("product") || lower.includes("business")) {
        return { action: "SHOW_BUSINESS_DEMO", payload: "", response: "Main aapko hamare modern e-commerce platform ka demo dikhata hoon." };
      }
      if (lower.includes("electronic") || lower.includes("mobile") || lower.includes("laptop") || lower.includes("gadget") || lower.includes("tv") || lower.includes("accessories")) {
        return { action: "SHOW_ELECTRONICS_DEMO", payload: "", response: "Electronics store ka demo open kar raha hoon." };
      }
      
      if (lower.includes("about") || lower.includes("bare me") || lower.includes("kaun ho") || lower.includes("agency")) {
        return { action: "OPEN_ABOUT", payload: "", response: "ANX Agency ek modern digital product aur high-converting website agency hai." };
      }
      if (lower.includes("service") || lower.includes("kaam") || lower.includes("kya banate")) {
        return { action: "OPEN_SERVICES", payload: "", response: "Hum custom websites, web applications, e-commerce aur high-speed landing pages banate hain." };
      }
      if (lower.includes("portfolio") || lower.includes("projects") || lower.includes("past work")) {
        return { action: "OPEN_PORTFOLIO", payload: "", response: "Yeh rahe hamare portfolio aur members ki details." };
      }
      if (lower.includes("iska demo") || lower.includes("is member") || lower.includes("ye member") || lower.includes("iska project")) {
        if (context.activeMemberId) {
          return { action: "SHOW_MEMBER_DEMOS", payload: String(context.activeMemberId), response: "Zaroor, is member ke projects ka demo dikhata hoon." };
        } else {
          return { action: "OPEN_DEMO_SITES", payload: "", response: "Zaroor, main aapko hamare demo sites section pe le chalta hoon." };
        }
      }
      if (lower.includes("demo sites") || lower.includes("all demos") || lower.includes("demos dikhao") || lower.includes("demo dikhao") || lower.includes("demo dekhte")) {
        return { action: "OPEN_DEMO_SITES", payload: "", response: "Yeh lijiye, hamare available live demo websites ki list." };
      }
      if (lower.includes("contact") || lower.includes("sampark") || lower.includes("reach") || lower.includes("baat")) {
        return { action: "OPEN_CONTACT", payload: "", response: "Aap niche diye gaye contact form ya direct WhatsApp ke zariye humse connect kar sakte hain." };
      }
      if (lower.includes("whatsapp") || lower.includes("message") || lower.includes("number")) {
        return { action: "OPEN_WHATSAPP", payload: "", response: "Main aapko hamare official WhatsApp par connect kar raha hoon." };
      }
      if (lower.includes("home") || lower.includes("top") || lower.includes("anx") || lower.includes("back") || lower.includes("wapas")) {
        return { action: "RETURN_TO_ANX", payload: "", response: "Theek hai, main aapko wapas le chalta hoon." };
      }
      if (lower.includes("down") || lower.includes("niche") || lower.includes("next")) {
        return { action: "NEXT_SECTION", payload: "", response: "Theek hai, aage scroll kar raha hoon." };
      }
      return { action: "REPLY_ONLY", payload: "", response: "Main ANX Agency ka AI assistant hoon. Aap mujhse website demos dekhne ya hamari services ke baare me pooch sakte hain." };
    };

    const modelsToTry = ["gemini-3.5-flash-lite", "gemini-3.5-flash", "gemini-flash-latest"];
    let lastError: any = null;
    let parsed: any = null;

    for (const modelName of modelsToTry) {
      try {
        const result = await ai.models.generateContent({
          model: modelName,
          contents: contents,
          config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: responseSchema,
            temperature: 0.2,
          },
        });

        const text = result.text;
        if (text) {
          parsed = JSON.parse(text);
          break;
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${modelName} failed, trying next...`, err?.message || err);
      }
    }

    if (parsed) {
      return res.json(parsed);
    }

    // If all models failed, use smart local fallback
    console.warn("All AI models failed, using local fallback intent matcher:", lastError?.message);
    const fallbackResponse = getLocalFallback(transcript);
    res.json(fallbackResponse);
  } catch (error: any) {
    console.error("Error in /api/voice-agent:", error);
    res.json({
      action: "REPLY_ONLY",
      payload: "",
      response: "Ji, main sun raha hoon. Main aapki kya madad kar sakta hoon?",
    });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
