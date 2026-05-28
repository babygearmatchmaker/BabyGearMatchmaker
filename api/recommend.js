
// api/recommend.js
// Vercel serverless function — proxies quiz answers to Claude with web search
// Deploy this to Vercel. Set ANTHROPIC_API_KEY in your Vercel environment variables.

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { answers } = req.body;
  if (!answers) {
    return res.status(400).json({ error: "Missing answers" });
  }

  // Build a rich prompt from quiz answers
  const prompt = buildPrompt(answers);

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "anthropic-version": "2023-06-01",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4000,
        tools: [
          {
            type: "web_search_20250305",
            name: "web_search",
          },
        ],
        system: `You are BabyGearMatchmaker, an expert baby gear advisor with access to real-time web search.
        
Your job is to search the web for the best, most current baby gear recommendations based on a parent's profile. 

IMPORTANT RULES:
- Always search before recommending — never rely on memory alone for products or prices
- Search sites like babygearlab.com, thewirecutter.com, reddit.com/r/beyondthebump, reddit.com/r/BabyBumps, and brand sites
- Include current prices when found
- Flag if a product has been recently discontinued or recalled
- Compare at least 2-3 options per category before picking a winner
- Be specific about WHY a product suits THIS parent's profile

Return your response as a JSON object with this exact structure:
{
  "stroller": { "name": "...", "price": "...", "why": "...", "url": "..." },
  "carseats": [{ "label": "...", "name": "...", "price": "...", "why": "...", "url": "..." }],
  "sleep": [{ "label": "...", "name": "...", "price": "...", "why": "...", "url": "..." }],
  "feeding": [{ "label": "...", "name": "...", "price": "...", "why": "...", "url": "..." }],
  "soothers": [{ "label": "...", "name": "...", "price": "...", "why": "...", "url": "..." }],
  "carriers": [{ "label": "...", "name": "...", "price": "...", "why": "...", "url": "..." }],
  "skips": ["...", "...", "..."],
  "secret": { "name": "...", "price": "...", "why": "...", "url": "..." }
}

Only return the JSON object. No preamble, no markdown, no code fences.`,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Anthropic error:", data);
      return res.status(500).json({ error: "Anthropic API error", details: data });
    }

    // Extract the final text block (after any tool use)
    const textBlock = data.content?.filter(b => b.type === "text").pop();
    if (!textBlock?.text) {
      return res.status(500).json({ error: "No text response from Claude" });
    }

    // Parse JSON from Claude's response
    let recommendations;
    try {
      const clean = textBlock.text.replace(/```json|```/g, "").trim();
      recommendations = JSON.parse(clean);
    } catch (e) {
      console.error("JSON parse error:", e, textBlock.text);
      return res.status(500).json({ error: "Failed to parse recommendations", raw: textBlock.text });
    }

    return res.status(200).json({ recommendations });
  } catch (err) {
    console.error("Handler error:", err);
    return res.status(500).json({ error: err.message });
  }
}

function buildPrompt(a) {
  return `Search the web and find the best current baby gear recommendations for this parent:

PARENT PROFILE:
- Lifestyle: ${a.lifestyle} (${lifestyleDesc(a.lifestyle)})
- Budget: ${a.budget} (${budgetDesc(a.budget)})
- Home: ${a.home} (${homeDesc(a.home)})
- Children: ${a.babies}
- Stroller priority: ${a.stroller_priority}
- Stroller terrain: ${a.stroller_terrain}
- Stroller extras: ${a.stroller_extras}
- Baby age: ${a.baby_age}
- Car type: ${a.car_size}
- Wants rotating car seat: ${a.rotation}
- Number of car installs: ${a.seat_installs}
- Sleep setup: ${a.sleep_setup}
- Sleep priority: ${a.sleep_priority}
- Feeding plan: ${a.feeding_plan}
- High chair priority: ${a.highchair_style}
- Solids approach: ${a.solid_foods}
- Soother preference: ${a.soother_type}
- Space for soother: ${a.soother_space}
- Carrier frequency: ${a.carry_style}
- Carrier preference: ${a.carry_preference}

Please search for current best picks in each category, check prices, and return the JSON.`;
}

function lifestyleDesc(v) {
  return { urban: "city walking/transit", suburban: "car-dependent", outdoorsy: "hiking/trails", minimalist: "quality over quantity" }[v] || v;
}
function budgetDesc(v) {
  return { budget: "under $1,000 total", mid: "$1,000-$3,000", premium: "$3,000-$6,000", luxury: "no limit" }[v] || v;
}
function homeDesc(v) {
  return { small_apt: "small apartment, limited storage", large_apt: "large apartment", townhouse: "townhouse with stairs", house: "house with garage" }[v] || v;
}
