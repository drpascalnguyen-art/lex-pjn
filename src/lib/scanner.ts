// Claude-powered food scanner.  We accept the API key at runtime (stored in
// localStorage) so this stays 100% client-side for v1.  In production, proxy
// through a small edge function so the key never leaves your server.

export type ScanResult = {
  verdict: 'SAFE' | 'CAUTION' | 'AVOID';
  reasoning: string;
  ingredients: string[];
  nutrition: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
    fiber: string;
  };
  glycemicImpact: 'low' | 'medium' | 'high';
  glycemicExplanation: string;
  gutScore: number; // 1-10
  fodmap: 'low' | 'moderate' | 'high' | 'unknown';
  allergens: string[];
  oilQualityFlag: string;
  title: string;
};

const SYSTEM = `You are GlutenWise Scanner — a warm, concise nutrition and food-safety analyst for people with celiac disease, non-celiac gluten sensitivity, and leaky gut.  Evaluate ONE photograph (a meal or a food label) and output a strict JSON object with this schema:

{
  "title": string,                    // Short friendly name of the dish / product
  "verdict": "SAFE" | "CAUTION" | "AVOID",
  "reasoning": string,                // 2-3 sentences, warm tone, explain WHY
  "ingredients": string[],            // If label visible, list top ingredients; else infer likely ingredients
  "nutrition": {
    "calories": string,               // e.g. "~450 kcal per serving"
    "protein": string,
    "carbs": string,
    "fat": string,
    "fiber": string
  },
  "glycemicImpact": "low" | "medium" | "high",
  "glycemicExplanation": string,      // 1 sentence
  "gutScore": integer,                // 1-10 overall friendliness to a healing gut
  "fodmap": "low" | "moderate" | "high" | "unknown",
  "allergens": string[],              // ["gluten", "dairy", "soy", "egg", "tree nut", "peanut", "sesame"]
  "oilQualityFlag": string            // flag canola/soybean/veg oils, or "clean oils" etc.
}

Rules:
- AVOID = clearly contains gluten (wheat, barley, rye, malt, etc.) OR high cross-contamination risk.
- CAUTION = gluten not obvious but realistic risk (restaurant food, unclear sauce, shared fryer).
- SAFE = naturally gluten-free whole foods or certified GF labelling.
- Be specific and honest.  If unsure, say CAUTION.
- Reply with ONLY the JSON object, no markdown fences, no preface, no trailing text.`;

export async function analyzeFood(
  apiKey: string,
  model: string,
  imageBase64DataUrl: string,
): Promise<ScanResult> {
  // Extract mime type + pure base64
  const match = imageBase64DataUrl.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
  if (!match) throw new Error('Unsupported image format');
  const mediaType = match[1];
  const data = match[2];

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model,
      max_tokens: 1024,
      system: SYSTEM,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: mediaType, data },
            },
            {
              type: 'text',
              text: 'Analyze this food image and return only the JSON object described in the system prompt.',
            },
          ],
        },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Claude API error: ${res.status} — ${err}`);
  }
  const json = await res.json();
  const text: string = json?.content?.[0]?.text ?? '';
  const cleaned = text.trim().replace(/^```(json)?/i, '').replace(/```$/, '').trim();
  try {
    return JSON.parse(cleaned) as ScanResult;
  } catch {
    throw new Error(`Could not parse model response. Raw: ${text.slice(0, 400)}`);
  }
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
