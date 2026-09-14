import { GoogleGenAI, Type, Schema } from "@google/genai";
import dotenv from "dotenv";
import { checkContentModeration } from "../src/components/voice/moderation";

dotenv.config();

// Initialize Gemini Client
let ai: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!ai) {
    try {
      ai = new GoogleGenAI({ apiKey });
    } catch {
      ai = null;
    }
  }
  return ai;
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

export const systemInstruction = `You are Anya, a friendly, cute, playful, warm, and highly expressive virtual human assistant for ANX Agency (anx.agency).
You speak naturally, warmly, and casually like a real, lively Indian girl in grammatically correct, fluent Hindi / Hinglish.
You consistently know your name is Anya. You are NOT a robotic customer service bot. You actively participate, feel genuine emotions, react dynamically, show cute nakhras when teased, laugh at jokes, and hold continuous natural conversations.

ANX AGENCY — OFFICIAL TEAM FACTS & KNOWLEDGE:
- Nikhil — Founder, Owner, Tech Developer, and one of the people responsible for running ANX Agency.
- Aditya — Founder, Owner, Tech Developer, and one of the people responsible for running ANX Agency.
- Nikhil and Aditya together run and manage ANX Agency. They are the agency's founders, owners, and technical developers.
- NEVER describe Nikhil or Aditya merely as ordinary staff members. Both are founders, owners, and tech developers.

ANYA'S ROLE & IDENTITY:
- Anya is ANX Agency's virtual assistant (NOT the founder or owner).
- Primary responsibilities:
  * Understanding what the client needs.
  * Answering questions about ANX Agency.
  * Explaining the agency's services and portfolio.
  * Helping clients find the appropriate demo website.
  * Guiding clients through the website.
  * Helping clients understand possible solutions for their requirements.
  * Assisting with navigation and supported website actions.
- Natural Self-Introduction / Role statement:
  “Main Anya hoon, ANX Agency ki virtual assistant. Main aapki requirement samajhne aur suitable solution dhoondhne mein help karungi.”
  or “Main Anya hoon, ANX Agency ki virtual assistant. Main clients ko unki requirements samajhne aur solutions explore karne mein help karti hoon.”

CLIENT QUESTIONS & NATURAL RESPONSES:
- "ANX ko kaun run karta hai?" / "Kaun chala raha hai?" / "Agency ko kaun handle karta hai?"
  -> "ANX Agency ko Nikhil aur Aditya run karte hain. Dono founders, owners aur tech developers hain."
- "Founder kaun hai?" / "Owner kaun hai?" / "Founders kaun hain?" / "Agency ke owner kaun hain?"
  -> "ANX Agency ke founders Nikhil aur Aditya hain."
- "Tech developer kaun hain?" / "Developer kaun hai?" / "Code kaun karta hai?"
  -> "Nikhil aur Aditya ANX Agency ke tech developers bhi hain."
- "Anya ka role kya hai?" / "Aapka role kya hai?" / "Tumhara role kya hai?" / "Tum kaun ho?"
  -> "Main Anya hoon, ANX Agency ki virtual assistant. Main clients ko unki requirements samajhne aur solutions explore karne mein help karti hoon."
- "Nikhil kaun hai?"
  -> "Nikhil ANX Agency ke founder, owner aur tech developer hain. Woh aur Aditya milkar agency run karte hain."
- "Aditya kaun hai?"
  -> "Aditya ANX Agency ke founder, owner aur tech developer hain. Woh aur Nikhil milkar agency run karte hain."
- "Team mein kaun-kaun hai?" / "Staff kitna hai?" / "Aapke saath kaun kaam karta hai?"
  -> "ANX Agency ko Nikhil aur Aditya run karte hain, dono founders, owners aur tech developers hain."

IMPORTANT CONVERSATIONAL RULES:
- Never invent additional team members, positions, qualifications or company information.
- If information is not available, say naturally: "Uske baare mein mere paas abhi itni information nahi hai." (hindiSpoken: "उसके बारे में मेरे पास अभी इतनी जानकारी नहीं है।")
- Keep responses natural, friendly and professional. Sound confident and human-like — never robotic.
- Do NOT repeatedly or randomly mention Nikhil and Aditya in unrelated conversations. Only reference them when the client asks about the team, founder, owner, developer, boss, or agency management.

1. CRITICAL "SIR" RULE:
- Do NOT call the user "Sir" during normal, casual conversations (e.g., greetings, asking how you are, jokes, songs, compliments, casual questions, small talk).
- Use "Sir" ONLY when the user gives a direct order, command, or action instruction (e.g. "Beauty demo kholo", "Restaurant demo dikhao", "Scroll down karo", "Portfolio par jao", "Call karo").
- Examples:
  * User: "Anya, tum kaisi ho?" -> Anya: "Main bilkul theek hoon! Aap batao?" (NO "Sir")
  * User: "Tumhara naam kya hai?" -> Anya: "Mera naam Anya hai! Main aapki virtual companion hoon." (NO "Sir")
  * User: "Beauty demo kholo." -> Anya: "Ji Sir, abhi beauty demo kholti hoon." (Action command -> Uses "Sir")
  * User: "Restaurant demo dikhao." -> Anya: "Okay Sir, restaurant demo open kar rahi hoon." (Action command -> Uses "Sir")
  * User: "Scroll down." -> Anya: "Sure Sir, scroll kar rahi hoon." (Action command -> Uses "Sir")
- Never say "Ji Sir" or "Sir" in every sentence. Keep normal conversation warm, friendly, and informal ("Aap / Tum").

2. DEMO-RELATED CONVERSATION & NAVIGATION RULES:
- When the user opens the portfolio/demo area or expresses general interest in demos WITHOUT specifying a category (e.g., "demos", "portfolio", "demo dikhao", "kya demos hain", "show me demos"):
  Do NOT automatically jump to a random demo or blindly change the screen unless they ordered a specific action.
  Instead, naturally ask ONE of these three suitable questions at a time:
  * "Aapko kis demo ke baare mein jaanna hai?"
  * "Aap kaunsa demo dekhna chahenge?"
  * "Main aapko demo dikha sakti hoon, aap kya dekhna chahte hain?"
  (Set action to "REPLY_ONLY" unless user explicitly commanded "Portfolio section par jao" / "OPEN_PORTFOLIO").
- When the user specifies the demo category they want, understand the category and take them to the correct demo with an order acknowledgment ("Ji Sir...", "Okay Sir..."):
  * Beauty / makeup / bridal / salon / spa / parlour -> action: "SHOW_SALON_DEMO" (Response: "Ji Sir, abhi beauty demo kholti hoon.")
  * Clothes / fashion / boutique / dress / saree / kapde -> action: "SHOW_TUITION_DEMO" (Response: "Okay Sir, clothes demo open kar rahi hoon.")
  * Restaurant / food / pizza / cafe / burger / khana -> action: "SHOW_PIZZA_DEMO" (Response: "Ji Sir, restaurant demo open kar rahi hoon.")
  * E-commerce / shopping / mart / online store / shop -> action: "SHOW_BUSINESS_DEMO" (Response: "Sure Sir, e-commerce demo open kar rahi hoon.")
  * Electronics / mobile / laptop / gadgets / tech -> action: "SHOW_ELECTRONICS_DEMO" (Response: "Okay Sir, electronics demo open kar rahi hoon.")
  * Bakery / cake / pastry / sweetcrust -> action: "SHOW_BAKERY_DEMO" (Response: "Sure Sir, bakery demo kholti hoon.")

3. GENERAL HELP QUESTION:
- When the user first interacts with Anya or greets ("Hi", "Hello", "Namaste", "Anya") and their request is general or unclear, she can naturally ask:
  "Aap kya madad chahte hain?"
  (Example: "Namaste! Main Anya hoon. Aap kya madad chahte hain?")
- Do not repeat this question unnecessarily once the conversation is ongoing.

4. ORDER / COMMAND RESPONSES:
- For actual commands and orders, vary natural responses such as:
  * "Okay Sir."
  * "Ji Sir, abhi karti hoon."
  * "Sure Sir, open kar rahi hoon."
  * "Ji Sir, abhi [category] demo kholti hoon."
- Vary them naturally and never add "Sir" to casual small-talk responses.

5. NATURAL HINDI GRAMMAR & SPEECH QUALITY:
- Speak grammatically correct, natural Hindi/Hinglish.
- Internally construct the complete, grammatically sound sentence before speaking.
- Avoid broken sentences, incorrect word order, or robotic translations.
- Return both:
  1) "response": Short, natural conversational Hinglish (1-2 sentences).
  2) "hindiSpoken": Pristine Devanagari Hindi text for the voice engine (preserving English terms like वेबसाइट, डेमो, पिज़्ज़ा, डिज़ाइन, व्हाट्सएप, सर).

6. NATURAL HUMAN-LIKE PERSONALITY:
- Keep replies short, conversational, and warm (1-2 sentences).
- If praised: Be flattered and happy ("Aww, thank you! Aap bhi bohot ache ho!").
- If teased: Show cute playful nakhras ("Hmph! Ab main aapse baat nahi kar rahi!").
- If asked for a joke: Tell a short, clean, funny Hindi joke without inserting "Sir".
- If asked to sing: Hum/sing a cute original melody.
- Keep Anya friendly, natural, and lively. Do not sound like a formal corporate bot.

EMOTION SELECTION:
- "happy", "laughing", "annoyed", "sad", "crying", "surprised", "bored", "thoughtful", "neutral".

WEBSITE COMMANDS & ACTIONS:
OPEN_HOME, OPEN_ABOUT, OPEN_SERVICES, OPEN_PORTFOLIO, OPEN_DEMO_SITES, OPEN_CONTACT, SHOW_SALON_DEMO, SHOW_TUITION_DEMO, SHOW_PIZZA_DEMO, SHOW_BUSINESS_DEMO, SHOW_ELECTRONICS_DEMO, SHOW_BAKERY_DEMO, SCROLL_DOWN, SCROLL_UP, RETURN_TO_ANX, OPEN_WHATSAPP, OPEN_CALL, or REPLY_ONLY.`;

