# China Tour Planning App

## Overview
This is a Next.js application for planning travel itineraries to China. The app provides a custom itinerary builder, cost breakdown, and live assistance features for travelers.

## Project Structure
- `pages/` - Next.js pages directory
  - `index.js` - Entry point that imports Home component
  - `Home.jsx` - Main home page with wizard and itinerary views
  - `signup.jsx` - Membership signup/login page with plan selection
  - `dashboard.jsx` - User dashboard showing saved itineraries and review submission
  - `_app.js` - Next.js app wrapper
- `components/` - React components
  - `travel/` - Travel-specific components
    - `HeroSection.jsx` - Landing page hero with CTA
    - `InputWizard.jsx` - Multi-step trip planning wizard
    - `ItineraryResult.jsx` - Generated itinerary display
    - `ReviewsSection.jsx` - Customer reviews section with user-submitted reviews
    - `Navbar.jsx` - Navigation bar with user authentication status
    - `FeaturesSection.jsx` - Features showcase section
    - `Footer.jsx` - Site footer with contact info
    - `cityData.jsx` - City information database
  - `ui/` - Reusable UI components (buttons, dialogs, inputs, sliders, etc.)
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
### New Features Added:
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
  - Trust indicators (5,000+ travelers, 50+ countries, 4.9/5 rating)
  
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

### Previous Changes:
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
