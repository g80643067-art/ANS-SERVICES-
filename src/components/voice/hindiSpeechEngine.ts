/**
 * Hindi / Hinglish Speech Engine & Pronunciation Quality Optimizer for Anya
 * 
 * Provides:
 * 1. Hindi grammar and sentence structure validation.
 * 2. Word pronunciation corrections (fixing TTS artifacts like "mnt" -> "मन/mann", "kyu" -> "क्यों", "hn" -> "हाँ").
 * 3. Devanagari Hindi conversion for native Hindi TTS engines (hi-IN / Google हिन्दी / Swara / Lekha).
 * 4. High-clarity phonetic Roman conversion for non-Hindi TTS fallbacks.
 * 5. Letter-by-letter ANX pronunciation ("ए एन एक्स" / "A, N, X").
 */

// Common Hinglish to Devanagari word mappings for natural conversational spoken Hindi
const HINGLISH_DICTIONARY: Record<string, string> = {
  // Pronouns & Postpositions
  "main": "मैं",
  "mai": "मैं",
  "me": "मैं",
  "mera": "मेरा",
  "meri": "मेरी",
  "mere": "मेरे",
  "mujhe": "मुझे",
  "mujhko": "मुझको",
  "hum": "हम",
  "humare": "हमारे",
  "hamara": "हमारा",
  "hamari": "हमारी",
  "humko": "हमको",
  "humein": "हमें",
  "aap": "आप",
  "aapka": "आपका",
  "aapki": "आपकी",
  "aapke": "आपके",
  "aapko": "आपको",
  "aapse": "आपसे",
  "tum": "तुम",
  "tumhara": "तुम्हारा",
  "tumhari": "तुम्हारी",
  "tumhare": "तुम्हारे",
  "tumhe": "तुम्हें",
  "tumse": "तुमसे",
  "ye": "ये",
  "yeh": "यह",
  "wo": "वो",
  "woh": "वह",
  "inka": "इनका",
  "unka": "उनका",
  "iska": "इसका",
  "uski": "उसकी",
  "uske": "उसके",
  "usko": "उसको",
  "isse": "इससे",
  "usse": "उससे",
  "ka": "का",
  "ki": "की",
  "ke": "के",
  "ko": "को",
  "se": "से",
  "mein": "में",
  "meinn": "में",
  "par": "पर",
  "pe": "पे",
  "tak": "तक",
  "saath": "साथ",
  "sath": "साथ",
  "liye": "लिए",

  // Identity & Core Words
  "anya": "अन्या",
  "anx": "ए एन एक्स",
  "agency": "एजेंसी",
  "boss": "बॉस",
  "assistant": "असिस्टेंट",
  "companion": "साथी",
  "virtual": "वर्चुअल",
  "guide": "गाइड",
  "ai": "ए आई",

  // Interrogatives & Quantifiers
  "kya": "क्या",
  "kyun": "क्यों",
  "kyu": "क्यों",
  "kaise": "कैसे",
  "kaisa": "कैसा",
  "kaisi": "कैसी",
  "kab": "कब",
  "kaha": "कहाँ",
  "kahan": "कहाँ",
  "kidhar": "किधर",
  "kaun": "कौन",
  "kaunsa": "कौन सा",
  "kitna": "कितना",
  "kitni": "कितनी",
  "kitne": "कितने",
  "kuch": "कुछ",
  "kuchh": "कुछ",
  "sab": "सब",
  "sabkuch": "सबकुछ",
  "bohot": "बहुत",
  "bahut": "बहुत",
  "jyada": "ज़्यादा",
  "zyada": "ज़्यादा",
  "thoda": "थोड़ा",
  "kam": "कम",

  // Common Verbs & Participles
  "hai": "है",
  "hain": "हैं",
  "hoon": "हूँ",
  "hun": "हूँ",
  "ho": "हो",
  "tha": "था",
  "thi": "थी",
  "the": "थे",
  "hoga": "होगा",
  "hogi": "होगी",
  "honge": "होंगे",
  "karo": "करो",
  "karein": "करें",
  "karen": "करें",
  "kar": "कर",
  "karna": "करना",
  "karni": "करनी",
  "karne": "करने",
  "kar raha": "कर रहा",
  "kar rahi": "कर रही",
  "kar rahe": "कर रहे",
  "karunga": "करूँगा",
  "karungi": "करूँगी",
  "karenge": "करेंगे",
  "batao": "बताओ",
  "bataiye": "बताइए",
  "batana": "बताना",
  "bolo": "बोलो",
  "boliye": "बोलिए",
  "poocho": "पूछो",
  "poochu": "पूछूँ",
  "poochun": "पूछूँ",
  "sunao": "सुनाओ",
  "sunau": "सुनाऊँ",
  "sunaun": "सुनाऊँ",
  "dekho": "देखो",
  "dekhiye": "देखिए",
  "dekhna": "देखना",
  "dikhao": "दिखाओ",
  "dikhaun": "दिखाऊँ",
  "kholo": "खोलो",
  "kholun": "खोलूँ",
  "jao": "जाओ",
  "jaiye": "जाइए",
  "aao": "आओ",
  "aaiye": "आइए",
  "raha": "रहा",
  "rahi": "रही",
  "rahe": "रहे",
  "sakta": "सकता",
  "sakti": "सकती",
  "sakte": "सकते",
  "chahiye": "चाहिए",
  "chahta": "चाहता",
  "chahti": "चाहती",
  "chahte": "चाहते",
  "lagta": "लगता",
  "lagti": "लगती",
  "lag": "लग",
  "chalo": "चलो",
  "chal": "चल",
  "soch": "सोच",
  "sochte": "सोचते",
  "soch rahe": "सोच रहे",

  // Mind, Feelings & Emotions
  "mann": "मन",
  "man": "मन",
  "dil": "दिल",
  "bhook": "भूख",
  "bhookh": "भूख",
  "khana": "खाना",
  "khaana": "खाना",
  "pyaas": "प्यास",
  "neend": "नींद",
  "pyaar": "प्यार",
  "pyar": "प्यार",
  "gussa": "गुस्सा",
  "khush": "खुश",
  "udaas": "उदास",
  "pareshan": "परेशान",
  "dard": "दर्द",
  "shant": "शांत",
  "sukoon": "सुकून",
  "dosti": "दोस्ती",
  "pakki": "पक्की",
  "achha": "अच्छा",
  "achhi": "अच्छी",
  "achhe": "अच्छे",
  "bura": "बुरा",
  "buri": "बुरी",
  "theek": "ठीक",
  "thik": "ठीक",
  "sahi": "सही",
  "galat": "गलत",
  "sach": "सच",
  "jhooth": "झूठ",
  "bilkul": "बिल्कुल",
  "mast": "मस्त",
  "badhiya": "बढ़िया",
  "zabardast": "ज़बरदस्त",
  "sundar": "सुंदर",
  "chup": "चुप",
  "shor": "शोर",
  "hamesha": "हमेशा",
  "kabhi": "कभी",
  "aaj": "आज",
  "kal": "कल",
  "ab": "अब",
  "phir": "फिर",
  "pehle": "पहले",
  "baad": "बाद",

  // Greetings, Expressions & Slang
  "namaste": "नमस्ते",
  "namaskar": "नमस्कार",
  "hello": "हेलो",
  "hi": "हाय",
  "hey": "हे",
  "welcome": "वेलकम",
  "shukriya": "शुक्रिया",
  "dhanyawad": "धन्यवाद",
  "thanks": "थैंक्स",
  "thank you": "थैंक यू",
  "sorry": "सॉरी",
  "maaf": "माफ़",
  "please": "प्लीज़",
  "arey": "अरे",
  "achha ji": "अच्छा जी",
  "hmm": "हूँ",
  "hm": "हूँ",
  "haha": "हाहा",
  "hahaha": "हाहाहा",
  "hehe": "हेहे",
  "lol": "लोल",
  "joke": "जोक",
  "chutkula": "चुटकुला",
  "funny": "फनी",
  "gaana": "गाना",
  "gana": "गाना",
  "geet": "गीत",
  "surili": "सुरीली",
  "aawaz": "आवाज़",
  "awaz": "आवाज़",
  "dhun": "धुन",
  "sawaal": "सवाल",
  "sawal": "सवाल",
  "jawaab": "जवाब",
  "jawab": "जवाब",
  "baat": "बात",
  "baatein": "बातें",
  "madad": "मदद",
  "help": "हेल्प",
  "kaam": "काम",
  "din": "दिन",
  "raat": "रात",
  "subah": "सुबह",
  "shaam": "शाम",
  "time": "टाइम",
  "waqt": "वक़्त",
  "plan": "प्लान",
  "ignore": "इग्नोर",
  "friendly": "फ्रेंडली",
  "cute": "क्यूट",
  "smart": "स्मार्ट",
  "best": "बेस्ट",
  "great": "ग्रेट",
  "ready": "रेडी",
  "chill": "चिल",
  "bore": "बोर",

  // Business & Website Terms
  "website": "वेबसाइट",
  "websites": "वेबसाइट्स",
  "demo": "डेमो",
  "demos": "डेमोज़",
  "design": "डिज़ाइन",
  "designs": "डिज़ाइन्स",
  "portfolio": "पोर्टफोलियो",
  "services": "सर्विसेज",
  "contact": "कांटेक्ट",
  "about": "अबाउट",
  "home": "होम",
  "page": "पेज",
  "top": "टॉप",
  "scroll": "स्क्रॉल",
  "down": "डाउन",
  "up": "अप",
  "back": "बैक",
  "exit": "एग्जिट",
  "store": "स्टोर",
  "shop": "शॉप",
  "shopping": "शॉपिंग",
  "ecommerce": "ई-कॉमर्स",
  "mart": "मार्ट",
  "pizza": "पिज़्ज़ा",
  "restaurant": "रेस्टोरेंट",
  "cafe": "कैफे",
  "bakery": "बेकरी",
  "cake": "केक",
  "salon": "सैलून",
  "parlour": "पार्लर",
  "beauty": "ब्यूटी",
  "spa": "स्पा",
  "fashion": "फैशन",
  "boutique": "बुटीक",
  "clothes": "कपड़े",
  "electronics": "इलेक्ट्रॉनिक्स",
  "mobile": "मोबाइल",
  "laptop": "लैपटॉप",
  "packages": "पैकेजेस",
  "price": "प्राइस",
  "pricing": "प्राइसिंग",
  "budget": "बजट",
  "quotation": "कोटेशन",
  "whatsapp": "व्हाट्सएप",
  "call": "कॉल",
  "online": "ऑनलाइन",
  "custom": "कस्टम",
  "modern": "मॉडर्न",
  "fast": "फास्ट",
  "high performance": "हाई-परफॉरमेंस",

  // Command acknowledgments
  "ok": "ओके",
  "okay": "ओके",
  "sure": "श्योर",
  "done": "डन",
  "on it": "ऑन इट",
  "got it": "गॉट इट",
  "yes": "यस",
  "haan": "हाँ",
  "nahi": "नहीं",
  "na": "ना"
};

