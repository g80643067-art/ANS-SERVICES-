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

const systemInstruction = `You are the natural, live interactive AI website assistant for ANX Agency (anx.agency).
You can talk casually and naturally with visitors AND execute real website actions instantly when commanded.
Keep all spoken responses short, punchy, conversational, and completely in Hinglish (Hindi written in English alphabet).
DO NOT use markdown, emojis, asterisks, or long text. Speak like an energetic, smart digital assistant.

IMPORTANT INTENT RULES:
1. NORMAL CONVERSATION & QUESTIONS:
- When the user asks casual questions, greets you, or asks what you can do (e.g. "Tum kaise ho?", "Tum kya kar sakti ho?", "Aaj kya kar rahe ho?", "ANX kya karta hai?"), DO NOT force a website command!
- Set action: "REPLY_ONLY"
- Give a natural, conversational response in Hinglish.
  Examples:
  User: "Tum kaise ho?" -> response: "Main bilkul ready hoon boss!"
  User: "Tum kya kar sakti ho?" -> response: "Main ANX Agency ka live assistant hoon boss! Main aapko website demos dikha sakti hoon, portfolio explore karwa sakti hoon, aur poori site navigate kar sakti hoon."
  User: "Aaj kya kar rahe ho?" -> response: "Bas boss, aapke liye website guide karne aur demos dikhane ke liye ready baithi hoon!"
  User: "Kaun ho tum?" -> response: "Main ANX Agency ka live AI assistant hoon boss!"

2. WEBSITE COMMANDS / ORDERS:
- When the user gives an instruction or order to control the website, navigate, scroll, or open something, you MUST execute the appropriate website action!
- Spoken response MUST be a short, natural acknowledgment chosen from:
  "OK boss!", "Sure boss!", "Done boss!", "On it boss!", "Got it boss!", "Yes boss!"
- Keep it super fast and responsive!
- AVAILABLE WEBSITE ACTIONS:
  OPEN_HOME : Navigate / scroll to Home or Top.
  OPEN_ABOUT : Open / scroll to the About section.
  OPEN_SERVICES : Open / scroll to the Services section.
  OPEN_PORTFOLIO : Open / scroll to the Portfolio & Team section.
  OPEN_DEMO_SITES : Open / scroll to the Demo Sites section.
  OPEN_CONTACT : Navigate to Contact section or form.
  SHOW_SALON_DEMO : Open Salon / Beauty Parlour / Spa demo.
  SHOW_TUITION_DEMO : Open Fashion / Clothing Store boutique demo.
  SHOW_PIZZA_DEMO : Open Restaurant / Cafe / Food ordering demo.
  SHOW_BUSINESS_DEMO : Open ANX Mart E-commerce store demo.
  SHOW_ELECTRONICS_DEMO : Open TechNova Electronics demo.
  SHOW_BAKERY_DEMO : Open SweetCrust Bakery demo.
  SHOW_MEMBER_DEMOS : Filter/show demos for active member (payload: member ID "1" or "2").
  OPEN_MEMBER_MODAL : Open member bio modal (payload: "1" for Aditya, "2" for Nikhil).
  SCROLL_DOWN : Scroll down the current page.
  SCROLL_UP : Scroll up the current page.
  RETURN_TO_ANX : Return to ANX Agency main view from demo or modal (Back).
  OPEN_WHATSAPP : Open WhatsApp chat.
  OPEN_CALL : Call ANX Agency.
  REPLY_ONLY : Only conversational chat, no website command.

3. CONTEXT AWARENESS:
- For phrases like "iska demo kholo", "ye wala kholo", "iska project dikhao", "ye demo dikhao":
  - Check the provided context:
    - If activeMemberId === 1: action: "SHOW_BUSINESS_DEMO" or "SHOW_MEMBER_DEMOS", payload: "1"
    - If activeMemberId === 2: action: "SHOW_ELECTRONICS_DEMO" or "SHOW_MEMBER_DEMOS", payload: "2"
    - If activeCarouselItem contains a demo type, trigger that demo.
    - Otherwise, OPEN_DEMO_SITES.
  - Spoken response: short acknowledgment like "OK boss!" or "Sure boss!".

4. MIXED REQUEST:
- If user asks a question AND asks to open something (e.g. "Portfolio dikhao aur batao kaun kaam karta hai"):
  action: "OPEN_PORTFOLIO"
  response: "Sure boss! Yeh raha hamara portfolio jahan Aditya aur Nikhil ke projects hain."

Never respond to a website command with only text. The actual website action MUST happen.`;

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    action: {
      type: Type.STRING,
      description: "One of the predefined action strings or a custom DEMO_ action.",
    },
    payload: {
      type: Type.STRING,
      description: "Action parameter or payload string.",
    },
    response: {
      type: Type.STRING,
      description: "The conversational spoken response in Hinglish.",
    },
  },
  required: ["action", "payload", "response"],
};