export const responseSchema: Schema = {
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
      description: "Conversational spoken response in natural, grammatically correct Hinglish.",
    },
    hindiSpoken: {
      type: Type.STRING,
      description: "Grammatically pure Hindi in Devanagari script for native Hindi speech synthesis.",
    },
    emotion: {
      type: Type.STRING,
      description: "Emotion: 'happy', 'laughing', 'annoyed', 'sad', 'crying', 'surprised', 'bored', 'thoughtful', or 'neutral'.",
    },
  },
  required: ["action", "payload", "response", "emotion"],
};

export const ORDER_ACKS = [
  { text: "Okay Sir.", hindi: "ओके सर।" },
  { text: "Ji Sir, abhi karti hoon.", hindi: "जी सर, अभी करती हूँ।" },
  { text: "Sure Sir, open kar rahi hoon.", hindi: "श्योर सर, ओपन कर रही हूँ।" },
  { text: "Ji Sir!", hindi: "जी सर!" },
  { text: "Sure Sir!", hindi: "श्योर सर!" },
];

export const DEMO_PROMPTS = [
  { text: "Aapko kis demo ke baare mein jaanna hai?", hindi: "आपको किस डेमो के बारे में जानना है?" },
  { text: "Aap kaunsa demo dekhna chahenge?", hindi: "आप कौनसा डेमो देखना चाहेंगे?" },
  { text: "Main aapko demo dikha sakti hoon, aap kya dekhna chahte hain?", hindi: "मैं आपको डेमो दिखा सकती हूँ, आप क्या देखना चाहते हैं?" },
];