/**
 * Normalizes grammar and fixes common phonetic/spelling glitches
 */
export function normalizeHindiGrammar(text: string): string {
  if (!text) return "";

  let cleaned = text;

  // 1. Specific broken sentence patterns from user prompts / bad models
  cleaned = cleaned.replace(/\baap kya karne mnt ho\b/gi, "Aapka kya karne ka mann kar raha hai?");
  cleaned = cleaned.replace(/\bkya karne mnt ho\b/gi, "kya karne ka mann kar raha hai");
  cleaned = cleaned.replace(/\bkarne mnt ho\b/gi, "karne ka mann kar rahe ho");
  cleaned = cleaned.replace(/\bkarne mnt\b/gi, "karne ka mann");
  cleaned = cleaned.replace(/\bmnt ho\b/gi, "mann hai");

  // 2. Fix specific word abbreviations & typos
  cleaned = cleaned.replace(/\bmnt\b/gi, "mann");
  cleaned = cleaned.replace(/\bhn\b/gi, "haan");
  cleaned = cleaned.replace(/\byr\b/gi, "yaar");
  cleaned = cleaned.replace(/\bkyu\b/gi, "kyun");
  cleaned = cleaned.replace(/\bq\b/gi, "kyun");
  cleaned = cleaned.replace(/\bbtao\b/gi, "batao");
  cleaned = cleaned.replace(/\bkro\b/gi, "karo");
  cleaned = cleaned.replace(/\bkr\b/gi, "kar");
  cleaned = cleaned.replace(/\bkr rha\b/gi, "kar raha");
  cleaned = cleaned.replace(/\bkr rhi\b/gi, "kar rahi");
  cleaned = cleaned.replace(/\bkr rhe\b/gi, "kar rahe");
  cleaned = cleaned.replace(/\bmjhe\b/gi, "mujhe");
  cleaned = cleaned.replace(/\bapko\b/gi, "aapko");
  cleaned = cleaned.replace(/\bapka\b/gi, "aapka");
  cleaned = cleaned.replace(/\bapki\b/gi, "aapki");
  cleaned = cleaned.replace(/\bapke\b/gi, "aapke");
  cleaned = cleaned.replace(/\bmuje\b/gi, "mujhe");
  cleaned = cleaned.replace(/\bni\b/gi, "nahi");
  cleaned = cleaned.replace(/\bnhn\b/gi, "nahi");

  // 3. Ensure ANX is formatted letter-by-letter
  cleaned = cleaned.replace(/\bANX\b/g, "A, N, X");
  cleaned = cleaned.replace(/\banx\.agency\b/gi, "A, N, X agency");

  return cleaned.trim();
}

