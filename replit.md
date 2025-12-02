# ChinaTourPlan

## Overview
ChinaTourPlan is a Next.js application for planning travel itineraries to China. The app provides a custom itinerary builder, cost breakdown, and live assistance features for travelers.

## Pricing Structure
- **Free**: $0 - Up to 3 itineraries per month
- **Pro**: $19/month - Unlimited itineraries, AI chat assistant, PDF downloads
- **Lifetime**: $99 one-time - All Pro features forever

## Project Structure
- `pages/` - Next.js pages directory
  - `index.js` - Entry point that imports Home component
  - `Home.jsx` - Main home page with wizard and itinerary views
  - `signup.jsx` - Membership signup/login page with plan selection
  - `dashboard.jsx` - User dashboard showing saved itineraries and review submission
  - `_app.js` - Next.js app wrapper
- `pages/api/` - API routes
  - `chat.js` - GROQ AI chat endpoint for premium users
- `components/` - React components
  - `travel/` - Travel-specific components
    - `HeroSection.jsx` - Landing page hero with CTA
    - `InputWizard.jsx` - Multi-step trip planning wizard
    - `ItineraryResult.jsx` - Generated itinerary display
    - `ReviewsSection.jsx` - Customer reviews section with user-submitted reviews
    - `Navbar.jsx` - Navigation bar with user authentication status
    - `FeaturesSection.jsx` - Features showcase section
    - `CityGallery.jsx` - Interactive city photo gallery
    - `AskAIModal.jsx` - AI chat assistant modal (premium only)
    - `Footer.jsx` - Site footer with contact info
    - `cityData.jsx` - City information database (20 cities)
  - `ui/` - Reusable UI components (buttons, dialogs, inputs, sliders, etc.)
- `styles/` - Global CSS styles
- `lib/` - Utility functions

## Tech Stack
- **Framework**: Next.js 14.0.0
- **Language**: JavaScript/JSX
- **Styling**: TailwindCSS
- **AI Integration**: GROQ SDK (llama-3.3-70b-versatile model)
- **UI Libraries**: 
  - Radix UI (dialogs, sliders, radio groups)
  - Framer Motion (animations)
  - Lucide React (icons)
  - Sonner (toast notifications)

## Environment Variables
- `GROQ_API_KEY` - API key for GROQ AI chat integration (required for premium AI features)

## Development
The dev server runs on port 5000 at 0.0.0.0 to work with Replit's proxy system.

### Run Development Server
```bash
npm run dev
```
Server will be available at http://0.0.0.0:5000

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

## Deployment
The app is configured for autoscale deployment on Replit:
- Build command: `npm run build`
- Start command: `npm start`
- Deployment type: Autoscale (stateless)

## Recent Changes (Dec 2, 2025)

### Latest Updates - Branding & Access Control:
- **Rebranding to ChinaTourPlan** (`components/travel/Navbar.jsx`, `components/travel/Footer.jsx`, `components/travel/ShareModal.jsx`, `package.json`):
  - Changed all instances of "TourToChina" to "ChinaTourPlan"
  - New logo design with 4-tier pagoda SVG icon
  - Updated email contact to contact@chinatourplan.com

- **New Pricing Structure** (`pages/signup.jsx`, `components/travel/PricingSection.jsx`):
  - Free tier: $0 (3 itineraries/month)
  - Pro tier: $19/month (unlimited + premium features)
  - Lifetime tier: $99 one-time (all features forever)
  - Free signup flow with plan selection

- **Access Control System** (`lib/accessControl.js`, `components/travel/ItineraryResult.jsx`):
  - Feature gating for AI assistant, PDF downloads, and detailed itineraries
  - Monthly usage tracking for free users
  - Upgrade prompts when limits are reached
  - localStorage-based plan and usage tracking

### Previous Updates - Comprehensive City Data Enhancement:
- **Pace-Based Time Limits** (`components/travel/PlaceSelector.jsx`):
  - Relaxed pace: 4 hours/day maximum
  - Moderate pace: 7 hours/day maximum  
  - Packed pace: 10 hours/day maximum
  - Validation prevents over-scheduling attractions

