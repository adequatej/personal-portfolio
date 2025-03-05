# Personal Portfolio

My modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. This portfolio showcases my projects, skills, and experience.

![Portfolio Preview](/public/portfolio-preview.png)

## 🌟 Features

- **Modern UI/UX**: Clean, responsive design with smooth animations and transitions
- **Dark/Light Mode**: Automatic theme detection with manual toggle option
- **Interactive Components**: Dynamic project cards, skill visualization, and contact form
- **Particle Effects**: Custom background animations that respond to user interaction
- **Firebase Integration**: Real-time visitor counter and contact form submission
- **SEO Optimized**: Meta tags and structured data for better search engine visibility
- **Responsive Design**: Optimized for all device sizes from mobile to desktop
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support

## 🚀 Technologies Used

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Firebase Realtime Database
- **Deployment**: Vercel
- **Tools**: ESLint, Prettier, Git

## 📋 Project Structure

```
personal-portfolio/
├── public/               # Static assets and images
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout component
│   │   └── page.tsx      # Home page component
│   ├── components/       # React components
│   │   ├── effects/      # Visual effects (particles, animations)
│   │   ├── layout/       # Layout components (navbar, footer, container)
│   │   ├── sections/     # Page sections (hero, about, projects, etc.)
│   │   └── ui/           # Reusable UI components (buttons, cards, etc.)
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and Firebase config
│   └── types/            # TypeScript type definitions
├── scripts/              # Build and utility scripts
├── .env.local            # Environment variables (not in repo)
├── .env.example          # Example environment variables
├── database-rules.json   # Firebase database security rules
├── tailwind.config.ts    # Tailwind CSS configuration
├── postcss.config.mjs    # PostCSS configuration
├── tsconfig.json         # TypeScript configuration
├── next.config.ts        # Next.js configuration
├── eslint.config.mjs     # ESLint configuration
└── package.json          # Project dependencies and scripts
```

## 🛠️ Setup and Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/personal-portfolio.git
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

3. **Set up environment variables**

Create a `.env.local` file in the root directory and copy the variables from `.env.example`:

```bash
cp .env.example .env.local
```

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## 🔥 Firebase Setup

This project uses Firebase Realtime Database for the visitor counter and contact form. To set up Firebase:

1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Set up a Realtime Database
3. Configure the database rules using the provided `database-rules.json` file:
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
4. Add your Firebase Realtime Database URL to the `.env.local` file:
   ```
   NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your-project-id-default-rtdb.firebaseio.com
   ```

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- Mobile devices (320px+)
- Tablets (768px+)
- Laptops/Desktops (1024px+)
- Large screens (1440px+)

## 🌙 Dark Mode

Dark mode is implemented using Tailwind CSS and automatically detects the user's system preference. Users can also manually toggle between light and dark mode.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Firebase](https://firebase.google.com/)
- [Vercel](https://vercel.com/)

## 📧 Contact

Feel free to reach out if you have any questions or feedback!

- Email: jed@adequatej.com
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/jed-geoghegan)
- GitHub: [Your GitHub](https://github.com/adequatej)