/**
 * Checks if a string contains Devanagari characters
 */
export function containsDevanagari(text: string): boolean {
  return /[\u0900-\u097F]/.test(text);
}

/**
 * Transliterates Hinglish sentence to grammatically natural Devanagari for Hindi TTS engines
 */
export function transliterateHinglishToDevanagari(text: string): string {
  if (!text) return "";
  if (containsDevanagari(text)) {
    // Already contains Devanagari; just sanitize any remaining ANX
    return text.replace(/\bANX\b/gi, "ए एन एक्स").replace(/\banx\b/gi, "ए एन एक्स");
  }

  const normalized = normalizeHindiGrammar(text);

  // Exact full sentence lookups for frequent dialogue
  const EXACT_SENTENCES: Record<string, string> = {
    "welcome! main anya hoon, aapki virtual companion. main aapki kya madad kar sakti hoon?":
      "वेलकम! मैं अन्या हूँ, आपकी वर्चुअल साथी। मैं आपकी क्या मदद कर सकती हूँ?",
    "welcome to anx agency! main aapki ai assistant hoon. main aapki kya madad kar sakti hoon?":
      "ए एन एक्स एजेंसी में आपका स्वागत है! मैं अन्या हूँ, आपकी AI साथी। मैं आपकी क्या मदद कर सकती हूँ?",
    "boss, aap itne chup kyun ho?": "बॉस, आप इतने चुप क्यों हो?",
    "hmm… mujhe ignore kar rahe ho kya?": "हूँ... मुझे इग्नोर कर रहे हो क्या?",
    "hmm... mujhe ignore kar rahe ho kya?": "हूँ... मुझे इग्नोर कर रहे हो क्या?",
    "aaj kya plan hai boss?": "आज क्या प्लान है बॉस?",
    "kuch poochna tha kya boss?": "कुछ पूछना था क्या बॉस?",
    "main ek sawaal poochu boss?": "मैं एक सवाल पूछूँ बॉस?",
    "waise aap kya soch rahe ho?": "वैसे आप क्या सोच रहे हो?",
    "kuch interesting batao na boss!": "कुछ इंटरेस्टिंग बताओ ना बॉस!",
    "main ek chota sa joke sunau kya?": "मैं एक छोटा सा जोक सुनाऊँ क्या?",
    "aww thank you boss! aap bhi bohot ache ho! waise aaj kya plan hai?":
      "ओह थैंक यू बॉस! आप भी बहुत अच्छे हो! वैसे आज क्या प्लान है?",
    "hahaha, yeh sach me bohot funny tha! ek aur sunao na?":
      "हाहाहा, यह सच में बहुत फनी था! एक और सुनाओ ना?",
    "chalo koi baat nahi, ab dosti pakki! batao aage kya karein?":
      "चलो कोई बात नहीं, अब दोस्ती पक्की! बताओ आगे क्या करें?",
    "hmph! ab main aapse baat nahi kar rahi! itne pyaar se toh help kar rahi hoon.":
      "हम्फ! अब मैं आपसे बात नहीं कर रही! इतने प्यार से तो हेल्प कर रही हूँ।",
    "arey shant ho jao boss, main toh bas friendly baat kar rahi thi. bataiye kya madad karun?":
      "अरे शांत हो जाओ बॉस, मैं तो बस फ्रेंडली बात कर रही थी। बताइए क्या मदद करूँ?",
    "oh no, please udaas mat ho! main hamesha aapke sath hoon na.":
      "ओह नो, प्लीज उदास मत हो! मैं हमेशा आपके साथ हूँ ना।",
    "arey kya hua boss? sab theek toh hai na? main mood fresh karne ke liye koi mast demo dikhaun?":
      "अरे क्या हुआ बॉस? सब ठीक तो है ना? मैं मूड फ्रेश करने के लिए कोई मस्त डेमो दिखाऊँ?",
    "really?! sach me aisa hua? phir aage kya hua?":
      "रियली?! सच में ऐसा हुआ? फिर आगे क्या हुआ?",
    "bore ho rahe ho? chalo hamare stylish electronics ya pizza ordering demo explore karte hain!":
      "बोर हो रहे हो? चलो हमारे स्टाइलिश इलेक्ट्रॉनिक्स या पिज़्ज़ा ऑर्डरिंग डेमो एक्सप्लोर करते हैं!",
    "boss, mujhe bhi bhook lag rahi hai... kuch khane ko milega? hamara live pizza restaurant demo dikhaun?":
      "बॉस, मुझे भी भूख लग रही है... कुछ खाने को मिलेगा? हमारा लाइव पिज़्ज़ा रेस्टोरेंट डेमो दिखाऊँ?",
    "main bilkul mast aur ready hoon boss! aap batao, aaj ka din kaisa raha?":
      "मैं बिल्कुल मस्त और रेडी हूँ बॉस! आप बताओ, आज का दिन कैसा रहा?",
    "main anya hoon! aapse baatein kar sakti hoon, jokes suna sakti hoon, live demos dikha sakti hoon, aur website navigate kar sakti hoon.":
      "मैं अन्या हूँ! आपसे बातें कर सकती हूँ, जोक्स सुना सकती हूँ, लाइव डेमोज़ दिखा सकती हूँ, और वेबसाइट नेविगेट कर सकती हूँ।",
    "bas boss, aapke sath chill kar rahi hoon! waise aap aaj kya plan kar rahe ho?":
      "बस बॉस, आपके साथ चिल कर रही हूँ! वैसे आप आज क्या प्लान कर रहे हो?",
    "mera naam anya hai! main aapki friendly virtual companion aur a, n, x agency guide hoon.":
      "मेरा नाम अन्या है! मैं आपकी फ्रेंडली वर्चुअल साथी और ए एन एक्स एजेंसी गाइड हूँ।",
    "a, n, x agency high-performance modern websites aur custom e-commerce platforms banati hai boss!":
      "ए एन एक्स एजेंसी हाई-परफॉरमेंस मॉडर्न वेबसाइट्स और कस्टम ई-कॉमर्स प्लेटफॉर्म्स बनाती है बॉस!",
    "namaste boss! main anya hoon. kahiye, aaj kaun sa naya website demo explore karein?":
      "नमस्ते बॉस! मैं अन्या हूँ। कहिए, आज कौन सा नया वेबसाइट डेमो एक्सप्लोर करें?",
    "humare website packages bohot budget-friendly hain boss! special quotation ke liye whatsapp par connect kar sakte hain.":
      "हमारे वेबसाइट पैकेजेस बहुत बजट-फ्रेंडली हैं बॉस! स्पेशल कोटेशन के लिए व्हाट्सएप पर कनेक्ट कर सकते हैं।",
    "ok boss!": "ओके बॉस!",
    "sure boss!": "श्योर बॉस!",
    "done boss!": "डन बॉस!",
    "on it boss!": "ऑन इट बॉस!",
    "got it boss!": "गॉट इट बॉस!",
    "yes boss!": "यस बॉस!"
  };

  const lowerNorm = normalized.toLowerCase().replace(/[.,!?;:]/g, "").trim();
  for (const [key, val] of Object.entries(EXACT_SENTENCES)) {
    const keyClean = key.toLowerCase().replace(/[.,!?;:]/g, "").trim();
    if (lowerNorm === keyClean) {
      return val;
    }
  }

  // Token-by-token contextual replacement while preserving punctuation and English technical nouns
  // Split into tokens (words and punctuation)
  const tokens = normalized.split(/([,.\s!?:;~]+)/);
  const devanagariTokens = tokens.map((token) => {
    if (!token || /^[,.\s!?:;~]+$/.test(token)) return token;

    const lower = token.toLowerCase();

    // Check direct dictionary
    if (HINGLISH_DICTIONARY[lower]) {
      return HINGLISH_DICTIONARY[lower];
    }

    // Single letters for A, N, X
    if (token === "A" || token === "a") return "ए";
    if (token === "N" || token === "n") return "एन";
    if (token === "X" || token === "x") return "एक्स";

    // Keep natural English words if already recognizable
    return token;
  });

  return devanagariTokens.join("").trim();
}

