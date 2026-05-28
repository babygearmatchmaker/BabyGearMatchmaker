import { useState } from "react";

const COLORS = {
  bg: "#FFF9F5", card: "#FFFFFF", accent: "#FF6B6B", accent2: "#FFB347",
  text: "#1A1A2E", muted: "#8E8E9A", soft: "#FFF0E8", border: "#FFE4D0",
  blue: "#2255CC", blueSoft: "#F0F7FF", blueBorder: "#C7DEFF",
};

const sectionColors = {
  lifestyle: "#FF6B6B", stroller: "#9B59B6", carseat: "#2255CC",
  sleep: "#2AAF74", feeding: "#E67E22", soother: "#00897B", carrying: "#E91E8C",
};

const sections = [
  { id: "lifestyle", label: "👋 Your Life" },
  { id: "stroller", label: "🚼 Stroller" },
  { id: "carseat", label: "🚗 Car Seat" },
  { id: "sleep", label: "😴 Sleep" },
  { id: "feeding", label: "🍼 Feeding" },
  { id: "soother", label: "🎠 Soother" },
  { id: "carrying", label: "🤱 Carrier" },
];

const QUESTIONS = [
  { id: "lifestyle", section: "lifestyle", q: "What best describes your lifestyle?", opts: [
    { v: "urban", l: "🏙️ City dweller", d: "Walking, transit, tight spaces" },
    { v: "suburban", l: "🏡 Suburban family", d: "Car-dependent, yard access" },
    { v: "outdoorsy", l: "🌲 Outdoor adventurer", d: "Hiking, trails, active" },
    { v: "minimalist", l: "✨ Minimalist", d: "Quality over quantity" },
  ]},
  { id: "budget", section: "lifestyle", q: "What's your total baby gear budget?", opts: [
    { v: "budget", l: "💚 Under $1,000", d: "Smart & selective" },
    { v: "mid", l: "💛 $1,000–$3,000", d: "Mid-range comfort" },
    { v: "premium", l: "🧡 $3,000–$6,000", d: "Premium picks" },
    { v: "luxury", l: "💜 No limit", d: "Best of the best" },
  ]},
  { id: "home", section: "lifestyle", q: "What's your living situation?", opts: [
    { v: "small_apt", l: "🏢 Small apartment", d: "Limited storage, no garage" },
    { v: "large_apt", l: "🏬 Large apartment", d: "Good space, elevator" },
    { v: "townhouse", l: "🏘️ Townhouse", d: "Stairs, moderate storage" },
    { v: "house", l: "🏠 House with garage", d: "Plenty of room" },
  ]},
  { id: "babies", section: "lifestyle", q: "How many children are you shopping for?", opts: [
    { v: "first", l: "👶 First baby", d: "Starting from scratch" },
    { v: "second", l: "👶👶 Second child", d: "Upgrading some gear" },
    { v: "twins", l: "👯 Twins", d: "Need twin-specific gear" },
    { v: "irish_twins", l: "👶🏃 Kids close in age", d: "Under 2 years apart" },
  ]},
  { id: "stroller_priority", section: "stroller", q: "What matters most in a stroller?", opts: [
    { v: "lightweight", l: "🪶 Lightweight & foldable", d: "Easy to carry and store" },
    { v: "smooth", l: "🛤️ Smooth ride", d: "All-terrain suspension" },
    { v: "versatile", l: "🔄 Versatility", d: "Newborn to toddler" },
    { v: "style", l: "💅 Style", d: "Looks matter too" },
  ]},
  { id: "stroller_terrain", section: "stroller", q: "Where will you use the stroller most?", opts: [
    { v: "city", l: "🏙️ City streets & transit", d: "Curbs, buses, elevators" },
    { v: "suburbs", l: "🛣️ Sidewalks & malls", d: "Smooth surfaces mostly" },
    { v: "trails", l: "🌿 Trails & uneven paths", d: "Gravel, grass, dirt" },
    { v: "mixed", l: "🔀 A mix of everything", d: "Needs to handle it all" },
  ]},
  { id: "stroller_extras", section: "stroller", q: "Any stroller must-haves?", opts: [
    { v: "travel_system", l: "🚗 Travel system", d: "Clicks with infant car seat" },
    { v: "sibling", l: "👫 Sibling seat option", d: "Can add a second seat later" },
    { v: "compact", l: "📦 Ultra-compact fold", d: "Fits in tiny trunk or overhead bin" },
    { v: "none", l: "🤷 No strong preference", d: "Show me the best overall" },
  ]},
  { id: "baby_age", section: "carseat", q: "How old is your baby?", opts: [
    { v: "newborn", l: "🍼 Newborn / not yet born", d: "Need infant seat now" },
    { v: "infant", l: "👶 Under 12 months", d: "Still in infant stage" },
    { v: "toddler", l: "🧒 1–3 years", d: "Ready for convertible" },
    { v: "skip_infant", l: "⏩ Skipping infant seat", d: "Going straight to convertible" },
  ]},
  { id: "car_size", section: "carseat", q: "What type of car do you drive?", opts: [
    { v: "compact", l: "🚗 Compact / sedan", d: "Honda Civic, Toyota Corolla" },
    { v: "midsize", l: "🚙 Midsize SUV", d: "RAV4, CR-V, Tiguan" },
    { v: "large_suv", l: "🚐 Large SUV / minivan", d: "Highlander, Pilot, Sienna" },
    { v: "truck", l: "🛻 Truck or two-door", d: "Limited back seat space" },
  ]},
  { id: "rotation", section: "carseat", q: "Do you want a rotating car seat?", opts: [
    { v: "yes_rotate", l: "🔄 Yes please!", d: "Easier to buckle baby in/out" },
    { v: "no_rotate", l: "➡️ Not necessary", d: "Standard install is fine" },
    { v: "unsure_rotate", l: "🤷 Not sure", d: "Tell me if it's worth it" },
  ]},
  { id: "seat_installs", section: "carseat", q: "How many cars need a car seat?", opts: [
    { v: "one", l: "1️⃣ Just one car", d: "One seat, one install" },
    { v: "two", l: "2️⃣ Two cars", d: "Need two seats" },
    { v: "grandparents", l: "👴👵 Grandparents' car too", d: "Need an affordable extra" },
    { v: "rideshare", l: "🚕 Rideshare / travel", d: "Needs to be portable" },
  ]},
  { id: "sleep_setup", section: "sleep", q: "Where will baby sleep?", opts: [
    { v: "own_room", l: "🚪 Own room from day one", d: "Separate nursery ready" },
    { v: "roomshare", l: "🛏️ Room-sharing", d: "In our room for 6+ months" },
    { v: "bedshare", l: "🤝 Co-sleeping", d: "Baby sleeps with us" },
    { v: "undecided", l: "🤷 Not decided yet", d: "Want flexible options" },
  ]},
  { id: "sleep_priority", section: "sleep", q: "What's your sleep gear priority?", opts: [
    { v: "save", l: "💸 Keep costs low", d: "Basic but safe" },
    { v: "tech", l: "📱 Smart features", d: "Monitoring, auto-rocking" },
    { v: "longevity", l: "📅 Long-term use", d: "Converts as baby grows" },
    { v: "portability", l: "✈️ Portability", d: "Travel-friendly setup" },
  ]},
  { id: "feeding_plan", section: "feeding", q: "How do you plan to feed baby?", opts: [
    { v: "breastfeed", l: "🤱 Breastfeeding", d: "Primarily nursing" },
    { v: "pump", l: "🍼 Pumping & bottle", d: "Expressed milk in bottles" },
    { v: "formula", l: "🥛 Formula feeding", d: "Bottles from the start" },
    { v: "combo", l: "🔀 Combination", d: "Mix of nursing and bottle" },
  ]},
  { id: "highchair_style", section: "feeding", q: "What matters most in a high chair?", opts: [
    { v: "space", l: "📦 Small footprint", d: "Limited kitchen space" },
    { v: "easy_clean", l: "🧹 Easy to clean", d: "Minimal crevices, wipeable" },
    { v: "grows", l: "📈 Grows with child", d: "Toddler & beyond" },
    { v: "looks", l: "🎨 Aesthetics", d: "Matches my home decor" },
  ]},
  { id: "solid_foods", section: "feeding", q: "How do you plan to introduce solids?", opts: [
    { v: "blw", l: "🥕 Baby-led weaning", d: "Finger foods from the start" },
    { v: "purees", l: "🥣 Purees & spoon feeding", d: "Traditional approach" },
    { v: "combo_solids", l: "🔀 Combo approach", d: "Mix of both" },
    { v: "unsure_solids", l: "🤷 Not sure yet", d: "Show me both options" },
  ]},
  { id: "soother_type", section: "soother", q: "Swing or bouncer — which sounds more like you?", opts: [
    { v: "swing", l: "🎠 Swing", d: "Back-and-forth or side-to-side motion" },
    { v: "bouncer", l: "🪑 Bouncer", d: "Gentle vibration, parent-activated bounce" },
    { v: "both_options", l: "🤷 Show me both", d: "Not sure, help me decide" },
    { v: "skip_soother", l: "🚫 Skip this", d: "I already have one or won't use one" },
  ]},
  { id: "soother_space", section: "soother", q: "How much space can your soother take up?", opts: [
    { v: "tiny", l: "📦 As small as possible", d: "Every inch counts" },
    { v: "moderate", l: "🏠 Moderate is fine", d: "I have some room" },
    { v: "no_limit", l: "🛋️ Size doesn't matter", d: "I just want what works best" },
  ]},
  { id: "carry_style", section: "carrying", q: "How often will you wear baby?", opts: [
    { v: "daily", l: "🌅 Every day", d: "Main mode of transport" },
    { v: "occasional", l: "🕐 Occasionally", d: "Fussy times and errands" },
    { v: "active", l: "🏃 Active / hiking", d: "Need structured support" },
    { v: "unsure_carry", l: "🤷 Not sure yet", d: "Convince me" },
  ]},
  { id: "carry_preference", section: "carrying", q: "Any carrier preference?", opts: [
    { v: "wrap", l: "🧣 Soft wrap", d: "Very snug, steep learning curve" },
    { v: "structured", l: "🎒 Structured carrier", d: "Buckles, easy on/off" },
    { v: "ring_sling", l: "💍 Ring sling", d: "Minimal, one-shoulder" },
    { v: "no_pref", l: "🤷 No preference", d: "Recommend what's best" },
  ]},
];

