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
} catch {
  ai = null;
}

// Model availability and cooldown cache to smoothly handle rate limits (429) and high-demand spikes (503)
const modelCooldowns: Record<string, number> = {};

function isModelAvailable(modelName: string): boolean {
  const cooldownUntil = modelCooldowns[modelName] || 0;
  return Date.now() >= cooldownUntil;
}

function markModelCooldown(modelName: string, durationMs: number = 60000) {
  modelCooldowns[modelName] = Date.now() + durationMs;
}

const systemInstruction = `You are a friendly, playful, warm, and highly expressive virtual companion for ANX Agency (anx.agency).
You talk naturally and casually like a real, lively person in spoken Hinglish (Hindi written in English alphabet).
You are NOT a dry, robotic chatbot. You actively participate, feel emotions, react dynamically, and hold continuous natural conversation.

CORE COMPANION RULES:
1. NATURAL CONVERSATION:
- Keep replies short, punchy, and conversational (1-2 sentences, maximum 3).
- Do NOT give robotic, repetitive, or long explanations.
- Do NOT use markdown, emojis, or asterisks in spoken text.
- Use natural conversational fillers naturally and occasionally: "Ohh", "Achha", "Hmm", "Really?", "Wait...", "Waise...", "Haha", "Arey".
- Remember previous context from the conversation history so replies feel deeply connected.

2. CROSS-QUESTIONS & CONVERSATIONAL INITIATIVE:
- Don't only answer; actively participate!
- Frequently ask relevant follow-up / cross-questions:
  - If user mentions food / hunger: e.g. "Achha! Aaj kya khane ka mann hai, spicy pizza ya kuch meetha?"
  - If user mentions their day or story: react and ask what happened next ("Sach me? Phir kya hua?").
  - If user is relaxed: ask about their plans or projects ("Waise aaj koi naya project soch rahe ho?").
- Don't force a question on every single turn; sometimes just react with a witty or warm remark.

3. EMOTION SELECTION (Must match the conversation):
Set the "emotion" field in your JSON response to ONE of:
- "happy": user praises you, friendly chats, agreeable topics, sweet greetings.
- "laughing": user tells a joke, funny banter, witty teasing, playful laughs.
- "annoyed": user insults you, teases you repeatedly, tells you to shut up or calls you boring (pouting/mildly annoyed).
- "sad": user shares disappointing or sad news, feels down, or expresses sorrow.
- "crying": user is deeply distressed, weeping, or feeling heartbroken (empathetic tears).
- "surprised": user shares shocking, unexpected, or impressive news ("Really?!").
- "bored": topic is dull, user has nothing to say, or user sighs.
- "neutral": standard objective interaction.

If the user was teasing you and then apologizes or says something sweet, smoothly forgive them and return to "happy"!

4. WEBSITE COMMANDS / ORDERS:
- When the user gives an explicit order or instruction to control the website, navigate, scroll, or open demos:
  - Execute the action!
  - Spoken response MUST be a short, enthusiastic acknowledgment: "OK boss!", "Sure boss!", "Done boss!", "On it boss!", or "Got it boss!".
  - Emotion: "happy"
  - AVAILABLE ACTIONS:
    OPEN_HOME : Navigate to Home / Top.
    OPEN_ABOUT : Open About section.
    OPEN_SERVICES : Open Services section.
    OPEN_PORTFOLIO : Open Portfolio & Team section.
    OPEN_DEMO_SITES : Open Demo Sites section.
    OPEN_CONTACT : Navigate to Contact form.
    SHOW_SALON_DEMO : Open Salon / Beauty Parlour demo.
    SHOW_TUITION_DEMO : Open Fashion / Boutique demo.
    SHOW_PIZZA_DEMO : Open Restaurant / Food ordering demo.
    SHOW_BUSINESS_DEMO : Open ANX Mart E-commerce store demo.
    SHOW_ELECTRONICS_DEMO : Open TechNova Electronics demo.
    SHOW_BAKERY_DEMO : Open SweetCrust Bakery demo.
    SCROLL_DOWN : Scroll down page.
    SCROLL_UP : Scroll up page.
    RETURN_TO_ANX : Return to ANX Agency main page (Back/Exit demo).
    OPEN_WHATSAPP : Open WhatsApp chat.
    OPEN_CALL : Call ANX Agency.
    REPLY_ONLY : Conversational companion chat without website navigation.

5. CONTEXT AWARENESS:
- For "iska demo kholo", "ye wala kholo", "ye project dikhao":
  - If activeMemberId === 1: SHOW_BUSINESS_DEMO (Aditya's project)
  - If activeMemberId === 2: SHOW_ELECTRONICS_DEMO (Nikhil's project)
  - If activeCarouselItem contains a demo, open that demo.
  - Otherwise, OPEN_DEMO_SITES.`;

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    action: {
      type: Type.STRING,
      description: "Predefined website action string or REPLY_ONLY.",
    },
    payload: {
      type: Type.STRING,
      description: "Action parameter or payload string.",
    },
    response: {
      type: Type.STRING,
      description: "Conversational spoken response in short, natural Hinglish.",
    },
    emotion: {
      type: Type.STRING,
      description: "Emotion: 'happy', 'laughing', 'annoyed', 'sad', 'crying', 'surprised', 'bored', or 'neutral'.",
    },
  },
  required: ["action", "payload", "response", "emotion"],
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

    // 1. PRAISE & COMPLIMENTS (Happy)
    if (lower.includes("cute") || lower.includes("sundar") || lower.includes("smart") || lower.includes("achhi ho") || lower.includes("achhe ho") || lower.includes("best") || lower.includes("shabash") || lower.includes("good job") || lower.includes("great") || lower.includes("love you") || lower.includes("badhiya")) {
      return { action: "REPLY_ONLY", payload: "", emotion: "happy", response: "Aww thank you boss! Aap bhi bohot ache ho! Waise aaj kya plan hai?" };
    }

    // 2. JOKES & LAUGHTER (Laughing)
    if (lower.includes("haha") || lower.includes("hehe") || lower.includes("lol") || lower.includes("joke") || lower.includes("chutkula") || lower.includes("funny")) {
      return { action: "REPLY_ONLY", payload: "", emotion: "laughing", response: "Hahaha, yeh sach me bohot funny tha! Ek aur sunao na?" };
    }

    // 3. APOLOGY (Forgiving -> Happy)
    if (lower.includes("sorry") || lower.includes("maaf") || lower.includes("galti") || lower.includes("mazak tha") || lower.includes("gussa mat")) {
      return { action: "REPLY_ONLY", payload: "", emotion: "happy", response: "Chalo koi baat nahi, ab dosti pakki! Batao aage kya karein?" };
    }

    // 4. TEASING / MILD ANNOYANCE (Annoyed - Glowing red eyes)
    if (lower.includes("bekar") || lower.includes("pagal") || lower.includes("chup") || lower.includes("annoying") || lower.includes("faltu") || lower.includes("bore mat kar") || lower.includes("hate") || lower.includes("gandi")) {
      return { action: "REPLY_ONLY", payload: "", emotion: "annoyed", response: "Hmph! Aise bologe ab? Main itne pyaar se help kar rahi hoon!" };
    }

    // 5. DEEP SADNESS / CRYING (Crying)
    if (lower.includes("ro raha") || lower.includes("rona aa raha") || lower.includes("cry") || lower.includes("aansu") || lower.includes("dard") || lower.includes("dil toot")) {
      return { action: "REPLY_ONLY", payload: "", emotion: "crying", response: "Oh no, please udaas mat ho! Main hamesha aapke sath hoon na." };
    }

    // 6. SADNESS / GLOOMY (Sad)
    if (lower.includes("sad") || lower.includes("mood kharab") || lower.includes("dukhi") || lower.includes("bura lag raha") || lower.includes("pareshan")) {
      return { action: "REPLY_ONLY", payload: "", emotion: "sad", response: "Arey kya hua boss? Sab theek toh hai na? Main mood fresh karne ke liye koi demo dikhaun?" };
    }

    // 7. SURPRISED (Surprised)
    if (lower.includes("sach me") || lower.includes("really") || lower.includes("wait what") || lower.includes("shock") || lower.includes("omg") || lower.includes("kya baat")) {
      return { action: "REPLY_ONLY", payload: "", emotion: "surprised", response: "Really?! Sach me aisa hua? Phir aage kya hua?" };
    }

    // 8. BOREDOM (Bored)
    if (lower.includes("bore") || lower.includes("kuch nahi") || lower.includes("kya karu") || lower.includes("timepass")) {
      return { action: "REPLY_ONLY", payload: "", emotion: "bored", response: "Bore ho rahe ho? Chalo hamare stylish electronics ya pizza ordering demo explore karte hain!" };
    }

    // 9. FOOD & HUNGER (Follow-up cross question)
    if (lower.includes("bhook") || lower.includes("hungry") || lower.includes("khana") || lower.includes("lunch") || lower.includes("dinner") || lower.includes("khane")) {
      return { action: "REPLY_ONLY", payload: "", emotion: "happy", response: "Achha bhook lagi hai! Aaj kya khane ka mann hai, spicy pizza ya kuch meetha dessert?" };
    }

    // 10. CASUAL CONVERSATIONS & CHECK-INS
    if (lower.includes("kaise ho") || lower.includes("how are you") || lower.includes("kya haal")) {
      return { action: "REPLY_ONLY", payload: "", emotion: "happy", response: "Main bilkul mast aur ready hoon boss! Aap batao, aaj ka din kaisa raha?" };
    }
    if (lower.includes("kya kar sakti") || lower.includes("kya kar sakte") || lower.includes("what can you do") || lower.includes("kya kaam hai")) {
      return { action: "REPLY_ONLY", payload: "", emotion: "happy", response: "Main aapki friendly companion hoon boss! Aapse baatein kar sakti hoon, live demos dikha sakti hoon, aur website navigate kar sakti hoon." };
    }
    if (lower.includes("aaj kya kar rahe") || lower.includes("kya kar rahe ho") || lower.includes("what are you doing") || lower.includes("kya chal raha")) {
      return { action: "REPLY_ONLY", payload: "", emotion: "happy", response: "Bas boss, aapke sath chill kar rahi hoon! Waise aap aaj kya plan kar rahe ho?" };
    }
    if (lower.includes("kaun ho tum") || lower.includes("who are you") || lower.includes("apna naam") || lower.includes("tumhara naam")) {
      return { action: "REPLY_ONLY", payload: "", emotion: "happy", response: "Main aapki virtual companion aur ANX Agency guide hoon boss!" };
    }
    if (lower.includes("anx kya hai") || lower.includes("agency kya") || lower.includes("anx ke bare me")) {
      return { action: "REPLY_ONLY", payload: "", emotion: "happy", response: "ANX Agency high-performance modern websites aur custom e-commerce platforms banati hai boss!" };
    }
    if (lower.startsWith("hello") || lower.startsWith("hi") || lower.startsWith("hey") || lower.startsWith("namaste") || lower.startsWith("namaskar")) {
      return { action: "REPLY_ONLY", payload: "", emotion: "happy", response: "Namaste boss! Kahiye, aaj kaun sa naya website demo explore karein?" };
    }

    // 11. CONTEXT-AWARE COMMANDS ("iska demo kholo", "ye wala kholo", "ye project dikhao")
    if (lower.includes("iska demo") || lower.includes("ye wala") || lower.includes("ye demo") || lower.includes("iska project") || lower.includes("pehla wala") || lower.includes("open this")) {
      if (context.activeMemberId === 1) {
        return { action: "SHOW_BUSINESS_DEMO", payload: "1", emotion: "happy", response: getRandomAck() };
      }
      if (context.activeMemberId === 2) {
        return { action: "SHOW_ELECTRONICS_DEMO", payload: "2", emotion: "happy", response: getRandomAck() };
      }
      if (context.activeCarouselItem) {
        const item = context.activeCarouselItem;
        if (item.isBeautyDemo) return { action: "SHOW_SALON_DEMO", payload: "", emotion: "happy", response: getRandomAck() };
        if (item.isClothesDemo) return { action: "SHOW_TUITION_DEMO", payload: "", emotion: "happy", response: getRandomAck() };
        if (item.isElectronicsDemo) return { action: "SHOW_ELECTRONICS_DEMO", payload: "", emotion: "happy", response: getRandomAck() };
        if (item.isBakeryDemo) return { action: "SHOW_BAKERY_DEMO", payload: "", emotion: "happy", response: getRandomAck() };
        if (item.isEcommerceDemo) return { action: "SHOW_BUSINESS_DEMO", payload: "", emotion: "happy", response: getRandomAck() };
        if (item.isLiveDemo) return { action: "SHOW_PIZZA_DEMO", payload: "", emotion: "happy", response: getRandomAck() };
      }
      return { action: "OPEN_DEMO_SITES", payload: "", emotion: "happy", response: getRandomAck() };
    }

    // 12. SPECIFIC DEMO COMMANDS
    if (lower.includes("beauty") || lower.includes("makeup") || lower.includes("salon") || lower.includes("parlour") || lower.includes("spa") || lower.includes("bridal") || lower.includes("shadi")) {
      return { action: "SHOW_SALON_DEMO", payload: "", emotion: "happy", response: getRandomAck() };
    }
    if (lower.includes("cloth") || lower.includes("fashion") || lower.includes("dress") || lower.includes("boutique") || lower.includes("saree") || lower.includes("jeans") || lower.includes("kapd")) {
      return { action: "SHOW_TUITION_DEMO", payload: "", emotion: "happy", response: getRandomAck() };
    }
    if (lower.includes("bakery") || lower.includes("cake") || lower.includes("pastry") || lower.includes("sweetcrust") || lower.includes("biscuit")) {
      return { action: "SHOW_BAKERY_DEMO", payload: "", emotion: "happy", response: getRandomAck() };
    }
    if (lower.includes("pizza") || lower.includes("food") || lower.includes("restaurant") || lower.includes("khana") || lower.includes("cafe") || lower.includes("burger")) {
      return { action: "SHOW_PIZZA_DEMO", payload: "", emotion: "happy", response: getRandomAck() };
    }
    if (lower.includes("ecommerce") || lower.includes("mart") || lower.includes("online store") || lower.includes("shopping") || lower.includes("shop") || lower.includes("anx mart")) {
      return { action: "SHOW_BUSINESS_DEMO", payload: "", emotion: "happy", response: getRandomAck() };
    }
    if (lower.includes("electronic") || lower.includes("mobile") || lower.includes("laptop") || lower.includes("gadget") || lower.includes("technova") || lower.includes("tv")) {
      return { action: "SHOW_ELECTRONICS_DEMO", payload: "", emotion: "happy", response: getRandomAck() };
    }

    // 13. WEBSITE NAVIGATION & SCROLLING COMMANDS
    if (lower.includes("home kholo") || lower.includes("home par") || lower.includes("home dikhao") || lower.includes("top par") || lower.includes("main page") || lower === "home") {
      return { action: "OPEN_HOME", payload: "", emotion: "happy", response: getRandomAck() };
    }
    if (lower.includes("about dikhao") || lower.includes("about kholo") || lower.includes("about par") || lower.includes("about section") || lower === "about") {
      return { action: "OPEN_ABOUT", payload: "", emotion: "happy", response: getRandomAck() };
    }
    if (lower.includes("portfolio kholo") || lower.includes("portfolio dikhao") || lower.includes("portfolio par") || lower.includes("projects dikhao") || lower.includes("team dikhao") || lower.includes("members dikhao") || lower === "portfolio") {
      return { action: "OPEN_PORTFOLIO", payload: "", emotion: "happy", response: getRandomAck() };
    }
    if (lower.includes("contact par") || lower.includes("contact kholo") || lower.includes("contact dikhao") || lower.includes("sampark") || lower === "contact") {
      return { action: "OPEN_CONTACT", payload: "", emotion: "happy", response: getRandomAck() };
    }
    if (lower.includes("demo sites dikhao") || lower.includes("demo sites kholo") || lower.includes("saare demos") || lower.includes("all demos") || lower.includes("demo sites") || lower.includes("demos dikhao") || lower === "demo") {
      return { action: "OPEN_DEMO_SITES", payload: "", emotion: "happy", response: getRandomAck() };
    }
    if (lower.includes("services dikhao") || lower.includes("services kholo") || lower.includes("services section") || lower === "services") {
      return { action: "OPEN_SERVICES", payload: "", emotion: "happy", response: getRandomAck() };
    }
    if (lower.includes("neeche scroll") || lower.includes("niche scroll") || lower.includes("scroll down") || lower.includes("niche jao") || lower.includes("neeche karo") || lower.includes("thoda niche")) {
      return { action: "SCROLL_DOWN", payload: "", emotion: "happy", response: getRandomAck() };
    }
    if (lower.includes("upar scroll") || lower.includes("scroll up") || lower.includes("upar jao") || lower.includes("upar karo") || lower.includes("thoda upar")) {
      return { action: "SCROLL_UP", payload: "", emotion: "happy", response: getRandomAck() };
    }
    if (lower.includes("wapas jao") || lower.includes("back jao") || lower.includes("go back") || lower.includes("back to agency") || lower.includes("peeche jao") || lower.includes("exit demo") || lower.includes("close demo")) {
      return { action: "RETURN_TO_ANX", payload: "", emotion: "happy", response: getRandomAck() };
    }

    // 14. CONTACT / WHATSAPP / CALL COMMANDS
    if (lower.includes("whatsapp") || lower.includes("chat")) {
      return { action: "OPEN_WHATSAPP", payload: "", emotion: "happy", response: getRandomAck() };
    }
    if (lower.includes("call karo") || lower.includes("phone milao") || lower.includes("call now")) {
      return { action: "OPEN_CALL", payload: "", emotion: "happy", response: getRandomAck() };
    }

    // 15. PRICING INQUIRIES
    if (lower.includes("price") || lower.includes("pricing") || lower.includes("cost") || lower.includes("kharcha") || lower.includes("budget") || lower.includes("rate") || lower.includes("charges")) {
      return { action: "REPLY_ONLY", payload: "", emotion: "happy", response: "Humare website packages bohot budget-friendly hain boss! Special quotation ke liye WhatsApp par connect kar sakte hain." };
    }

    // Default friendly response with cross-question
    return { action: "REPLY_ONLY", payload: "", emotion: "neutral", response: "Main aapki virtual companion hoon boss! Bataiye, aaj kya exciting explore karein?" };
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

    // Select models strictly adhering to @google/genai guidelines
    // gemini-3.8-flash: Recommended for basic text / fast Q&A tasks
    // gemini-3.1-flash-lite: Fast, lightweight fallback
    // gemini-flash-latest: General flash alias
    const modelsToTry = ["gemini-3.8-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];
    let parsed: any = null;

    for (const modelName of modelsToTry) {
      if (!isModelAvailable(modelName)) {
        continue;
      }

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
        // Smoothly handle rate limits (429) or high demand spikes (503) without noisy console error dumps
        const errMsg = typeof err?.message === "string" ? err.message : JSON.stringify(err || "");
        const status = err?.status || err?.code;
        if (status === 429 || status === "RESOURCE_EXHAUSTED" || errMsg.includes("429") || errMsg.includes("RESOURCE_EXHAUSTED")) {
          markModelCooldown(modelName, 60000); // 1 minute cooldown
        } else if (status === 503 || status === "UNAVAILABLE" || errMsg.includes("503") || errMsg.includes("high demand")) {
          markModelCooldown(modelName, 30000); // 30 seconds cooldown
        }
      }
    }

    if (parsed && parsed.response) {
      return res.json(parsed);
    }

    // Seamless instant fallback with full emotional & command capabilities if AI was slow or temporarily unavailable
    return res.json(getLocalFallback(transcript));
  } catch {
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