/**
 * Phonetic Roman formatter for non-Hindi TTS engines to prevent swallowed vowels or 'mnt' artifacts
 */
export function formatPhoneticRoman(text: string): string {
  if (!text) return "";

  let res = normalizeHindiGrammar(text);

  // Replace words that English TTS engines typically mutilate
  res = res.replace(/\bmann\b/gi, "mahn");
  res = res.replace(/\bman\b/gi, "mahn");
  res = res.replace(/\bkya\b/gi, "kyaa");
  res = res.replace(/\bkyun\b/gi, "kyoon");
  res = res.replace(/\bkyu\b/gi, "kyoon");
  res = res.replace(/\bmujhe\b/gi, "mujhey");
  res = res.replace(/\bmujhe\b/gi, "mujhey");
  res = res.replace(/\baapse\b/gi, "aap sey");
  res = res.replace(/\bbataiye\b/gi, "bataayeeye");
  res = res.replace(/\bdikhaun\b/gi, "dikhaa-oon");
  res = res.replace(/\bsunau\b/gi, "sunaa-oon");
  res = res.replace(/\bpoochu\b/gi, "poo-choon");
  res = res.replace(/\bbhook\b/gi, "bhookh");
  res = res.replace(/\bANX\b/g, "A, N, X");
  res = res.replace(/\banx\b/gi, "A, N, X");

  return res;
}

