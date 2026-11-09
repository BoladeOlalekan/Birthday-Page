# 💌 Cinematic Birthday Greeting Website (Wollo / Outcrowd Inspired)

A production-quality, mobile-first interactive birthday greeting experience crafted with **React, TypeScript, Vite, Tailwind CSS, Framer Motion, Web Audio API, and EmailJS**.

Inspired by the **Wollo landing page by Outcrowd** motion & design language:
- White canvas with large rounded panels (28–44px radius)
- Periwinkle to electric violet primary tones with sunny yellow & hot pink accents
- Floating pill navbar and interactive cursor follower
- Grainy, textured flat-vector 3D props (glossy heart, donut rings, smiley sphere, orbit beads)
- 3D-styled vector envelope with animated flap and wax seal
- Two expressive animated characters (Olalekan & Oluwaseyi) with idle bobbing, typewriter dialogue, and hilarious Nigerian banter
- Theatrical velvet curtain sequence
- Dark cinema stage with auto-scrolling credits crawl and scrub controls
- Sheet-over-stage slide-up reply popup connecting directly to EmailJS (zero backend needed)
- Confetti celebration and automatic state reset

---

## 📁 File Structure

```text
AYOBAMI/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx                      # Floating pill navbar with sound toggle
│   │   └── illustrations/
│   │       ├── Envelope3D.tsx              # Grainy 3D vector envelope with wax seal & paper
│   │       ├── Characters.tsx              # Olalekan & Oluwaseyi (idle, shocked, cheering, talking)
│   │       └── FloatingProps3D.tsx         # Glossy heart, smiley sphere, donut rings, stickers
│   ├── screens/
│   │   ├── LandingScreen.tsx               # Screen 1: Hero panel & envelope fly-in
│   │   ├── VerifyScreen.tsx                # Screen 2: Identity check & Nigerian humor
│   │   ├── PortalScreen.tsx                # Screen 3: Anime isekai portal light burst
│   │   ├── CharactersScreen.tsx            # Screen 4: Meet Olalekan & Oluwaseyi + Yes/No morph
│   │   ├── CurtainScreen.tsx               # Screen 5: Red velvet theatre curtains opening
│   │   ├── MessageScreen.tsx               # Screen 5b: Cinema stage & auto-scroll credits
│   │   ├── ReplyScreen.tsx                 # Screen 6: Sheet popup reply form to EmailJS
│   │   └── ThanksScreen.tsx                # Screen 7: Confetti burst & reset countdown
│   ├── utils/
│   │   └── audio.ts                        # Zero-dependency Web Audio synth & SFX
│   ├── App.tsx                             # Single-page state machine orchestrator
│   ├── config.ts                           # Full TypeScript config file
│   ├── index.css                           # Tailwind styles, grain filter, credits mask
│   ├── main.tsx                            # React root mount
│   └── vite-env.d.ts                       # Environment type definitions
├── config.js                               # Root quick-edit config file (for non-coders)
├── index.html                              # HTML entry with Sora & Plus Jakarta Sans fonts
├── package.json                            # Scripts & dependencies
├── postcss.config.js                       # PostCSS configuration
├── tailwind.config.js                      # Custom Wollo palette, radii, and keyframes
├── tsconfig.json                           # TypeScript compiler options
├── vercel.json                             # Vercel SPA routing
├── netlify.toml                            # Netlify SPA routing
└── .env.example                            # EmailJS environment variables sample
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally in Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## ⚙️ How to Customize (`config.js` / `src/config.ts`)

Everything you want to change for your friend is located inside `config.js` or `src/config.ts`:

```javascript
export const CONFIG = {
  // 1. Accepted answers (case-insensitive & trimmed)
  CORRECT_NAMES: ['ayobami', 'ayo', 'bami', 'ayobami mi', 'baby girl'],

  // 2. Friend display name
  FRIEND_DISPLAY_NAME: 'Ayobami',

  // 3. Creator's name
  CREATOR_NAME: 'Lekan',

  // 4. Rotating Nigerian wrong-answer feedback
  WRONG_ANSWER_LINES: [
    "Ah ah, that's not the name o! Try again 😄",
    "Ehn ehn? Which kind stranger be this? Check your spelling joor! 😂",
    // Add more lines here...
  ],

  // 5. Character dialogue
  CHARACTER_DIALOGUE: {
    boyName: 'Olalekan',
    girlName: 'Oluwaseyi',
    introGreeting: 'Heyyy {name}! 🎉 Welcome ooo!',
    introFollowUp: 'You ready to read this top-secret birthday message?',
    noReaction: "NO oooo! You no get choice but to read am after all the creator's stress! 😭💔",
    noButtonMorphText: 'Okay fine, let’s go! 😅',
    yesReaction: 'Get in jhor! 🔥 Oya open wide your eyes, here it comes!',
  },

  // 6. Birthday message paragraphs (scrolls upward in cinema credits)
  BIRTHDAY_MESSAGE: [
    'Dearest Ayobami,',
    'Happy Birthday to one of the most radiant souls walking this earth today!',
    // Add any number of heartfelt paragraphs...
  ],

  // 7. Credits auto-scroll speed (pixels per second)
  SCROLL_SPEED: 36,
};
```

---

## 📬 Step-by-Step EmailJS Setup

EmailJS delivers your friend's reply straight to your inbox without requiring a backend server:

1. **Sign up for free** at [https://www.emailjs.com/](https://www.emailjs.com/).
2. **Add an Email Service**:
   - Go to **Email Services** > **Add New Service**.
   - Choose **Gmail** (or Outlook/Yahoo) and click **Connect Account**.
   - Note down your `Service ID` (e.g., `service_abcd123`).
3. **Create an Email Template**:
   - Go to **Email Templates** > **Create New Template**.
   - Set the subject: `💌 Birthday Reply from {{from_name}}!`
   - Set the content to include these variables:
     ```text
     You received a birthday reaction from {{from_name}}:

     "{{message}}"

     Sent on: {{timestamp}}
     Website: {{to_name}}'s Birthday Experience
     ```
   - Save and note down your `Template ID` (e.g., `template_xyz987`).
4. **Get your Public Key**:
   - Go to **Account** > **API Keys**.
   - Copy your `Public Key` (e.g., `user_xxxxxx`).
5. **Add to `.env` file**:
   Create a `.env` file in the project root:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id_here
   VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
   VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
   ```
   *(Note: If you run the app before configuring keys, it will run in graceful simulation mode, recording the reply in console & localStorage so the experience never crashes for your friend!)*

---

## 🌐 Deployment Instructions

### Deploy to Vercel
1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Select your repository.
4. Under **Environment Variables**, add:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
5. Click **Deploy**. Vercel will build and give you a live production URL!

### Deploy to Netlify
1. Go to [Netlify](https://www.netlify.com/) and click **Add new site** > **Import an existing project**.
2. Select your repository.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Under **Site configuration** > **Environment variables**, add the three `VITE_EMAILJS_*` variables.
6. Click **Deploy Site**.

---

## 💡 Optional Upgrades Included

1. **Self-Contained Web Audio Synthesizer**: Generative ambient chord pads and responsive sound effects (land chime, pop, portal swoosh, celebration fanfare) with zero external audio assets that could 404 or fail CORS.
2. **Interactive Scrubber**: The user can pause, resume, drag the progress slider to scrub back and forth in the credits, or jump straight to the reply form.
3. **Smart Reset Cycle**: After the confetti celebration, a 4-second animated countdown smoothly returns to the landing screen with the envelope ready to fly in again.

