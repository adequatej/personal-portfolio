# Personal Portfolio Website ✨

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. This portfolio showcases my projects, skills, and professional experience with beautiful animations and real-time features.

🌐 **Live Demo**: [jedgeoghegan.com](https://jedgeoghegan.com/)

## 🌟 Features

- **Modern UI/UX**: Clean, responsive design with smooth animations powered by Framer Motion
- **Dark/Light Mode**: Automatic theme detection with manual toggle option using next-themes
- **Interactive Components**: 
  - Dynamic project cards with 3D hover effects
  - Interactive skill visualization with hover/click interactions
  - Real-time contact form with success feedback
  - Animated particle background effects
- **Firebase Integration**: 
  - Real-time visitor counter
  - Contact form submissions stored in Firebase Realtime Database
- **Performance Optimized**: 
  - Server-side rendering with Next.js 15
  - Optimized images and lazy loading
  - SEO-friendly with proper meta tags
- **Responsive Design**: Fully optimized for all device sizes from mobile to desktop
- **Analytics**: Integrated with Vercel Analytics for performance monitoring

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Radix UI primitives with custom styling
- **Animations**: Framer Motion for smooth transitions and interactions
- **Icons**: Lucide React and Heroicons
- **Typography**: React Type Animation for dynamic text effects

### Backend & Database
- **Database**: Firebase Realtime Database
- **Hosting**: Vercel (with automatic deployments)

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint with Next.js configuration
- **Type Checking**: TypeScript 5
- **Build Tool**: Next.js with Turbopack for faster development

## 🛠️ Setup and Installation

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/adequatej/personal-portfolio.git
   cd personal-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables** (Optional for Firebase features)
   
   Create a `.env.local` file in the root directory:
   ```bash
   # Firebase Realtime Database URL (optional)
   NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your-project-id-default-rtdb.firebaseio.com
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to view the portfolio

## 🔥 Firebase Setup (Optional)

The portfolio includes optional Firebase integration for visitor counting and contact form submissions.

### Setting up Firebase

1. **Create a Firebase project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Realtime Database

2. **Configure database rules**
   
   Use the provided `database-rules.json` file or manually set these rules:
   ```json
   {
     "rules": {
       "visitorCount": {
         ".read": true,
         ".write": true
       },
       "contactMessages": {
         ".read": false,
         ".write": true
       }
     }
   }
   ```

3. **Add your database URL**
   
   Add your Firebase Realtime Database URL to `.env.local`:
   ```
   NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your-project-id-default-rtdb.firebaseio.com
   ```

4. **Deploy database rules** (if using Firebase CLI)
   ```bash
   firebase deploy --only database
   ```

## 📱 Responsive Breakpoints

The portfolio is fully responsive across all device sizes:

| Breakpoint | Screen Size | Optimizations |
|------------|-------------|---------------|
| Mobile | 320px - 640px | Single column layout, touch-friendly interactions |
| Tablet | 640px - 1024px | Optimized spacing, medium-sized components |
| Desktop | 1024px - 1440px | Multi-column layouts, hover effects |
| Large | 1440px+ | Maximum content width, enhanced spacing |

## 🎯 Key Sections

- **Hero**: Dynamic introduction with animated typing and visitor counter
- **About**: Personal background with animated role cards
- **Skills**: Interactive technology showcase with project counts
- **Projects**: Featured projects with filtering and detailed overlays
- **Contact**: Functional form with Firebase integration

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact & Connect

- **Email**: jedgeoghegan@gmail.com
- **LinkedIn**: [linkedin.com/in/jed-geoghegan](https://linkedin.com/in/jed-geoghegan)
- **GitHub**: [github.com/adequatej](https://github.com/adequatej)

---

*If you like this project, please consider giving it a ⭐ on GitHub!*

