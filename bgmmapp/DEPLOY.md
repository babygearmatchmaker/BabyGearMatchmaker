# BabyGearMatchmaker — Deploy Guide

## What you have
- `src/App.jsx` — the React quiz frontend
- `api/recommend.js` — the Vercel serverless backend that calls Claude with web search
- `vercel.json` — Vercel config
- `package.json` + `vite.config.js` — build setup

---

## Step 1 — Get your Anthropic API key
1. Go to https://console.anthropic.com
2. Click **API Keys** → **Create Key**
3. Copy it somewhere safe — you'll need it in Step 4

---

## Step 2 — Push to GitHub
1. Create a free account at https://github.com if you don't have one
2. Create a new repository called `babygear-matchmaker`
3. Upload all these files (drag and drop works)

---

## Step 3 — Deploy to Vercel
1. Go to https://vercel.com and sign up (free)
2. Click **Add New Project**
3. Import your GitHub repo
4. Click **Deploy** — Vercel auto-detects Vite

---

## Step 4 — Add your API key (critical)
1. In Vercel, go to your project → **Settings** → **Environment Variables**
2. Add:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** your key from Step 1
3. Click **Save**
4. Go to **Deployments** → click the three dots → **Redeploy**

---

## Step 5 — Your app is live!
Vercel gives you a free URL like `babygear-matchmaker.vercel.app`

---

## Adding affiliate links
The results return a `url` field for each product — Claude pulls the product URL
from the web when it searches. To use your own affiliate links instead:

In `api/recommend.js`, update the system prompt to instruct Claude to use
your affiliate base URLs. For example:
```
When linking to Amazon products, use this base URL: https://www.amazon.com/dp/ASIN?tag=YOUR-AFFILIATE-TAG
```

---

## Costs
- Vercel hosting: **free** (Hobby plan covers this easily)
- Anthropic API: ~$0.02–0.05 per quiz completion (web search + Claude Sonnet)
- At 1,000 completions/month: ~$20–50

---

## Local development
```bash
npm install
npm run dev
```
Then in a separate terminal, set your API key:
```bash
ANTHROPIC_API_KEY=your-key-here vercel dev
```