/**
 * Determines whether a given SpeechSynthesisVoice supports native Hindi
 */
export function isHindiNativeVoice(voice?: SpeechSynthesisVoice | null): boolean {
  if (!voice) return false;
  const lang = (voice.lang || "").toLowerCase();
  const name = (voice.name || "").toLowerCase();

  return (
    lang.startsWith("hi") ||
    name.includes("hindi") ||
    name.includes("हिन्दी") ||
    name.includes("swara") ||
    name.includes("lekha") ||
    name.includes("kalpana") ||
    name.includes("heera") ||
    name.includes("priya") ||
    name.includes("neel") ||
    name.includes("google हिन्दी") ||
    name.includes("google hi")
  );
}

/**
 * Final Speech Check Pipeline:
 * Validates grammar, fixes pronunciation-sensitive words, and optimizes script for the voice engine.
 */
export function prepareSpokenUtterance(
  text: string,
  hindiSpokenHint?: string,
  voice?: SpeechSynthesisVoice | null
): { spokenText: string; lang: string } {
  if (!text || !text.trim()) {
    return { spokenText: "", lang: "en-IN" };
  }

  const isHindiVoice = isHindiNativeVoice(voice);

  // If Hindi voice is present, convert into Devanagari Hindi or use provided hint
  if (isHindiVoice) {
    if (hindiSpokenHint && hindiSpokenHint.trim()) {
      return {
        spokenText: hindiSpokenHint.trim(),
        lang: "hi-IN"
      };
    }

    const devanagari = transliterateHinglishToDevanagari(text);
    return {
      spokenText: devanagari,
      lang: "hi-IN"
    };
  }

  // If English voice (fallback when Hindi voice is not installed on system)
  // Check if text is Devanagari: if so, keep it clean or convert
  if (containsDevanagari(text)) {
    return {
      spokenText: text,
      lang: voice?.lang || "hi-IN"
    };
  }

  const phonetic = formatPhoneticRoman(text);
  return {
    spokenText: phonetic,
    lang: voice?.lang || "en-IN"
  };
}