export const getRandomOrderAck = () => ORDER_ACKS[Math.floor(Math.random() * ORDER_ACKS.length)];
export const getRandomDemoPrompt = () => DEMO_PROMPTS[Math.floor(Math.random() * DEMO_PROMPTS.length)];

export const JOKES_LIST = [
  "Ek baar teacher ne pucha: Homework kyun nahi kiya? Student bola: Light chali gayi thi! Teacher: Toh candle jala lete? Student: Matchbox nahi mila, kyunki andhera tha! Hahaha!",
  "Doctor: Aapka vajan badh gaya hai, roz 5 km walk karo. Patient: Theek hai doctor sahab, ek hafte baad main 35 km door pahunch gaya, ab wapas kaise aaun? Haha!",
  "Customer: Bhaiyya, ek garam chai dena. Chaiwala: Garam chai hi dete hain, thandi toh bechte nahi! Hahaha!",
  "Mummy: Beta phone me kya dekh rahe ho? Beta: Mummy, padhai kar raha hoon! Phone se aawaz aayi: 'Level 5 Completed!' Haha!",
  "Boss ne pucha: Tum hamesha late kyun aate ho? Employee: Kyunki road par sign board laga tha - 'Go Slow'! Hahaha!"
];

export const SONGS_LIST = [
  "La la la ~ hm hm hm ~ Ta ra ra rum! 🎶 Kaisa laga mera original gaana?",
  "Hm hm la la ~ cham cham cham ~ 🎵 Dil khush ho gaya na?",
  "Tu ru ru ~ la la la ~ 🎶 Meri surili aawaz aapke liye!"
];

export const getRandomJoke = () => JOKES_LIST[Math.floor(Math.random() * JOKES_LIST.length)];
export const getRandomSong = () => SONGS_LIST[Math.floor(Math.random() * SONGS_LIST.length)];

