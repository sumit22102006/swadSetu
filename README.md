
# 🍱 swadSetu — Daily Meal Customization App

[🎨 View Figma Design](https://www.figma.com/design/0G1vW5J1TUzcN5xOSTIuRK/Untitled?node-id=0-1&t=ty2KsFQN4h3CN5mP-1)

A mobile-first web app that allows users to subscribe to local tiffin centers, customize meals daily, and manage everything from a single dashboard. Designed to feel warm, minimal, and practical — like a real indie product.

---

## 🚀 Problem

Tiffin services today are rigid and outdated:

* Fixed menus, no flexibility
* Hard to switch between providers
* No personalization (diet, health needs)
* Manual coordination (calls/WhatsApp)
* No tracking of meals, swaps, or history

---

## 💡 Solution

swadSetu gives users full control:

* Subscribe to multiple tiffin centers
* Customize meals daily
* Switch centers anytime
* Apply global dietary preferences
* Track meals, swaps, and usage

---

## 🎯 Core Features

**1. Home Dashboard**

* Greeting, delivery time, active center
* Stats: days active, swaps left, avg rating
* Bottom nav: Home, Centers, Meals, History, Profile

**2. Tiffin Center Selection**

* Browse centers with cuisine, tags, ratings, price
* Switch centers dynamically
* Plan-based limits (Basic:1, Standard:2, Premium:∞)

**3. Daily Meal Customization**

* 7-day planner
* Meal builder: Base + Sabzi + Add-ons
* AI suggestions + swap tracking
* Actions: Skip / Confirm meal

**4. Preference Profile**

* Global toggles (Low oil, Veg, Less spicy, etc.)
* Applies across all centers
* Allergy notes support

**5. Subscription Plans**

* Basic (₹99/day): 1 center, fixed menu
* Standard (₹139/day ⭐): 2 centers, swaps
* Premium (₹179/day): full customization + AI

---

## 🎨 Design System

* Primary: #F97316 (Saffron Orange)
* Header: #1C1917 (Dark Charcoal)
* Veg: #1A6B3C (Forest Green)
* Background: Warm off-white
* Clean sans-serif, no gradients, no clutter

---

## 🧱 Tech Stack (Suggested)

Frontend: React / Next.js + Tailwind
Backend: Node.js + Express
Database: MongoDB / PostgreSQL
Extras: Firebase (auth), Razorpay (payments), AI suggestions

---

## 📁 Frontend Folder Structure

```text
swadSetu/
├── public/               # Static assets
├── src/
│   ├── assets/           # Images, icons, and fonts
│   ├── components/       # Reusable UI components
│   ├── pages/            # Application routes/pages
│   ├── utils/            # Helper functions and utilities
│   ├── App.jsx           # Main application entry component
│   ├── main.jsx          # React DOM render and context providers
│   └── index.css         # Global styles and design system
├── index.html            # Main HTML template
├── package.json          # Project metadata and scripts
└── vite.config.js        # Vite configuration
```

---

## 🔄 User Flow

Signup → Choose Plan → Select Centers → Set Preferences → Customize Meals → Track Usage

---

## 🧠 Challenges

* Scaling daily customization
* Managing multi-center subscriptions
* Keeping UI simple
* Syncing preferences across vendors

---

## 📈 Future Scope

* AI meal recommendations
* Nutrition tracking
* Vendor dashboard
* Delivery tracking
* Ratings & reviews

---

## 🛠️ Setup

git clone https://github.com/sumit22102006/swadSetu.git
npm install
npm run dev

---

## 📌 Why It Matters

Solves a real, daily-use problem with a scalable, user-friendly system combining UX, product thinking, and practical impact.

---
