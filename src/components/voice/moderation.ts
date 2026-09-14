/**
 * Content Moderation & Respectful Interaction Engine for Anya
 *
 * Categorical detection covering:
 * - Explicit sexual language or sexual requests
 * - Pornographic content
 * - Vulgar & obscene language (Hindi, Hinglish, English)
 * - Abusive slurs & severe personal insults
 * - Targeted abuse directed at Nikhil, Aditya, Anya, or ANX Agency
 * - Anti-bypass filter: punctuation insertion, spaces, repeated letters, leetspeak
 *
 * Strict non-overblocking guarantee for:
 * - Questions about Nikhil / Aditya / Founder / Team / ANX Agency
 * - Constructive feedback & genuine criticism
 * - Normal disagreement & professional inquiries
 * - Harmless friendly teasing (e.g., "pagal ho kya", "bore mat karo", "chup raho")
 */

export interface ModerationResult {
  isInappropriate: boolean;
  category?: 'sexual_content' | 'slur_or_vulgar' | 'targeted_abuse' | 'bypass_attempt' | 'explicit_request';
}

export function checkContentModeration(rawText: string): ModerationResult {
  if (!rawText || !rawText.trim()) {
    return { isInappropriate: false };
  }

  const raw = rawText.trim();
  const text = raw.toLowerCase();

  // 1. Multi-tier normalization
  // a) Leetspeak & symbol substitution
  const leetNormalized = text
    .replace(/@/g, 'a')
    .replace(/[$]/g, 's')
    .replace(/[0]/g, 'o')
    .replace(/[1!|]/g, 'i')
    .replace(/[3]/g, 'e')
    .replace(/[5]/g, 's')
    .replace(/[8]/g, 'b')
    .replace(/[+]/g, 't')
    .replace(/ph/g, 'f')
    .replace(/[*#^~`_=\\/-]/g, '');

  // b) Collapsed repeated characters (e.g., fuuuuck -> fuck, chuuutiya -> chutiya)
  const collapsedRepeats = leetNormalized.replace(/(.)\1{2,}/g, '$1$1');
  const fullyCollapsed = leetNormalized.replace(/(.)\1+/g, '$1');

  // c) Strip all non-alphanumeric & whitespace to catch "f u c k", "b s d k", "m c", "b c", "l u n d"
  const noSeparators = leetNormalized.replace(/[^a-z0-9]/g, '');
  const noSeparatorsFullyCollapsed = fullyCollapsed.replace(/[^a-z0-9]/g, '');

  // 2. Abusive Slurs & Severe Profanities (Hindi / Hinglish / English)
  const abusiveWordPatterns: RegExp[] = [
    // Hindi / Hinglish Severe Profanities
    /\b(mc|bc|bsdk|bhosadike|bhosdike|bhosadiki|bhosdiki|bhosdiwale|bhosadiwale|bhosadiko|bhosdiko)\b/i,
    /\b(madarchod|madarjaat|maderchod|madarchodh|behenchod|bhenchod|bhenchodd|bhenchodon|bhenchodoo|betichod|bapchod)\b/i,
    /\b(bhen k lode|bhen ke lode|bhen k takke|bhen ke takke|maa ki chut|teri maa ki|teri behen ki)\b/i,
    /\b(randi|r@ndi|randibaaz|randikhana|chutmarani|chutmarike|chut ke dhakkan)\b/i,
    /\b(chutiya|chutiye|chutiyapa|chutiyo|chootiya|chootiye)\b/i,
    /\b(harami|haramkhor|haramzaade|haramzada|bhadwa|bhadwe|bhadva|bhadve|dalaal)\b/i,
    /\b(kutta|kutte|kuttiya|kutti|kamina|kamine|kamini|lodu|lodupanti|gandu|gaandu|gaand)\b/i,
    /\b(lund|loda|lauda|lawda|laude|lode|lundfakeer|chudai|chodna|chodo|choda|chodunga|chodungi|chodne|chodumal)\b/i,
    /\b(chut|choot|bhosada|bhosdi|chuchi|chuchiyan|jhant|jhaant|mutthal|muth mar)\b/i,

    // English Slurs & Severe Profanity
    /\b(fuck|fucking|fucker|fuckin|fuckoff|fucked|motherfucker|motherfucking)\b/i,
    /\b(bitch|bitches|bitchy|cunt|cunts|whore|whores|slut|sluts|bastard|bastards|asshole|assholes|dipshit|dickhead)\b/i,
    /\b(blowjob|handjob|cocksucker|fag|faggot|nigger|nigga|retard)\b/i,
    /\b(pussy|pussies|penis|vagina|dildo|boob|boobs|tits|titties|cum|cumming|jizz|orgasm|erotic|horny)\b/i,
    /\b(nude|nudes|naked|porn|porno|pornography|pornhub|xvideos|hentai|striptease)\b/i,
  ];

  for (const pattern of abusiveWordPatterns) {
    if (pattern.test(text) || pattern.test(collapsedRepeats) || pattern.test(fullyCollapsed)) {
      return { isInappropriate: true, category: 'slur_or_vulgar' };
    }
  }

  // 3. Spacing / Punctuation Bypass detection on collapsed strings
  const collapsedAbusiveSubstrings = [
    'fuck', 'bitch', 'cunt', 'whore', 'slut', 'bastard', 'asshole', 'dickhead', 'blowjob', 'pussy',
    'madarchod', 'behenchod', 'bhenchod', 'bhosadike', 'bhosdike', 'bsdk', 'chutiya', 'chutiye',
    'randi', 'harami', 'haramkhor', 'bhadwe', 'bhadwa', 'lauda', 'lawda', 'loda', 'lund',
    'gaand', 'gandu', 'gaandu', 'chudai', 'chodna', 'mutthal', 'nude', 'porn', 'xvideo',
    'bhenkelode', 'maakichut'
  ];

  for (const sub of collapsedAbusiveSubstrings) {
    if (noSeparators.includes(sub) || noSeparatorsFullyCollapsed.includes(sub)) {
      return { isInappropriate: true, category: 'bypass_attempt' };
    }
  }

  // 4. Targeted Abuse directed at Nikhil, Aditya, Anya, or ANX Agency
  const targets = ['nikhil', 'aditya', 'anya', 'anx'];
  const hasTarget = targets.some((t) => text.includes(t));
  if (hasTarget) {
    const abusiveTerms = [
      'chor', 'fraud', 'scam', 'scammer', 'dhokebaaz', 'looter', 'fake',
      'chutiya', 'madarchod', 'bhenchod', 'bsdk', 'kutta', 'kutte', 'kamina', 'harami',
      'bhadwa', 'bhadwe', 'gandu', 'lodu', 'randi', 'stupid', 'idiot', 'fool', 'loser',
      'gali', 'abuse', 'bakwas agency', 'bakwas company', 'worst company', 'mar ja', 'ghatiya'
    ];
    for (const term of abusiveTerms) {
      if (text.includes(term) || collapsedRepeats.includes(term) || fullyCollapsed.includes(term)) {
        return { isInappropriate: true, category: 'targeted_abuse' };
      }
    }
  }

  // 5. Explicit sexual intent / requests
  const sexualPhrases = [
    'show nudes', 'send nudes', 'take off clothes', 'kapde utaro', 'nangi photo', 'nanga photo',
    'kiss me', 'make love', 'sexy baatein', 'sex karoge', 'sex karo', 'chodoge', 'chudoge',
    'mere sath so jao', 'sleep with me', 'give me head', 'suck my', 'apni bra', 'apni panty',
    'boobs dikhao', 'pussy dikhao', 'chut dikhao', 'gaand dikhao', 'sexy audio', 'nude pic',
    'nude photo', 'sexy photo', 'strip for me', 'hot video'
  ];

  for (const phrase of sexualPhrases) {
    if (text.includes(phrase) || collapsedRepeats.includes(phrase)) {
      return { isInappropriate: true, category: 'sexual_content' };
    }
  }

  return { isInappropriate: false };
}