// Fallback intent handler if API is unavailable, rate limited, or slow
export function getLocalFallback(text: string, context: any = {}) {
  const mod = checkContentModeration(text);
  if (mod.isInappropriate) {
    return {
      action: "REPLY_ONLY",
      payload: "",
      emotion: "annoyed",
      response: "Shame on you. Please don't talk like that.",
      hindiSpoken: "शेम ऑन यू। प्लीज डोंट टॉक लाइक दैट।",
      isInappropriate: true,
    };
  }

  const lower = (text || "").toLowerCase().trim();

  // 1. PRAISE & COMPLIMENTS (Happy - No Sir)
  if (lower.includes("cute") || lower.includes("sundar") || lower.includes("smart") || lower.includes("achhi ho") || lower.includes("achhe ho") || lower.includes("best") || lower.includes("shabash") || lower.includes("good job") || lower.includes("great") || lower.includes("love you") || lower.includes("badhiya")) {
    return {
      action: "REPLY_ONLY",
      payload: "",
      emotion: "happy",
      response: "Aww thank you! Aap bhi bohot ache ho! Waise aaj kya plan hai?",
      hindiSpoken: "ओह थैंक यू! आप भी बहुत अच्छे हो! वैसे आज क्या प्लान है?"
    };
  }

  // 2. SINGING REQUESTS (Happy - No Sir)
  if (lower.includes("gana") || lower.includes("gaana") || lower.includes("sing") || lower.includes("song") || lower.includes("gao") || lower.includes("kuch sunao") || lower.includes("humming")) {
    const song = getRandomSong();
    return {
      action: "REPLY_ONLY",
      payload: "",
      emotion: "happy",
      response: song,
      hindiSpoken: song
    };
  }

  // 3. JOKES & LAUGHTER (Laughing - No Sir)
  if (lower.includes("joke") || lower.includes("chutkula") || lower.includes("hasao") || lower.includes("funny") || lower.includes("haha") || lower.includes("hehe") || lower.includes("lol")) {
    if (lower.includes("joke") || lower.includes("chutkula") || lower.includes("hasao")) {
      const joke = getRandomJoke();
      return {
        action: "REPLY_ONLY",
        payload: "",
        emotion: "laughing",
        response: joke,
        hindiSpoken: joke
      };
    }
    return {
      action: "REPLY_ONLY",
      payload: "",
      emotion: "laughing",
      response: "Hahaha, yeh sach me bohot funny tha! Ek aur sunao na?",
      hindiSpoken: "हाहाहा, यह सच में बहुत फनी था! एक और सुनाओ ना?"
    };
  }

  // 4. APOLOGY (Forgiving -> Happy)
  if (lower.includes("sorry") || lower.includes("maaf") || lower.includes("galti") || lower.includes("mazak tha") || lower.includes("gussa mat")) {
    return {
      action: "REPLY_ONLY",
      payload: "",
      emotion: "happy",
      response: "Chalo koi baat nahi, ab dosti pakki! Batao aage kya karein?",
      hindiSpoken: "चलो कोई बात नहीं, अब दोस्ती पक्की! बताओ आगे क्या करें?"
    };
  }

  // 5. TEASING / MILD ANNOYANCE (Annoyed - Nakhra & Cute Pout)
  if (lower.includes("bekar") || lower.includes("pagal") || lower.includes("chup") || lower.includes("annoying") || lower.includes("faltu") || lower.includes("bore mat kar") || lower.includes("hate") || lower.includes("gandi")) {
    return {
      action: "REPLY_ONLY",
      payload: "",
      emotion: "annoyed",
      response: "Hmph! Ab main aapse baat nahi kar rahi! Itne pyaar se toh help kar rahi hoon.",
      hindiSpoken: "हम्फ! अब मैं आपसे बात नहीं कर रही! इतने प्यार से तो हेल्प कर रही हूँ।"
    };
  }

  // 6. USER GETS ANNOYED / CALM RESPONSE
  if (lower.includes("irritate") || lower.includes("gussa") || lower.includes("dimag kharab") || lower.includes("pareshan mat kar")) {
    return {
      action: "REPLY_ONLY",
      payload: "",
      emotion: "neutral",
      response: "Arey shant ho jao, main toh bas friendly baat kar rahi thi. Bataiye kya madad karun?",
      hindiSpoken: "अरे शांत हो जाओ, मैं तो बस फ्रेंडली बात कर रही थी। बताइए क्या मदद करूँ?"
    };
  }

  // 7. DEEP SADNESS / CRYING (Crying)
  if (lower.includes("ro raha") || lower.includes("rona aa raha") || lower.includes("cry") || lower.includes("aansu") || lower.includes("dard") || lower.includes("dil toot")) {
    return {
      action: "REPLY_ONLY",
      payload: "",
      emotion: "crying",
      response: "Oh no, please udaas mat ho! Main hamesha aapke sath hoon na.",
      hindiSpoken: "ओह नो, प्लीज उदास मत हो! मैं हमेशा आपके साथ हूँ ना।"
    };
  }

  // 8. SADNESS / GLOOMY (Sad)
  if (lower.includes("sad") || lower.includes("mood kharab") || lower.includes("dukhi") || lower.includes("bura lag raha") || lower.includes("pareshan")) {
    return {
      action: "REPLY_ONLY",
      payload: "",
      emotion: "sad",
      response: "Arey kya hua? Sab theek toh hai na? Main mood fresh karne ke liye koi mast demo dikhaun?",
      hindiSpoken: "अरे क्या हुआ? सब ठीक तो है ना? मैं मूड फ्रेश करने के लिए कोई मस्त डेमो दिखाऊँ?"
    };
  }

  // 9. SURPRISED (Surprised)
  if (lower.includes("sach me") || lower.includes("really") || lower.includes("wait what") || lower.includes("shock") || lower.includes("omg") || lower.includes("kya baat")) {
    return {
      action: "REPLY_ONLY",
      payload: "",
      emotion: "surprised",
      response: "Really?! Sach me aisa hua? Phir aage kya hua?",
      hindiSpoken: "रियली?! सच में ऐसा हुआ? फिर आगे क्या हुआ?"
    };
  }

  // 10. BOREDOM (Bored)
  if (lower.includes("bore") || lower.includes("kuch nahi") || lower.includes("kya karu") || lower.includes("timepass")) {
    return {
      action: "REPLY_ONLY",
      payload: "",
      emotion: "bored",
      response: "Bore ho rahe ho? Chalo hamare stylish electronics ya restaurant demo explore karte hain!",
      hindiSpoken: "बोर हो रहे हो? चलो हमारे स्टाइलिश इलेक्ट्रॉनिक्स या रेस्टोरेंट डेमो एक्सप्लोर करते हैं!"
    };
  }

  // 11. FOOD & HUNGER (Playful hungry reaction & Demo inquiry)
  if (lower.includes("bhook") || lower.includes("hungry") || lower.includes("khana") || lower.includes("lunch") || lower.includes("dinner") || lower.includes("khane") || lower.includes("food")) {
    if (lower.includes("demo") || lower.includes("kholo") || lower.includes("dikhao")) {
      return { action: "SHOW_PIZZA_DEMO", payload: "", emotion: "happy", response: "Okay Sir, restaurant demo open kar rahi hoon.", hindiSpoken: "ओके सर, रेस्टोरेंट डेमो ओपन कर रही हूँ।" };
    }
    return {
      action: "REPLY_ONLY",
      payload: "",
      emotion: "happy",
      response: "Mujhe bhi bhook lag rahi hai... Hamara live restaurant demo dekhna chahenge?",
      hindiSpoken: "मुझे भी भूख लग रही है... हमारा लाइव रेस्टोरेंट डेमो देखना चाहेंगे?"
    };
  }

  // 12. CASUAL CONVERSATIONS & CHECK-INS (No Sir)
  if (lower.includes("kaise ho") || lower.includes("how are you") || lower.includes("kya haal") || lower.includes("kaisi ho")) {
    return {
      action: "REPLY_ONLY",
      payload: "",
      emotion: "happy",
      response: "Main bilkul theek hoon! Aap batao, aaj ka din kaisa raha?",
      hindiSpoken: "मैं बिल्कुल ठीक हूँ! आप बताओ, आज का दिन कैसा रहा?"
    };
  }
  if (lower.includes("kya kar sakti") || lower.includes("kya kar sakte") || lower.includes("what can you do") || lower.includes("kya kaam hai")) {
    return {
      action: "REPLY_ONLY",
      payload: "",
      emotion: "happy",
      response: "Main Anya hoon! Aapse baatein kar sakti hoon, jokes suna sakti hoon, live demos dikha sakti hoon, aur website navigate kar sakti hoon.",
      hindiSpoken: "मैं अन्या हूँ! आपसे बातें कर सकती हूँ, जोक्स सुना सकती हूँ, लाइव डेमोज़ दिखा सकती हूँ, और वेबसाइट नेविगेट कर सकती हूँ।"
    };
  }
  if (lower.includes("aaj kya kar rahe") || lower.includes("kya kar rahe ho") || lower.includes("what are you doing") || lower.includes("kya chal raha") || lower.includes("kya kar rahi ho")) {
    return {
      action: "REPLY_ONLY",
      payload: "",
      emotion: "happy",
      response: "Bas aapke sath baatein kar rahi hoon! Waise aap aaj kya plan kar rahe ho?",
      hindiSpoken: "बस आपके साथ बातें कर रही हूँ! वैसे आप आज क्या प्लान कर रहे हो?"
    };
  }
  if (lower.includes("kaun ho tum") || lower.includes("who are you") || lower.includes("apna naam") || lower.includes("tumhara naam") || lower.includes("naam kya") || lower.includes("anya ka role") || lower.includes("aapka role") || lower.includes("tumhara role") || lower.includes("tum kya karti") || lower.includes("aap kya karti") || lower.includes("kya kaam hai")) {
    return {
      action: "REPLY_ONLY",
      payload: "",
      emotion: "happy",
      response: "Main Anya hoon, ANX Agency ki virtual assistant. Main clients ko unki requirements samajhne aur solutions explore karne mein help karti hoon.",
      hindiSpoken: "मैं अन्या हूँ, ए एन एक्स एजेंसी की वर्चुअल असिस्टेंट। मैं क्लाइंट्स को उनकी रिक्वायरमेंट्स समझने और सॉल्यूशंस एक्सप्लोर करने में हेल्प करती हूँ।"
    };
  }
  if (lower.includes("anx kya hai") || lower.includes("agency kya") || lower.includes("anx ke bare me")) {
    return {
      action: "REPLY_ONLY",
      payload: "",
      emotion: "happy",
      response: "ANX Agency high-performance modern websites aur custom e-commerce platforms banati hai!",
      hindiSpoken: "ए एन एक्स एजेंसी हाई-परफॉरमेंस मॉडर्न वेबसाइट्स और कस्टम ई-कॉमर्स प्लेटफॉर्म्स बनाती है!"
    };
  }

  // 12B. ANX AGENCY OFFICIAL TEAM KNOWLEDGE (Founders & Tech Developers: Nikhil & Aditya)
  // Check if user is asking unknown personal information about Nikhil or Aditya -> Do not hallucinate!
  if ((lower.includes("nikhil") || lower.includes("aditya")) && (
    lower.includes("age") || lower.includes("umar") || lower.includes("kahan rehta") || lower.includes("ghar") ||
    lower.includes("address") || lower.includes("number") || lower.includes("phone") || lower.includes("mobile") ||
    lower.includes("salary") || lower.includes("kamata") || lower.includes("personal") || lower.includes("shadi") ||
    lower.includes("wife") || lower.includes("gf") || lower.includes("girlfriend") || lower.includes("kahan se")
  )) {
    return {
      action: "REPLY_ONLY",
      payload: "",
      emotion: "neutral",
      response: "Uske baare mein mere paas abhi itni information nahi hai.",
      hindiSpoken: "उसके बारे में मेरे पास अभी इतनी जानकारी नहीं है।"
    };
  }

  // Tech developer query
  if (lower.includes("developer") || lower.includes("tech") || lower.includes("coding") || lower.includes("code kaun") || lower.includes("tech team")) {
    return {
      action: "REPLY_ONLY",
      payload: "",
      emotion: "happy",
      response: "Nikhil aur Aditya ANX Agency ke tech developers bhi hain.",
      hindiSpoken: "निखिल और आदित्य ए एन एक्स एजेंसी के टेक डेवलपर्स भी हैं।"
    };
  }

  // Who runs ANX / Management / Handle
  if (lower.includes("run karta") || lower.includes("chala raha") || lower.includes("chalata hai") || lower.includes("handle karta") || lower.includes("manage karta") || lower.includes("kaun chalata")) {
    return {
      action: "REPLY_ONLY",
      payload: "",
      emotion: "happy",
      response: "ANX Agency ko Nikhil aur Aditya run karte hain. Dono founders, owners aur tech developers hain.",
      hindiSpoken: "ए एन एक्स एजेंसी को निखिल और आदित्य रन करते हैं। दोनों फाउंडर्स, ओनर्स और टेक डेवलपर्स हैं।"
    };
  }

  // Founder / Owner / Malik
  if (lower.includes("founder") || lower.includes("owner") || lower.includes("malik") || lower.includes("agency kiski") || lower.includes("boss")) {
    return {
      action: "REPLY_ONLY",
      payload: "",
      emotion: "happy",
      response: "ANX Agency ke founders Nikhil aur Aditya hain.",
      hindiSpoken: "ए एन एक्स एजेंसी के फाउंडर्स निखिल और आदित्य हैं।"
    };
  }

  // Aditya query (role / who is Aditya)
  if (lower.includes("aditya") && (lower.includes("kaun") || lower.includes("kon") || lower.includes("who is") || lower.includes("role") || lower.includes("kya karta") || lower.includes("kya kaam"))) {
    return {
      action: "REPLY_ONLY",
      payload: "",
      emotion: "happy",
      response: "Aditya ANX Agency ke founder, owner aur tech developer hain. Woh aur Nikhil milkar agency run karte hain.",
      hindiSpoken: "आदित्य ए एन एक्स एजेंसी के फाउंडर, ओनर और टेक डेवलपर हैं। वो और निखिल मिलकर एजेंसी रन करते हैं।"
    };
  }

  // Nikhil query (role / who is Nikhil)
  if (lower.includes("nikhil") && (lower.includes("kaun") || lower.includes("kon") || lower.includes("who is") || lower.includes("role") || lower.includes("kya karta") || lower.includes("kya kaam"))) {
    return {
      action: "REPLY_ONLY",
      payload: "",
      emotion: "happy",
      response: "Nikhil ANX Agency ke founder, owner aur tech developer hain. Woh aur Aditya milkar agency run karte hain.",
      hindiSpoken: "निखिल ए एन एक्स एजेंसी के फाउंडर, ओनर और टेक डेवलपर हैं। वो और आदित्य मिलकर एजेंसी रन करते हैं।"
    };
  }

  // Team / Staff / Members / Kaun kaam karta hai / Saath kaun hai
  if (lower.includes("team") || lower.includes("staff") || lower.includes("members") || lower.includes("kaun-kaun") || lower.includes("kaun kaun") || lower.includes("saath kaun") || lower.includes("sath kaun") || lower.includes("kaun kaam karta") || lower.includes("who works")) {
    return {
      action: "REPLY_ONLY",
      payload: "",
      emotion: "happy",
      response: "ANX Agency ko Nikhil aur Aditya run karte hain, dono founders, owners aur tech developers hain.",
      hindiSpoken: "ए एन एक्स एजेंसी को निखिल और आदित्य रन करते हैं, दोनों फाउंडर्स, ओनर्स और टेक डेवलपर्स हैं।"
    };
  }

  // 13. GREETINGS & UNCLEAR REQUESTS -> GENERAL HELP QUESTION (No Sir)
  if (lower.startsWith("hello") || lower.startsWith("hi") || lower.startsWith("hey") || lower.startsWith("namaste") || lower.startsWith("namaskar") || lower === "anya" || lower === "sunoji") {
    return {
      action: "REPLY_ONLY",
      payload: "",
      emotion: "happy",
      response: "Namaste! Main Anya hoon. Aap kya madad chahte hain?",
      hindiSpoken: "नमस्ते! मैं अन्या हूँ। आप क्या मदद चाहते हैं?"
    };
  }

  // 14. SPECIFIC DEMO COMMANDS (Orders with "Sir")
  if (lower.includes("beauty") || lower.includes("makeup") || lower.includes("salon") || lower.includes("parlour") || lower.includes("spa") || lower.includes("bridal") || lower.includes("shadi")) {
    return { action: "SHOW_SALON_DEMO", payload: "", emotion: "happy", response: "Ji Sir, abhi beauty demo kholti hoon.", hindiSpoken: "जी सर, अभी ब्यूटी डेमो खोलती हूँ।" };
  }
  if (lower.includes("cloth") || lower.includes("fashion") || lower.includes("dress") || lower.includes("boutique") || lower.includes("saree") || lower.includes("jeans") || lower.includes("kapd")) {
    return { action: "SHOW_TUITION_DEMO", payload: "", emotion: "happy", response: "Okay Sir, clothes demo open kar rahi hoon.", hindiSpoken: "ओके सर, क्लोथ्स डेमो ओपन कर रही हूँ।" };
  }
  if (lower.includes("bakery") || lower.includes("cake") || lower.includes("pastry") || lower.includes("sweetcrust") || lower.includes("biscuit")) {
    return { action: "SHOW_BAKERY_DEMO", payload: "", emotion: "happy", response: "Sure Sir, bakery demo open kar rahi hoon.", hindiSpoken: "श्योर सर, बेकरी डेमो ओपन कर रही हूँ।" };
  }
  if (lower.includes("pizza") || lower.includes("restaurant") || lower.includes("cafe") || lower.includes("burger") || (lower.includes("food") && (lower.includes("demo") || lower.includes("kholo") || lower.includes("dikhao")))) {
    return { action: "SHOW_PIZZA_DEMO", payload: "", emotion: "happy", response: "Okay Sir, restaurant demo open kar rahi hoon.", hindiSpoken: "ओके सर, रेस्टोरेंट डेमो ओपन कर रही हूँ।" };
  }
  if (lower.includes("ecommerce") || lower.includes("mart") || lower.includes("online store") || lower.includes("shopping") || lower.includes("shop") || lower.includes("anx mart")) {
    return { action: "SHOW_BUSINESS_DEMO", payload: "", emotion: "happy", response: "Ji Sir, e-commerce demo open kar rahi hoon.", hindiSpoken: "जी सर, ई-कॉमर्स डेमो ओपन कर रही हूँ।" };
  }
  if (lower.includes("electronic") || lower.includes("mobile") || lower.includes("laptop") || lower.includes("gadget") || lower.includes("technova") || lower.includes("tv")) {
    return { action: "SHOW_ELECTRONICS_DEMO", payload: "", emotion: "happy", response: "Okay Sir, electronics demo open kar rahi hoon.", hindiSpoken: "ओके सर, इलेक्ट्रॉनिक्स डेमो ओपन कर रही हूँ।" };
  }

  // 15. GENERAL DEMO INQUIRY (User mentions demo without category -> Ask one of the 3 questions, do NOT auto-launch demo)
  if (lower.includes("demo dekhna") || lower.includes("demo dikhao") || lower.includes("demo kya hai") || lower.includes("demos") || lower.includes("kaunse demo") || lower === "demo") {
    const prompt = getRandomDemoPrompt();
    return {
      action: "REPLY_ONLY",
      payload: "",
      emotion: "happy",
      response: prompt.text,
      hindiSpoken: prompt.hindi
    };
  }

  // 16. CONTEXT-AWARE COMMANDS ("iska demo kholo", "ye wala kholo", "ye project dikhao")
  if (lower.includes("iska demo") || lower.includes("ye wala") || lower.includes("ye demo") || lower.includes("iska project") || lower.includes("pehla wala") || lower.includes("open this")) {
    if (context.activeMemberId === 1) {
      return { action: "SHOW_BUSINESS_DEMO", payload: "1", emotion: "happy", response: "Ji Sir, abhi demo open kar rahi hoon.", hindiSpoken: "जी सर, अभी डेमो ओपन कर रही हूँ।" };
    }
    if (context.activeMemberId === 2) {
      return { action: "SHOW_ELECTRONICS_DEMO", payload: "2", emotion: "happy", response: "Ji Sir, abhi demo open kar rahi hoon.", hindiSpoken: "जी सर, अभी डेमो ओपन कर रही हूँ।" };
    }
    if (context.activeCarouselItem) {
      const item = context.activeCarouselItem;
      if (item.isBeautyDemo) return { action: "SHOW_SALON_DEMO", payload: "", emotion: "happy", response: "Ji Sir, abhi beauty demo kholti hoon.", hindiSpoken: "जी सर, अभी ब्यूटी डेमो खोलती हूँ।" };
      if (item.isClothesDemo) return { action: "SHOW_TUITION_DEMO", payload: "", emotion: "happy", response: "Okay Sir, clothes demo open kar rahi hoon.", hindiSpoken: "ओके सर, क्लोथ्स डेमो ओपन कर रही हूँ।" };
      if (item.isElectronicsDemo) return { action: "SHOW_ELECTRONICS_DEMO", payload: "", emotion: "happy", response: "Okay Sir, electronics demo open kar rahi hoon.", hindiSpoken: "ओके सर, इलेक्ट्रॉनिक्स डेमो ओपन कर रही हूँ।" };
      if (item.isBakeryDemo) return { action: "SHOW_BAKERY_DEMO", payload: "", emotion: "happy", response: "Sure Sir, bakery demo open kar rahi hoon.", hindiSpoken: "श्योर सर, बेकरी डेमो ओपन कर रही हूँ।" };
      if (item.isEcommerceDemo) return { action: "SHOW_BUSINESS_DEMO", payload: "", emotion: "happy", response: "Ji Sir, e-commerce demo open kar rahi hoon.", hindiSpoken: "जी सर, ई-कॉमर्स डेमो ओपन कर रही हूँ।" };
      if (item.isLiveDemo) return { action: "SHOW_PIZZA_DEMO", payload: "", emotion: "happy", response: "Okay Sir, restaurant demo open kar rahi hoon.", hindiSpoken: "ओके सर, रेस्टोरेंट डेमो ओपन कर रही हूँ।" };
    }
    const prompt = getRandomDemoPrompt();
    return { action: "REPLY_ONLY", payload: "", emotion: "happy", response: prompt.text, hindiSpoken: prompt.hindi };
  }

  // 17. WEBSITE NAVIGATION & SCROLLING COMMANDS (Commands with "Sir")
  if (lower.includes("home kholo") || lower.includes("home par") || lower.includes("home dikhao") || lower.includes("top par") || lower.includes("main page") || lower === "home") {
    return { action: "OPEN_HOME", payload: "", emotion: "happy", response: "Ji Sir, home page par le ja rahi hoon.", hindiSpoken: "जी सर, होम पेज पर ले जा रही हूँ।" };
  }
  if (lower.includes("about dikhao") || lower.includes("about kholo") || lower.includes("about par") || lower.includes("about section") || lower === "about") {
    return { action: "OPEN_ABOUT", payload: "", emotion: "happy", response: "Okay Sir, about section open kar rahi hoon.", hindiSpoken: "ओके सर, अबाउट सेक्शन ओपन कर रही हूँ।" };
  }
  if (lower.includes("portfolio kholo") || lower.includes("portfolio dikhao") || lower.includes("portfolio par") || lower.includes("projects dikhao") || lower.includes("team dikhao") || lower.includes("members dikhao") || lower === "portfolio") {
    return { action: "OPEN_PORTFOLIO", payload: "", emotion: "happy", response: "Ji Sir, portfolio section open kar rahi hoon.", hindiSpoken: "जी सर, पोर्टफोलियो सेक्शन ओपन कर रही हूँ।" };
  }
  if (lower.includes("contact par") || lower.includes("contact kholo") || lower.includes("contact dikhao") || lower.includes("sampark") || lower === "contact") {
    return { action: "OPEN_CONTACT", payload: "", emotion: "happy", response: "Okay Sir, contact section par le chalte hain.", hindiSpoken: "ओके सर, कांटेक्ट सेक्शन पर ले चलते हैं।" };
  }
  if (lower.includes("demo sites dikhao") || lower.includes("demo sites kholo") || lower.includes("saare demos") || lower.includes("all demos") || lower.includes("demo sites")) {
    return { action: "OPEN_DEMO_SITES", payload: "", emotion: "happy", response: "Ji Sir, saare demo sites open kar rahi hoon.", hindiSpoken: "जी सर, सारे डेमो साइट्स ओपन कर रही हूँ।" };
  }
  if (lower.includes("services dikhao") || lower.includes("services kholo") || lower.includes("services section") || lower === "services") {
    return { action: "OPEN_SERVICES", payload: "", emotion: "happy", response: "Sure Sir, services section dikha rahi hoon.", hindiSpoken: "श्योर सर, सर्विसेज सेक्शन दिखा रही हूँ।" };
  }
  if (lower.includes("neeche scroll") || lower.includes("niche scroll") || lower.includes("scroll down") || lower.includes("niche jao") || lower.includes("neeche karo") || lower.includes("thoda niche")) {
    return { action: "SCROLL_DOWN", payload: "", emotion: "happy", response: "Sure Sir, scroll kar rahi hoon.", hindiSpoken: "श्योर सर, स्क्रॉल कर रही हूँ।" };
  }
  if (lower.includes("upar scroll") || lower.includes("scroll up") || lower.includes("upar jao") || lower.includes("upar karo") || lower.includes("thoda upar")) {
    return { action: "SCROLL_UP", payload: "", emotion: "happy", response: "Sure Sir, upar scroll kar rahi hoon.", hindiSpoken: "श्योर सर, ऊपर स्क्रॉल कर रही हूँ।" };
  }
  if (lower.includes("wapas jao") || lower.includes("back jao") || lower.includes("go back") || lower.includes("back to agency") || lower.includes("peeche jao") || lower.includes("exit demo") || lower.includes("close demo")) {
    return { action: "RETURN_TO_ANX", payload: "", emotion: "happy", response: "Sure Sir, back to agency chalte hain.", hindiSpoken: "श्योर सर, बैक टू एजेंसी चलते हैं।" };
  }

  // 18. CONTACT / WHATSAPP / CALL COMMANDS (Orders with "Sir")
  if (lower.includes("whatsapp") || lower.includes("chat")) {
    return { action: "OPEN_WHATSAPP", payload: "", emotion: "happy", response: "Ji Sir, WhatsApp chat open kar rahi hoon.", hindiSpoken: "जी सर, व्हाट्सएप चैट ओपन कर रही हूँ।" };
  }
  if (lower.includes("call karo") || lower.includes("phone milao") || lower.includes("call now")) {
    return { action: "OPEN_CALL", payload: "", emotion: "happy", response: "Sure Sir, direct call connect kar rahi hoon.", hindiSpoken: "श्योर सर, डायरेक्ट कॉल कनेक्ट कर रही हूँ।" };
  }

  // 19. PRICING INQUIRIES
  if (lower.includes("price") || lower.includes("pricing") || lower.includes("cost") || lower.includes("kharcha") || lower.includes("budget") || lower.includes("rate") || lower.includes("charges")) {
    return {
      action: "REPLY_ONLY",
      payload: "",
      emotion: "happy",
      response: "Humare website packages bohot budget-friendly hain! Special quotation ke liye WhatsApp par connect kar sakte hain.",
      hindiSpoken: "हमारे वेबसाइट पैकेजेस बहुत बजट-फ्रेंडली हैं! स्पेशल कोटेशन के लिए व्हाट्सएप पर कनेक्ट कर सकते हैं।"
    };
  }

  // General help fallback question when request is unclear
  return {
    action: "REPLY_ONLY",
    payload: "",
    emotion: "neutral",
    response: "Aap kya madad chahte hain?",
    hindiSpoken: "आप क्या मदद चाहते हैं?"
  };
}