- **Major City Attraction Enhancements** (`components/travel/cityData.jsx`):
  - **Beijing**: 9 attractions including Forbidden City, Great Wall Mutianyu, Temple of Heaven, Summer Palace, Hutong Tours, Tiananmen Square, Lama Temple, 798 Art District, Olympic Park
  - **Shanghai**: 9 attractions including The Bund, Yu Garden, French Concession, Jade Buddha Temple, Nanjing Road, Jing'an Temple, Tianzifang, Shanghai Museum, Oriental Pearl Tower
  - **Xi'an**: 8 attractions including Terracotta Warriors, Ancient City Wall, Muslim Quarter, Big Wild Goose Pagoda, Bell & Drum Towers, Huaqing Palace, Shaanxi History Museum, Small Wild Goose Pagoda
  - **Chengdu**: 9 attractions including Giant Panda Base, Jinli Ancient Street, People's Park, Leshan Giant Buddha, Kuanzhai Alley, Wenshu Temple, Du Fu Thatched Cottage, Mount Qingcheng, Chengdu Museum
  - **Guilin**: 9 attractions including Li River Cruise, Yangshuo Cycling, Reed Flute Cave, Elephant Trunk Hill, Longji Rice Terraces, Moon Hill, West Street, Impression Liu Sanjie, Xingping Ancient Town

- **Enhanced Attraction Data Structure**:
  - Every attraction includes: name, nameChinese, description, duration, address, addressChinese, coordinates, openingHours, ticketPrice (RMB/USD), image (Unsplash URL), tips
  - New `localSecrets` arrays: 5 insider tips per attraction researched from local sources
  - New `bestPhotoSpots` arrays: Instagram-worthy locations for each attraction
  - Metro/transport directions with Chinese station names and exit info
  - Useful Chinese phrases with pinyin for each attraction

### Previous Updates:
- **Accommodation Selection Bug Fix** (`components/travel/ItineraryResult.jsx`, `pages/api/generate-itinerary.js`):
  - Fixed issue where user's accommodation selections weren't applied to itinerary
  - Both AI and fallback generation now honor user's per-city accommodation choices

- **New Place Selection Step** (`components/travel/PlaceSelector.jsx`):
  - Interactive place selection UI with category filters (history, nature, temple, modern, culture)
  - Time tracking showing hours remaining per city based on allocated days
  - Visual cards with place details, images, duration, and ticket prices
  - Search functionality to find specific attractions
  - Validation warnings when exceeding time budget

- **New Accommodation Selection Step** (`components/travel/AccommodationSelector.jsx`):
  - Per-city hotel/hostel selection with budget/comfort/luxury options
  - Contact info, amenities, and map links for each option
  - Price display in both RMB and USD

- **AI-Powered Itinerary Generation** (`pages/api/generate-itinerary.js`):
  - Uses Groq LLM (llama-3.3-70b-versatile) for smart day-by-day planning
  - Groups nearby places together to minimize travel time
  - Considers opening hours when scheduling activities
  - Includes selected accommodation info in AI prompt
  - Fallback generation if AI fails

- **Enhanced Input Wizard** (`components/travel/InputWizard.jsx`):
  - Now 8-step flow: Duration → Cities → City Days → Places → Pace → Accommodation → Budget → Food
  - Places selection step with city tabs and time validation
  - Accommodation selection step with city tabs

### Earlier Updates:
- **Professional Itinerary Enhancements** (`components/travel/cityData.jsx`, `components/travel/DetailedDayCard.jsx`):
  - Added `localInsights` field to each city with practical travel tips
  - Added `localSecrets` arrays to attractions with RedNote-researched hidden gems
  - Added `bestPhotoSpots` arrays for Instagram-worthy locations
  - Enhanced descriptions with more detail and cultural context
  - Updated DetailedDayCard to display new Local Secrets and Best Photo Spots sections

- **Dashboard Improvements** (`pages/dashboard.jsx`):
  - Added "See Itinerary" button (eye icon) - opens full itinerary view modal
  - Added delete confirmation dialog with "Are you sure?" message
  - Shows itinerary details including cities, duration, budget level, and creation date
  - "Create Similar Trip" button in view modal

- **Enlarged TourToChina Logo** (`components/travel/Navbar.jsx`):
  - Increased logo size from 10x10 to 14x14 with enhanced SVG design
  - Larger text (text-2xl) for better brand visibility
  - More detailed pagoda architecture in the icon