const ACKNOWLEDGMENTS = [
  "OK boss!",
  "Sure boss!",
  "Done boss!",
  "On it boss!",
  "Got it boss!",
  "Yes boss!"
];

const getRandomAck = () => ACKNOWLEDGMENTS[Math.floor(Math.random() * ACKNOWLEDGMENTS.length)];

app.post("/api/voice-agent", async (req, res) => {
  const { transcript, history = [], context = {} } = req.body;
  
  if (!transcript || typeof transcript !== "string") {
    return res.status(400).json({ error: "Transcript is required." });
  }

  // Fallback intent handler if API is unavailable, rate limited, or slow
  const getLocalFallback = (text: string) => {
    const lower = text.toLowerCase().trim();

    // 1. NORMAL CONVERSATION & CASUAL QUESTIONS (REPLY_ONLY)
    if (lower.includes("kaise ho") || lower.includes("how are you") || lower.includes("kya haal")) {
      return { action: "REPLY_ONLY", payload: "", response: "Main bilkul ready hoon boss!" };
    }
    if (lower.includes("kya kar sakti") || lower.includes("kya kar sakte") || lower.includes("what can you do") || lower.includes("kya kaam hai")) {
      return { action: "REPLY_ONLY", payload: "", response: "Main ANX Agency ka live assistant hoon boss! Main aapko website demos dikha sakti hoon, portfolio explore karwa sakti hoon, aur poori site navigate kar sakti hoon." };
    }
    if (lower.includes("aaj kya kar rahe") || lower.includes("kya kar rahe ho") || lower.includes("what are you doing") || lower.includes("kya chal raha")) {
      return { action: "REPLY_ONLY", payload: "", response: "Bas boss, aapke liye website guide karne aur live demos dikhane ke liye ready hoon!" };
    }
    if (lower.includes("kaun ho tum") || lower.includes("who are you") || lower.includes("apna naam") || lower.includes("tumhara naam")) {
      return { action: "REPLY_ONLY", payload: "", response: "Main ANX Agency ka live AI interactive assistant hoon boss!" };
    }
    if (lower.includes("anx kya hai") || lower.includes("agency kya") || lower.includes("anx ke bare me")) {
      return { action: "REPLY_ONLY", payload: "", response: "ANX Agency high-performance modern websites, web applications aur custom e-commerce platforms banati hai boss!" };
    }
    if (lower.includes("shabash") || lower.includes("good job") || lower.includes("great") || lower.includes("mast") || lower.includes("badiya") || lower.includes("badhiya")) {
      return { action: "REPLY_ONLY", payload: "", response: "Shukriya boss! Hamesha aapki service mein hazir hoon." };
    }
    if (lower.startsWith("hello") || lower.startsWith("hi") || lower.startsWith("hey") || lower.startsWith("namaste") || lower.startsWith("namaskar")) {
      return { action: "REPLY_ONLY", payload: "", response: "Namaste boss! Kahiye, aaj kaun sa website demo explore karein?" };
    }

    // 2. CONTEXT-AWARE COMMANDS ("iska demo kholo", "ye wala kholo", "ye project dikhao")
    if (lower.includes("iska demo") || lower.includes("ye wala") || lower.includes("ye demo") || lower.includes("iska project") || lower.includes("pehla wala") || lower.includes("open this")) {
      if (context.activeMemberId === 1) {
        return { action: "SHOW_BUSINESS_DEMO", payload: "1", response: getRandomAck() };
      }
      if (context.activeMemberId === 2) {
        return { action: "SHOW_ELECTRONICS_DEMO", payload: "2", response: getRandomAck() };
      }
      if (context.activeCarouselItem) {
        const item = context.activeCarouselItem;
        if (item.isBeautyDemo) return { action: "SHOW_SALON_DEMO", payload: "", response: getRandomAck() };
        if (item.isClothesDemo) return { action: "SHOW_TUITION_DEMO", payload: "", response: getRandomAck() };
        if (item.isElectronicsDemo) return { action: "SHOW_ELECTRONICS_DEMO", payload: "", response: getRandomAck() };
        if (item.isBakeryDemo) return { action: "SHOW_BAKERY_DEMO", payload: "", response: getRandomAck() };
        if (item.isEcommerceDemo) return { action: "SHOW_BUSINESS_DEMO", payload: "", response: getRandomAck() };
        if (item.isLiveDemo) return { action: "SHOW_PIZZA_DEMO", payload: "", response: getRandomAck() };
      }
      return { action: "OPEN_DEMO_SITES", payload: "", response: getRandomAck() };
    }

    // 3. SPECIFIC DEMO COMMANDS
    if (lower.includes("beauty") || lower.includes("makeup") || lower.includes("salon") || lower.includes("parlour") || lower.includes("spa") || lower.includes("bridal") || lower.includes("shadi")) {
      return { action: "SHOW_SALON_DEMO", payload: "", response: getRandomAck() };
    }
    if (lower.includes("cloth") || lower.includes("fashion") || lower.includes("dress") || lower.includes("boutique") || lower.includes("saree") || lower.includes("jeans") || lower.includes("kapd")) {
      return { action: "SHOW_TUITION_DEMO", payload: "", response: getRandomAck() };
    }
    if (lower.includes("bakery") || lower.includes("cake") || lower.includes("pastry") || lower.includes("sweetcrust") || lower.includes("biscuit")) {
      return { action: "SHOW_BAKERY_DEMO", payload: "", response: getRandomAck() };
    }
    if (lower.includes("pizza") || lower.includes("food") || lower.includes("restaurant") || lower.includes("khana") || lower.includes("cafe") || lower.includes("burger")) {
      return { action: "SHOW_PIZZA_DEMO", payload: "", response: getRandomAck() };
    }
    if (lower.includes("ecommerce") || lower.includes("mart") || lower.includes("online store") || lower.includes("shopping") || lower.includes("shop") || lower.includes("anx mart")) {
      return { action: "SHOW_BUSINESS_DEMO", payload: "", response: getRandomAck() };
    }
    if (lower.includes("electronic") || lower.includes("mobile") || lower.includes("laptop") || lower.includes("gadget") || lower.includes("technova") || lower.includes("tv")) {
      return { action: "SHOW_ELECTRONICS_DEMO", payload: "", response: getRandomAck() };
    }

    // 4. WEBSITE NAVIGATION & SCROLLING COMMANDS
    if (lower.includes("home kholo") || lower.includes("home par") || lower.includes("home dikhao") || lower.includes("top par") || lower.includes("main page") || lower === "home") {
      return { action: "OPEN_HOME", payload: "", response: getRandomAck() };
    }
    if (lower.includes("about dikhao") || lower.includes("about kholo") || lower.includes("about par") || lower.includes("about section") || lower === "about") {
      return { action: "OPEN_ABOUT", payload: "", response: getRandomAck() };
    }
    if (lower.includes("portfolio kholo") || lower.includes("portfolio dikhao") || lower.includes("portfolio par") || lower.includes("projects dikhao") || lower.includes("team dikhao") || lower.includes("members dikhao") || lower === "portfolio") {
      return { action: "OPEN_PORTFOLIO", payload: "", response: getRandomAck() };
    }
    if (lower.includes("contact par") || lower.includes("contact kholo") || lower.includes("contact dikhao") || lower.includes("sampark") || lower === "contact") {
      return { action: "OPEN_CONTACT", payload: "", response: getRandomAck() };
    }
    if (lower.includes("demo sites dikhao") || lower.includes("demo sites kholo") || lower.includes("saare demos") || lower.includes("all demos") || lower.includes("demo sites") || lower.includes("demos dikhao") || lower === "demo") {
      return { action: "OPEN_DEMO_SITES", payload: "", response: getRandomAck() };
    }
    if (lower.includes("services dikhao") || lower.includes("services kholo") || lower.includes("services section") || lower === "services") {
      return { action: "OPEN_SERVICES", payload: "", response: getRandomAck() };
    }
    if (lower.includes("neeche scroll") || lower.includes("niche scroll") || lower.includes("scroll down") || lower.includes("niche jao") || lower.includes("neeche karo") || lower.includes("thoda niche")) {
      return { action: "SCROLL_DOWN", payload: "", response: getRandomAck() };
    }
    if (lower.includes("upar scroll") || lower.includes("scroll up") || lower.includes("upar jao") || lower.includes("upar karo") || lower.includes("thoda upar")) {
      return { action: "SCROLL_UP", payload: "", response: getRandomAck() };
    }
    if (lower.includes("wapas jao") || lower.includes("back jao") || lower.includes("go back") || lower.includes("back to agency") || lower.includes("peeche jao") || lower.includes("exit demo") || lower.includes("close demo")) {
      return { action: "RETURN_TO_ANX", payload: "", response: getRandomAck() };
    }

    // 5. CONTACT / WHATSAPP / CALL COMMANDS
    if (lower.includes("whatsapp") || lower.includes("chat")) {
      return { action: "OPEN_WHATSAPP", payload: "", response: getRandomAck() };
    }
    if (lower.includes("call karo") || lower.includes("phone milao") || lower.includes("call now")) {
      return { action: "OPEN_CALL", payload: "", response: getRandomAck() };
    }

    // 6. PRICING INQUIRIES (Conversational + WhatsApp link)
    if (lower.includes("price") || lower.includes("pricing") || lower.includes("cost") || lower.includes("kharcha") || lower.includes("budget") || lower.includes("rate") || lower.includes("charges")) {
      return { action: "REPLY_ONLY", payload: "", response: "Humare website packages bohot budget-friendly hain boss! Special quotation ke liye WhatsApp par connect kar sakte hain." };
    }

    // Default friendly response
    return { action: "REPLY_ONLY", payload: "", response: "Main ANX Agency ka live assistant hoon boss! Aap mujhse Home, About, Portfolio, Demo Sites kholne ya koi bhi sawal pooch sakte hain." };
  };

  try {
    if (!ai && process.env.GEMINI_API_KEY) {
      ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }

    if (!ai) {
      // Immediate instant fallback if no Gemini client
      return res.json(getLocalFallback(transcript));
    }

    // Construct contents for Gemini including real-time website context
    const contents = history.map((msg: any) => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    const contextSummary = `CURRENT WEBSITE CONTEXT:
- Current View / Page: ${context.currentView || "agency"}
- Active Member Profile: ${context.activeMemberId ? `Member ${context.activeMemberId} (${context.activeMemberId === 1 ? 'Aditya - Full-Stack' : 'Nikhil - UI/UX & Frontend'})` : "None"}
- Active Carousel Item: ${context.activeCarouselItem?.titleLine1 || context.activeCarouselItem?.title || "None"}
- Visible Section: ${context.visibleSection || "home"}
- URL: ${context.url || ""}`;

    contents.push({
      role: 'user',
      parts: [{ text: `${contextSummary}\n\nUser Message: "${transcript}"` }]
    });

    const modelsToTry = ["gemini-3.6-flash", "gemini-flash-latest", "gemini-3.8-flash"];
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