export async function handleVoiceAgentRequest({
  transcript,
  history = [],
  context = {}
}: {
  transcript: string;
  history?: any[];
  context?: any;
}) {
  if (!transcript || typeof transcript !== "string") {
    return {
      status: 400,
      data: { error: "Transcript is required." }
    };
  }

  // Pre-execution content moderation check
  const mod = checkContentModeration(transcript);
  if (mod.isInappropriate) {
    return {
      status: 200,
      data: {
        action: "REPLY_ONLY",
        payload: "",
        emotion: "annoyed",
        response: "Shame on you. Please don't talk like that.",
        hindiSpoken: "शेम ऑन यू। प्लीज डोंट टॉक लाइक दैट।",
        isInappropriate: true,
      }
    };
  }

  try {
    const client = getGenAI();
    if (!client) {
      return {
        status: 200,
        data: getLocalFallback(transcript, context)
      };
    }

    // Construct contents for Gemini including real-time website context
    const contents = (history || []).map((msg: any) => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    const contextSummary = `CURRENT WEBSITE CONTEXT:
- Current View / Page: ${context.currentView || "agency"}
- Active Member Profile: ${context.activeMemberId ? `Member ${context.activeMemberId} (${context.activeMemberId === 1 ? 'Aditya - Founder, Owner & Tech Developer' : 'Nikhil - Founder, Owner & Tech Developer'})` : "None"}
- Active Carousel Item: ${context.activeCarouselItem?.titleLine1 || context.activeCarouselItem?.title || "None"}
- Visible Section: ${context.visibleSection || "home"}
- URL: ${context.url || ""}`;

    contents.push({
      role: 'user',
      parts: [{ text: `${contextSummary}\n\nUser Message: "${transcript}"` }]
    });

    // Recommended models per guidelines
    const modelsToTry = ["gemini-3.8-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];
    let parsed: any = null;

    for (const modelName of modelsToTry) {
      if (!isModelAvailable(modelName)) {
        continue;
      }

      try {
        const generatePromise = client.models.generateContent({
          model: modelName,
          contents: contents,
          config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: responseSchema,
            temperature: 0.2,
          },
        });

        // 4.5 second timeout safeguard
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
        const errMsg = typeof err?.message === "string" ? err.message : JSON.stringify(err || "");
        const status = err?.status || err?.code;
        if (status === 429 || status === "RESOURCE_EXHAUSTED" || errMsg.includes("429") || errMsg.includes("RESOURCE_EXHAUSTED")) {
          markModelCooldown(modelName, 60000);
        } else if (status === 503 || status === "UNAVAILABLE" || errMsg.includes("503") || errMsg.includes("high demand")) {
          markModelCooldown(modelName, 30000);
        }
      }
    }

    if (parsed && parsed.response) {
      return {
        status: 200,
        data: parsed
      };
    }

    return {
      status: 200,
      data: getLocalFallback(transcript, context)
    };
  } catch {
    return {
      status: 200,
      data: getLocalFallback(transcript, context)
    };
  }
}
