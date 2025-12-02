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

## Notes
- The app uses path aliasing with `@/` prefix pointing to project root
- Images are served from Unsplash domains
- Webpack is configured with custom alias resolution