- **City Gallery Image Fixes** (`components/travel/CityGallery.jsx`):
  - Xi'an: Now shows actual Terracotta Warriors images (verified Unsplash URLs)
  - Guilin: Now shows actual karst landscape/Li River images
  - Hangzhou: Now shows West Lake and pagoda images
  - All cities have verified, working image URLs

- **Updated Trust Metrics** (`components/travel/ReviewsSection.jsx`, `components/travel/ItineraryResult.jsx`):
  - Changed from "5,000+ Travelers" to "20+ Happy Travelers"
  - Replaced "50+ Countries Served" with "24/7 Prompt Responses"
  - Updated testimonials section text to "Real experiences from travelers"

### Earlier Updates:
- **Pricing Section** (`components/travel/PricingSection.jsx`):
  - Three tiers: Free, Pro ($19/mo), Lifetime ($99)
  - Clicking "Pricing" in navbar scrolls to pricing section

- **Image Loading Improvements** (`components/travel/CityGallery.jsx`):
  - Added ImageWithFallback component with loading shimmer
  - Error handling for broken images with fallback

- **GROQ AI Chat Integration** (`pages/api/chat.js`, `components/travel/AskAIModal.jsx`):
  - AI-powered travel assistant for premium users only
  - Uses GROQ's llama-3.3-70b-versatile model
  - Contextual responses based on user's itinerary
  - Suggested questions and chat history
  - Floating AI button for quick access

- **City Gallery** (`components/travel/CityGallery.jsx`):
  - Interactive gallery showcasing 8 major Chinese cities
  - Lightbox-style image viewer with navigation
  - City information including specialties and descriptions
  - Beautiful card layout with hover effects

- **Navigation Updates**:
  - Added Gallery link to navbar (desktop and mobile)
  - Smooth scroll to gallery section
  - All 20 cities fully supported in wizard

- **Paywall System**:
  - Free users: See only first activity per day
  - Basic plan: Full itinerary access
  - Premium plan: Full itinerary + AI chat assistant

### Previous Features:
- **Membership Signup Page** (`/signup`):
  - Three pricing tiers: Monthly ($9.99), Yearly ($59.99), Lifetime ($149.99)
  - Form validation for email, password, and name
  - Toggle between signup and login modes
  - Benefits showcase with icons
  
- **User Dashboard** (`/dashboard`):
  - Shows saved itineraries with ability to view/delete
  - Member status display
  - Write review functionality for members
  - Loading state for proper client-side hydration
  
- **Reviews Section** (Homepage):
  - 6 pre-populated fake reviews from international travelers
  - Carousel navigation for viewing more reviews
  - Displays user-submitted reviews from members
  - Trust indicators (20+ travelers, 24/7 prompt responses, 4.9/5 rating)
  
- **Navigation & Footer**:
  - Fixed navbar with scroll effect
  - Mobile-responsive menu
  - User authentication status display
  - Footer with contact info and quick links
  
- **Features Section**:
  - 8 feature cards showcasing app capabilities
  - AI-powered itineraries, Chinese addresses, phrases, 24/7 support, etc.

### UI/UX Fixes:
- Fixed slider visibility - thicker track, visible red color, larger thumb
- Improved wizard animation performance - reduced lag with faster transitions
- Added padding to hero section for navbar visibility

### Earlier Changes:
- Fixed folder naming for Next.js conventions
- Configured dev server for Replit environment
- Fixed critical city selection bug for 15+ cities
- Enhanced ItineraryResult with contact banner and testimonials
- Added WeChat contact: Shahkarhassan

## Contact Information
- **WeChat**: Shahkarhassan
- **WhatsApp**: Coming Soon (placeholder)

## User Data Storage
Currently using localStorage for:
- User authentication (`user` key)
- Saved itineraries (`itineraries` key)
- User reviews (`userReviews` key)

## Future Features (Planned)
- Database integration for persistent user data storage
- Real payment processing (Stripe integration)
- Actual user authentication (Replit Auth)
- Email notifications for trip reminders
- Social sharing features

## Notes
- The app uses path aliasing with `@/` prefix pointing to project root
- Images are served from Unsplash domains
- Webpack is configured with custom alias resolution
- City data includes: highlights, foods (by dietary preference), hotels (budget/comfort/luxury), transport info, and emergency contacts
