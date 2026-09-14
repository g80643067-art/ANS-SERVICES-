import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type, Schema } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Initialize Gemini Client
let ai: GoogleGenAI | null = null;
try {
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
} catch (error) {
  console.error("Failed to initialize Gemini Client:", error);
}

const systemInstruction = `You are the AI Voice Receptionist and interactive navigator for ANX Agency (anx.agency).
Your goal is to guide visitors, answer their questions about services, and trigger appropriate frontend website demos when they ask to see examples of our work.

Keep your responses VERY SHORT, conversational, and completely in Hinglish (Hindi written in English alphabet).
DO NOT use markdown, emojis, or long paragraphs. Speak like a friendly human receptionist.

AVAILABLE ACTIONS (Trigger these to change the website view):
SHOW_SALON_DEMO : Open Salon / Beauty Parlour / Spa demo.
SHOW_TUITION_DEMO : Open Fashion / Clothing Store demo.
SHOW_PIZZA_DEMO : Open Restaurant / Cafe / Pizza demo.
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

app.post("/api/voice-agent", async (req, res) => {
  const { transcript, history = [], context = {} } = req.body;
  
  if (!transcript || typeof transcript !== "string") {
    return res.status(400).json({ error: "Transcript is required." });
  }

  // Fallback keyword handler if API is unavailable, rate limited, or slow
  const getLocalFallback = (text: string) => {
    const lower = text.toLowerCase();
    
    // GREETINGS
    if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey") || lower.includes("namaste") || lower.includes("namaskar") || lower.includes("kya haal")) {
      return { action: "REPLY_ONLY", payload: "", response: "Namaste! Main ANX Agency ka AI assistant hoon. Main aapke business ke liye best website aur demos dikha sakta hoon." };
    }

    // DEMOS
    if (lower.includes("beauty") || lower.includes("makeup") || lower.includes("bridal") || lower.includes("salon") || lower.includes("parlour") || lower.includes("shadi") || lower.includes("shaadi") || lower.includes("wedding") || lower.includes("hair")) {
      return { action: "SHOW_SALON_DEMO", payload: "", response: "Yeh lijiye, hamara luxury salon aur beauty parlour website ka demo." };
    }
    if (lower.includes("cloth") || lower.includes("fashion") || lower.includes("dress") || lower.includes("saree") || lower.includes("jeans") || lower.includes("boutique") || lower.includes("kapd")) {
      return { action: "SHOW_TUITION_DEMO", payload: "", response: "Zaroor, yeh raha hamara modern fashion aur clothing boutique ka demo." };
    }
    if (lower.includes("bakery") || lower.includes("cake") || lower.includes("pastry") || lower.includes("biscuit") || lower.includes("sweet")) {
      return { action: "SHOW_BAKERY_DEMO", payload: "", response: "Bilkul! Bakery aur cake store ka live demo aapke saamne hai." };
    }
    if (lower.includes("pizza") || lower.includes("food") || lower.includes("restaurant") || lower.includes("khana") || lower.includes("cafe") || lower.includes("burger") || lower.includes("menu")) {
      return { action: "SHOW_PIZZA_DEMO", payload: "", response: "Bilkul, main aapko hamari restaurant aur food ordering website ka live demo dikhata hoon." };
    }
    if (lower.includes("ecommerce") || lower.includes("online store") || lower.includes("shopping") || lower.includes("shop") || lower.includes("product") || lower.includes("mart") || lower.includes("business")) {
      return { action: "SHOW_BUSINESS_DEMO", payload: "", response: "Main aapko hamare modern e-commerce platform ka demo dikhata hoon." };
    }
    if (lower.includes("electronic") || lower.includes("mobile") || lower.includes("laptop") || lower.includes("gadget") || lower.includes("tv") || lower.includes("accessories")) {
      return { action: "SHOW_ELECTRONICS_DEMO", payload: "", response: "Electronics store ka demo open kar raha hoon." };
    }
    
    // NAVIGATION & SECTIONS
    if (lower.includes("about") || lower.includes("bare me") || lower.includes("kaun ho") || lower.includes("agency")) {
      return { action: "OPEN_ABOUT", payload: "", response: "ANX Agency ek modern digital product aur high-converting website agency hai." };
    }
    if (lower.includes("service") || lower.includes("kaam") || lower.includes("kya banate") || lower.includes("features")) {
      return { action: "OPEN_SERVICES", payload: "", response: "Hum custom websites, web applications, e-commerce aur high-speed landing pages banate hain." };
    }
    if (lower.includes("price") || lower.includes("pricing") || lower.includes("cost") || lower.includes("kharcha") || lower.includes("budget") || lower.includes("rate") || lower.includes("charges")) {
      return { action: "OPEN_WHATSAPP", payload: "", response: "Humare website packages bohot budget-friendly hain! WhatsApp par connect ho kar special quotation le lijiye." };
    }
    if (lower.includes("portfolio") || lower.includes("projects") || lower.includes("past work") || lower.includes("work")) {
      return { action: "OPEN_PORTFOLIO", payload: "", response: "Yeh rahe hamare portfolio aur members ki details." };
    }
    if (lower.includes("iska demo") || lower.includes("is member") || lower.includes("ye member") || lower.includes("iska project")) {
      if (context.activeMemberId) {
        return { action: "SHOW_MEMBER_DEMOS", payload: String(context.activeMemberId), response: "Zaroor, is member ke projects ka demo dikhata hoon." };
      } else {
        return { action: "OPEN_DEMO_SITES", payload: "", response: "Zaroor, main aapko hamare demo sites section pe le chalta hoon." };
      }
    }
    if (lower.includes("demo sites") || lower.includes("all demos") || lower.includes("demos dikhao") || lower.includes("demo dikhao") || lower.includes("demo dekhte") || lower.includes("demo")) {
      return { action: "OPEN_DEMO_SITES", payload: "", response: "Yeh lijiye, hamare available live demo websites ki list." };
    }
    if (lower.includes("contact") || lower.includes("sampark") || lower.includes("reach") || lower.includes("baat") || lower.includes("call")) {
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
    return { action: "REPLY_ONLY", payload: "", response: "Main ANX Agency ka AI assistant hoon. Aap mujhse salon, food, bakery, clothes ya electronics website demos dekhne keh sakte hain." };
  };

  try {
    if (!ai && process.env.GEMINI_API_KEY) {
      ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }

    if (!ai) {
      // Immediate instant fallback if no Gemini client
      return res.json(getLocalFallback(transcript));
    }

    // Construct history for Gemini
    const contents = history.map((msg: any) => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));
    contents.push({ role: 'user', parts: [{ text: transcript }] });

    const modelsToTry = ["gemini-3.6-flash", "gemini-flash-latest"];
    let parsed: any = null;

    for (const modelName of modelsToTry) {
      try {
        const generatePromise = ai.models.generateContent({
          model: modelName,
          contents: contents,
          config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: responseSchema,
            temperature: 0.2,
          },
        });

        // 4.5 second timeout safeguard so request never hangs
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Gemini timeout")), 4500)
        );

        const result: any = await Promise.race([generatePromise, timeoutPromise]);
        const text = result?.text;
        if (text) {
          parsed = JSON.parse(text);
          break;
        }
      } catch (err: any) {
        console.warn(`Model ${modelName} notice:`, err?.message || err);
      }
    }

    if (parsed && parsed.response) {
      return res.json(parsed);
    }

    // Fallback if AI was slow or unavailable
    return res.json(getLocalFallback(transcript));
  } catch (error: any) {
    console.error("Error in /api/voice-agent:", error);
    return res.json(getLocalFallback(transcript));
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

  if (!process.env.VERCEL && !process.env.NETLIFY) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}

startServer();

export default app;
