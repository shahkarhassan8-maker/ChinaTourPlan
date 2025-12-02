# China Tour Planning App

## Overview
This is a Next.js application for planning travel itineraries to China. The app provides a custom itinerary builder, cost breakdown, and live assistance features for travelers.

## Project Structure
- `pages/` - Next.js pages directory
  - `index.js` - Entry point that imports Home component
  - `Home.jsx` - Main home page with wizard and itinerary views
  - `_app.js` - Next.js app wrapper
- `components/` - React components
  - `travel/` - Travel-specific components (HeroSection, InputWizard, ItineraryResult, etc.)
  - `ui/` - Reusable UI components (buttons, dialogs, inputs, etc.)
- `styles/` - Global CSS styles
- `lib/` - Utility functions

## Tech Stack
- **Framework**: Next.js 14.0.0
- **Language**: JavaScript/JSX
- **Styling**: TailwindCSS
- **UI Libraries**: 
  - Radix UI (dialogs, sliders, radio groups)
  - Framer Motion (animations)
  - Lucide React (icons)
  - Sonner (toast notifications)

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
- Fixed folder naming for Next.js conventions (Pages → pages, Components → components, Travel → travel)
- Configured dev server to run on 0.0.0.0:5000 for Replit environment
- Set up workflow for Next.js dev server
- Configured deployment settings for production
- Removed invalid experimental config from next.config.js
- Removed bottom chat features (FloatingAssistButton and LiveAssistanceModal components)
- Fixed critical city selection bug - added complete data for 15+ cities that were missing from CITY_DATA:
  - hangzhou, suzhou, huangshan, zhangjiajie, jiuzhaigou, lijiang, yunnan (Dali)
  - hongkong, macau, tibet (Lhasa), harbin, pingyao, fenghuang, xiamen, chongqing
- Enhanced ItineraryResult page with:
  - Contact Support Banner (always visible with WeChat and WhatsApp info)
  - Testimonials section with 3 customer reviews
  - Trust indicators (5,000+ travelers, 50+ countries, 4.9/5 rating, 100% guarantee)
  - Footer contact information
- Added WeChat contact: Shahkarhassan

## Contact Information
- **WeChat**: Shahkarhassan
- **WhatsApp**: Coming Soon (placeholder)

## Future Features (Planned)
- Premium membership signup page with user accounts
- Saved itineraries feature for registered users
- Database integration for storing user data
- Authentication system (Replit Auth integration)

## Notes
- The app uses path aliasing with `@/` prefix pointing to project root
- Images are served from Unsplash domains
- Webpack is configured with custom alias resolution
- City data includes: highlights, foods (by dietary preference), hotels (budget/comfort/luxury), transport info, and emergency contacts
