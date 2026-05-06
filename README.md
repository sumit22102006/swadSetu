# 🍱 swadSetu — Daily Meal Customization App

[🌐 Live Demo](https://swad-setu.vercel.app/dashboard) &nbsp;|&nbsp; [🎨 View Figma Design](https://www.figma.com/design/0G1vW5J1TUzcN5xOSTIuRK/Untitled?node-id=0-1&t=ty2KsFQN4h3CN5mP-1) &nbsp;|&nbsp; [📺 YouTube Video](https://youtu.be/HqLSkdpQawc?si=7YterkGSaIhaynlN) &nbsp;|&nbsp; [📖 Postman Docs](https://documenter.getpostman.com/view/54465064/2sBXqKofTg) &nbsp;|&nbsp; [⚙️ Backend API](https://swadsetu-4.onrender.com)

---

## 📸 App Preview

![swadSetu Dashboard Preview](./frontend/src/assets/preview.png.png)

---

A mobile-first web app that allows users to subscribe to local tiffin centers, customize meals daily, and manage everything from a single dashboard. Designed to feel warm, minimal, and practical — like a real indie product.

---

## 🚀 Problem

Tiffin services today are rigid and outdated:

- Fixed menus, no flexibility
- Hard to switch between providers
- No personalization (diet, health needs)
- Manual coordination (calls/WhatsApp)
- No tracking of meals, swaps, or history

---

## 💡 Solution

swadSetu gives users full control:

- Subscribe to multiple tiffin centers
- Customize meals daily
- Switch centers anytime
- Apply global dietary preferences
- Track meals, swaps, and usage

---

## 🎯 Core Features

**1. Home Dashboard**
- Greeting, delivery time, active center
- Stats: days active, swaps left, avg rating
- Bottom nav: Home, Centers, Meals, History, Profile

**2. Tiffin Center Selection**
- Browse centers with cuisine, tags, ratings, price
- Switch centers dynamically
- Plan-based limits (Basic: 1, Standard: 2, Premium: ∞)

**3. Daily Meal Customization**
- 7-day planner
- Meal builder: Base + Sabzi + Add-ons
- AI suggestions + swap tracking
- Actions: Skip / Confirm meal

**4. Preference Profile**
- Global toggles (Low oil, Veg, Less spicy, etc.)
- Applies across all centers
- Allergy notes support

**5. Subscription Plans**

| Plan | Price | Centers | Features |
|------|-------|---------|----------|
| Basic | ₹99/day | 1 | Fixed menu |
| Standard ⭐ | ₹139/day | 2 | Swaps included |
| Premium | ₹179/day | Unlimited | Full customization + AI |

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#F97316` | Saffron Orange — CTAs, highlights |
| Header | `#1C1917` | Dark Charcoal — nav, headings |
| Veg | `#1A6B3C` | Forest Green — veg indicators |
| Background | Warm off-white | Page background |

Clean sans-serif typography, no gradients, no clutter.

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React / Next.js + Tailwind CSS |
| Backend | Node.js + Express |
| Database | MongoDB / PostgreSQL |
| Auth | Firebase |
| Payments | Razorpay |
| Deployment | Vercel |

---

## 📁 Project Structure

```text
swadSetu/
├── frontend/
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── assets/       # Images, icons, and fonts
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Application routes/pages
│   │   ├── App.jsx       # Main application entry
│   │   └── index.css     # Tailwind v4 & global styles
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## 🔄 User Flow

```
Signup → Choose Plan → Select Centers → Set Preferences → Customize Meals → Track Usage
```

---

## 🛠️ Setup

1. Clone the repository:
```bash
   git clone https://github.com/sumit22102006/swadSetu.git
```

2. Navigate to the frontend directory:
```bash
   cd swadSetu/frontend
```

3. Install dependencies and start:
```bash
   npm install
   npm run dev
```

---

## 🧠 Challenges

- Scaling daily customization at vendor level
- Managing multi-center subscriptions cleanly
- Keeping the UI simple despite complex logic
- Syncing preferences across different vendors

---

## 📈 Future Scope

- 🤖 AI meal recommendations
- 🥗 Nutrition tracking
- 🏪 Vendor dashboard
- 🚴 Delivery tracking
- ⭐ Ratings & reviews

---

## 📌 Why It Matters

Solves a real, daily-use problem with a scalable, user-friendly system combining UX, product thinking, and practical impact.

---

<p align="center">Made with ❤️ for tiffin lovers across India</p>