// Loading messages shown while Claude searches
const LOADING_MESSAGES = [
  "🔍 Searching BabyGearLab for top picks...",
  "📖 Reading parent reviews on Reddit...",
  "💰 Checking current prices...",
  "🏆 Comparing specs across brands...",
  "🛡️ Verifying safety ratings...",
  "✨ Building your personalized match...",
];

function Chip({ label, color }) {
  return <span style={{ fontSize: 11, padding: "3px 9px", borderRadius: 99, background: `${color}18`, color, fontWeight: 700 }}>{label}</span>;
}

function ResultSection({ title, color, items }) {
  if (!items || items.length === 0) return null;
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, color, marginBottom: 10, paddingBottom: 6, borderBottom: `2px solid ${color}33` }}>{title}</div>
      {items.map((item, i) => (
        <div key={i} style={{ borderLeft: `3px solid ${color}`, paddingLeft: 12, marginBottom: 14 }}>
          {item.label && <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>{item.label}</div>}
          <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, marginTop: 2 }}>{item.name}</div>
          {item.price && <div style={{ fontSize: 12, color: color, fontWeight: 700, marginTop: 1 }}>{item.price}</div>}
          <div style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.6, marginTop: 3 }}>{item.why}</div>
          {item.url && item.url !== "#" && (
            <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: 6, fontSize: 12, fontWeight: 700, color, border: `1.5px solid ${color}`, borderRadius: 8, padding: "4px 10px", textDecoration: "none", background: `${color}0d` }}>
              View Product →
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("intro"); // intro | quiz | loading | results | error
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState(null);
  const [loadingMsg, setLoadingMsg] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  const currentQ = QUESTIONS[qIndex];
  const totalQ = QUESTIONS.length;
  const progress = (qIndex / totalQ) * 100;
  const sectionColor = sectionColors[currentQ?.section] || COLORS.accent;

  const sectionLabel = (() => {
    if (!currentQ) return "";
    const sec = sections.find(s => s.id === currentQ.section);
    const sqs = QUESTIONS.filter(q => q.section === currentQ.section);
    const idx = sqs.findIndex(q => q.id === currentQ.id) + 1;
    return `${sec?.label} · ${idx} of ${sqs.length}`;
  })();

  function handleStart() {
    setScreen("quiz"); setQIndex(0); setAnswers({}); setSelected(null);
  }

  async function handleNext() {
    if (!selected) return;
    const newAnswers = { ...answers, [currentQ.id]: selected };
    setAnswers(newAnswers);
    setSelected(null);

    if (qIndex + 1 < totalQ) {
      setQIndex(qIndex + 1);
      return;
    }

    // Last question — call the backend
    setScreen("loading");
    setLoadingMsg(0);

    // Cycle through loading messages
    const interval = setInterval(() => {
      setLoadingMsg(m => (m + 1) % LOADING_MESSAGES.length);
    }, 2500);

    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: newAnswers }),
      });
      const data = await res.json();
      clearInterval(interval);

      if (!res.ok || data.error) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setScreen("error");
        return;
      }

      setResults(data.recommendations);
      setScreen("results");
    } catch (err) {
      clearInterval(interval);
      setErrorMsg(err.message);
      setScreen("error");
    }
  }

  function handleRestart() {
    setScreen("intro"); setQIndex(0); setAnswers({});
    setSelected(null); setResults(null); setErrorMsg("");
  }

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, fontFamily: "'Lato', sans-serif", display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 16px 48px" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Lato:wght@400;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 26 }}>👶</div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 900, color: COLORS.text }}>
          Baby<span style={{ color: COLORS.accent }}>Gear</span>Matchmaker
        </div>
        <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 3, letterSpacing: 1, textTransform: "uppercase" }}>AI-powered · Always current</div>
      </div>

      {/* Progress bar */}
      {screen === "quiz" && (
        <div style={{ width: "100%", maxWidth: 500, marginBottom: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
            <span style={{ color: sectionColor, fontWeight: 700 }}>{sectionLabel}</span>
            <span style={{ color: COLORS.muted }}>{qIndex + 1} / {totalQ}</span>
          </div>
          <div style={{ height: 6, background: COLORS.border, borderRadius: 99, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg, ${sectionColor}, ${COLORS.accent2})`, borderRadius: 99, transition: "width 0.3s" }} />
          </div>
          <div style={{ display: "flex", gap: 5, marginTop: 10, flexWrap: "wrap" }}>
            {sections.map(s => {
              const sqs = QUESTIONS.filter(q => q.section === s.id);
              const firstI = QUESTIONS.findIndex(q => q.section === s.id);
              const done = qIndex >= firstI + sqs.length;
              const active = currentQ?.section === s.id;
              return <Chip key={s.id} label={s.label} color={done ? sectionColors[s.id] : active ? sectionColors[s.id] : "#aaa"} />;
            })}
          </div>
        </div>
      )}

      <div style={{ background: COLORS.card, borderRadius: 20, border: `1.5px solid ${COLORS.border}`, padding: "32px 28px", maxWidth: 500, width: "100%", boxShadow: "0 8px 40px rgba(255,107,107,0.08)" }}>

        {/* INTRO */}
        {screen === "intro" && (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 14 }}>🎯</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: COLORS.text, lineHeight: 1.25, marginBottom: 12 }}>
              Find your perfect baby gear match
            </div>
            <div style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.7, marginBottom: 10 }}>
              Answer {totalQ} questions and get a live AI-powered gear list — searched across the web in real time for your exact profile.
            </div>
            <div style={{ fontSize: 12, background: COLORS.blueSoft, border: `1px solid ${COLORS.blueBorder}`, borderRadius: 10, padding: "10px 14px", color: COLORS.blue, marginBottom: 18, lineHeight: 1.6 }}>
              🔍 Powered by live web search — current prices, real reviews, up-to-date picks
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, justifyContent: "center", marginBottom: 24 }}>
              {sections.map(s => <Chip key={s.id} label={s.label} color={sectionColors[s.id]} />)}
            </div>
            <button onClick={handleStart} style={{ background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accent2})`, color: "#fff", border: "none", borderRadius: 12, padding: "14px 36px", fontSize: 16, fontWeight: 700, cursor: "pointer", width: "100%", boxShadow: "0 4px 20px rgba(255,107,107,0.25)" }}>
              Start My Match →
            </button>
          </div>
        )}

        {/* QUIZ */}
        {screen === "quiz" && (
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, fontWeight: 700, color: COLORS.text, marginBottom: 18, lineHeight: 1.35 }}>
              {currentQ.q}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 }}>
              {currentQ.opts.map(opt => (
                <div key={opt.v} onClick={() => setSelected(opt.v)} style={{ border: `2px solid ${selected === opt.v ? sectionColor : COLORS.border}`, borderRadius: 12, padding: "11px 15px", cursor: "pointer", background: selected === opt.v ? `${sectionColor}12` : "#fff", transition: "all 0.15s" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text }}>{opt.l}</div>
                  <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 2 }}>{opt.d}</div>
                </div>
              ))}
            </div>
            <button onClick={handleNext} disabled={!selected} style={{ background: selected ? `linear-gradient(135deg, ${sectionColor}, ${COLORS.accent2})` : COLORS.border, color: selected ? "#fff" : COLORS.muted, border: "none", borderRadius: 12, padding: "13px", fontSize: 15, fontWeight: 700, cursor: selected ? "pointer" : "not-allowed", width: "100%", transition: "all 0.2s" }}>
              {qIndex + 1 === totalQ ? "Search & Match Me ✨" : "Next →"}
            </button>
          </div>
        )}

        {/* LOADING */}
        {screen === "loading" && (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 44, marginBottom: 16, display: "inline-block", animation: "spin 3s linear infinite" }}>🔍</div>
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 900, color: COLORS.text, marginBottom: 10 }}>
              Searching the web for you...
            </div>
            <div style={{ fontSize: 14, color: COLORS.muted, marginBottom: 24, minHeight: 24, transition: "all 0.5s" }}>
              {LOADING_MESSAGES[loadingMsg]}
            </div>
            <div style={{ fontSize: 12, color: COLORS.muted, background: COLORS.soft, borderRadius: 10, padding: "10px 14px", lineHeight: 1.7 }}>
              This takes 15–30 seconds while Claude searches<br />BabyGearLab, Reddit, brand sites & more
            </div>
          </div>
        )}

        {/* ERROR */}
        {screen === "error" && (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 14 }}>😬</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: COLORS.text, marginBottom: 10 }}>Something went wrong</div>
            <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 20, lineHeight: 1.6 }}>{errorMsg}</div>
            <button onClick={handleRestart} style={{ background: COLORS.accent, color: "#fff", border: "none", borderRadius: 12, padding: "12px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer", width: "100%" }}>
              Try Again
            </button>
          </div>
        )}

        {/* RESULTS */}
        {screen === "results" && results && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 22 }}>
              <div style={{ fontSize: 36 }}>🎉</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 900, color: COLORS.text, marginTop: 8 }}>Your Gear Match is Ready!</div>
              <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 4 }}>Based on live web research · {new Date().toLocaleDateString()}</div>
            </div>

            <ResultSection title="🚼 Stroller" color="#9B59B6" items={results.stroller ? [{ label: "Top Pick", ...results.stroller }] : []} />
            <ResultSection title="🚗 Car Seat" color={COLORS.blue} items={results.carseats} />
            <ResultSection title="😴 Sleep" color="#2AAF74" items={results.sleep} />
            <ResultSection title="🍼 Feeding" color="#E67E22" items={results.feeding} />
            <ResultSection title="🎠 Soother" color="#00897B" items={results.soothers} />
            <ResultSection title="🤱 Carrier" color="#E91E8C" items={results.carriers} />

            {results.skips?.length > 0 && (
              <div style={{ marginBottom: 22 }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, color: COLORS.accent, marginBottom: 10, paddingBottom: 6, borderBottom: `2px solid ${COLORS.accent}33` }}>❌ Skip These</div>
                {results.skips.map((s, i) => (
                  <div key={i} style={{ borderLeft: "3px solid #ddd", paddingLeft: 12, marginBottom: 10, fontSize: 13, color: COLORS.text, lineHeight: 1.6 }}>{s}</div>
                ))}
              </div>
            )}

            {results.secret && (
              <div style={{ background: COLORS.blueSoft, border: `1.5px solid ${COLORS.blueBorder}`, borderRadius: 12, padding: "16px", marginBottom: 24 }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 700, color: COLORS.blue, marginBottom: 6 }}>🔑 Your Secret Weapon</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text }}>{results.secret.name}</div>
                {results.secret.price && <div style={{ fontSize: 12, color: COLORS.blue, fontWeight: 700, marginTop: 1 }}>{results.secret.price}</div>}
                <div style={{ fontSize: 13, color: COLORS.muted, marginTop: 4, lineHeight: 1.6 }}>{results.secret.why}</div>
                {results.secret.url && results.secret.url !== "#" && (
                  <a href={results.secret.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: 8, fontSize: 12, fontWeight: 700, color: COLORS.blue, border: `1.5px solid ${COLORS.blue}`, borderRadius: 8, padding: "4px 10px", textDecoration: "none", background: `${COLORS.blue}0d` }}>
                    View Product →
                  </a>
                )}
              </div>
            )}

            <button onClick={handleRestart} style={{ background: "transparent", color: COLORS.accent, border: `2px solid ${COLORS.accent}`, borderRadius: 12, padding: "12px", fontSize: 14, fontWeight: 700, cursor: "pointer", width: "100%" }}>
              ↩ Start Over
            </button>
          </div>
        )}
      </div>

      <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 18, textAlign: "center" }}>
        Powered by BabyGearMatchmaker AI · Results searched live
      </div>
    </div>
  );
}
