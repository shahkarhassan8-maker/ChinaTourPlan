# ChinaTourPlan

## Overview
ChinaTourPlan is a Next.js application designed to streamline travel planning for China. It offers a custom itinerary builder, detailed cost breakdowns, and live AI assistance for travelers. The project aims to provide a comprehensive, user-friendly platform for creating personalized China travel experiences, ranging from free basic planning to premium features like AI chat and unlimited itineraries.

## User Preferences
I prefer iterative development with clear, concise communication. Please ask for confirmation before implementing major architectural changes or refactoring large portions of the codebase. Focus on robust, scalable solutions. I value detailed explanations for complex features.

## System Architecture
The application is built with Next.js 14.0.0, utilizing JavaScript/JSX and styled with TailwindCSS. Supabase serves as the backend for PostgreSQL database management and user authentication, complemented by a custom access control system for feature gating. AI-powered features, including itinerary generation and a chat assistant, are integrated using the GROQ SDK with the `llama-3.1-70b-versatile` model.

**Key Features and Implementations:**
- **Itinerary Builder:** A 6-step input wizard guides users through trip planning (duration, cities, days, places, pace, accommodation, food). AI generates detailed day-by-day itineraries based on user selections, including hotel quality preferences and ensuring strict adherence to selected attractions.
- **User Authentication & Profiles:** Supabase handles user signup, login, and manages user profiles, including plan types (Free, Pro, Elite) and saved itineraries.
- **Payment Processing:** LemonSqueezy integration for one-time payments with checkout overlay. Pro ($19) and Elite ($49) tiers.
- **Cost Breakdown:** Budget tiers are derived from accommodation selections, influencing cost calculations within itineraries.
- **AI Chat Assistant:** A premium feature providing contextual travel assistance via a floating modal.
- **Dynamic Content:** City-specific data, including attractions, local insights, photo spots, and transport information, is extensively detailed within `cityData.jsx`.
- **UI/UX:** Incorporates Radix UI for interactive components, Framer Motion for animations, Lucide React for icons, and Sonner for toast notifications. The design includes a professional logo, interactive city galleries, and a responsive navigation bar.
- **Access Control:** Features like the AI chat and full itinerary details are gated based on user membership tiers.
- **Authentication-Gated Features:** Save, Share, and Email buttons require user authentication. Non-authenticated users are redirected to signup page with pending itinerary stored in localStorage. Pricing/upgrade CTAs also redirect to signup for non-authenticated users.
- **Saved Itinerary Viewing:** Dedicated `/itinerary/[id]` page displays saved itineraries from database with share/email functionality.

## Recent Changes (December 2024)
- Added authentication gating for save/share/email buttons
- Pricing and upgrade buttons now redirect to signup for non-authenticated users
- Itineraries are only stored in database for authenticated users
- Created `/itinerary/[id]` page to display saved itineraries
- Share and Email modals now generate links to saved itinerary pages
- Pending itinerary flow: stores itinerary when user signs up/in and redirects to saved itinerary

### December 4, 2024
**Performance Optimizations:**
- Optimized HeroSection LCP by removing animation delays on critical text elements
- Reduced hero image from 1200px to 800px with better quality settings
- Added Next.js Image component to HeroSection with priority loading
- Optimized CityGallery images from 800px to 400px with lazy loading and proper fallback behavior
- Updated next.config.js with modern image formats (AVIF, WebP), optimized device sizes, and caching
- Reduced Navbar logo from 64x64 to 48x48 using Next.js Image

**New Travel Information Sections (added to ItineraryResult):**
- TravelAppsSection: Essential apps for travelers (WeChat, Alipay, Didi, VPN, maps, translation)
- WhatToBringSection: Seasonal packing guide with interactive season selector
- FAQSection: Comprehensive FAQ with categories (Before You Go, Money, Transport, Communication, Food, Safety)

### December 3, 2024
- Fixed review system to display ALL user-selected attractions from CITY_DATA (not just scheduled activities)
- Fixed "See" button in saved itineraries to correctly navigate to `/itinerary/[id]` pages
- Created `/auth/callback` page to handle password reset and email confirmation redirects from Supabase
- Updated signUp and resetPassword functions with proper redirect URLs using `emailRedirectTo`
- Added admin user functionality with bypass access for all features (dev/testing purposes)
- Admin emails configured in `lib/accessControl.js` (shahkarhassan8@gmail.com, admin@chinatourplan.com)
- Note: Production should add site URL to Supabase dashboard's allowed redirect URLs

### Payment-First Signup Flow
- **Free plan:** Signs up directly without payment, creates account immediately
- **Pro/Elite plans:** Payment-first flow - user enters name/email, clicks checkout button which opens LemonSqueezy overlay, after successful payment user enters password to complete signup
- Form validation split: `validateBasicInfo()` for pre-checkout (name/email only), `validateForm()` for final signup (includes password)
- Stores `pendingSignup` (name, email, plan - no password) during checkout
- After payment success, stores `paymentCompleted` with 1-hour expiration
- User's email is prefilled in LemonSqueezy checkout
- Green success banner shows when payment is completed
- Security: No passwords stored in localStorage, postMessage origin validation for LemonSqueezy events

## External Dependencies
- **Supabase:** PostgreSQL database, Authentication, and storage for user profiles, itineraries, and reviews.
- **LemonSqueezy:** Payment processing with checkout overlay for Pro ($19) and Elite ($49) one-time purchases.
- **GROQ SDK:** For AI chat and itinerary generation (using `llama-3.1-70b-versatile` model).
- **Radix UI:** UI primitives for building accessible design systems.
- **Framer Motion:** Animation library.
- **Lucide React:** Icon library.
- **Sonner:** Toast notification library.
- **Unsplash:** Image hosting for various city and attraction visuals.

## LemonSqueezy Integration
- **Script:** Loaded via `pages/_app.js` from `https://assets.lemonsqueezy.com/lemon.js`
- **Pro Plan URL:** `https://chinatourplan.lemonsqueezy.com/buy/d5d05f0b-3fce-4ef9-8c83-5f162d6e1304?embed=1`
- **Elite Plan URL:** `https://chinatourplan.lemonsqueezy.com/buy/72ccffc3-b57d-4b9c-aa22-52fe3e597389?embed=1`
- **Button Class:** Anchor tags with `lemonsqueezy-button` class trigger checkout overlay
- **Note:** Access control maps legacy "lifetime" plan to "elite" for backward compatibility