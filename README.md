# Aarya Patel - Portfolio Website

A modern, interactive portfolio website built with React, TypeScript, and Three.js featuring 3D animations and tilt card effects.

## ✨ Features

- **3D Tilt Cards** - Interactive cards that respond to mouse movement with realistic 3D transforms
- **Dynamic Light Effects** - Cursor-following light sources that create immersive visual experiences
- **Project Carousel** - Auto-playing carousel showcasing featured projects with smooth transitions
- **THREE.js Background** - Subtle animated star field with scroll-based parallax effects
- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- **Modern UI** - Clean, professional design inspired by contemporary portfolio websites

## 🚀 Live Demo

Visit the live site: [Your Portfolio URL]

## 🛠️ Built With

- **Vite** - Fast build tool and dev server
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **THREE.js** - 3D graphics and animations
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for react-three-fiber
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Smooth animations and transitions

## 📁 Project Structure

```
src/
├── components/
│   ├── 3d/                 # THREE.js components
│   │   ├── AstronomyBackground.tsx
│   │   └── Scene3D.tsx
│   ├── sections/           # Page sections
│   │   ├── HeroSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ContactSection.tsx
│   │   └── Footer.tsx
│   └── ui/                 # Reusable UI components
│       ├── TiltCard.tsx
│       ├── ProjectCarousel.tsx
│       └── button.tsx
├── pages/
│   └── Index.tsx          # Main page component
└── lib/
    └── utils.ts           # Utility functions
```

## 🎨 Key Components

### TiltCard
Interactive 3D card component with:
- Mouse tracking for realistic tilt effects
- Dynamic lighting that follows cursor movement
- Smooth animations and transforms
- Customizable intensity and perspective

### ProjectCarousel
Auto-playing project showcase featuring:
- Smooth transitions between projects
- Navigation arrows and pagination dots
- Responsive design for all screen sizes
- Maintained 3D effects on project cards

### AstronomyBackground
Animated THREE.js background with:
- 400 procedurally positioned stars
- Scroll-based rotation effects
- Optimized performance for smooth animations
- Subtle visual depth without distraction

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints optimized for:
- **Desktop** (1024px+): Full layout with side-by-side content
- **Tablet** (768px-1023px): Adapted spacing and component sizing
- **Mobile** (320px-767px): Stacked layout with touch-friendly interactions

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📂 Adding Content

### Profile Image
Add your profile photo as `public/images/profile.jpg`

### Project Images
Add project screenshots to `public/images/projects/` and update the carousel component references

### Personal Information
Update contact details in:
- `src/components/sections/HeroSection.tsx`
- `src/components/sections/ContactSection.tsx`

## 🌐 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Automatic deployments on every push

### Netlify
1. Run `npm run build`
2. Deploy the `dist` folder

### Custom Domain
Both platforms support custom domain configuration in their dashboards.

## 🎯 Performance Optimizations

- **Lazy Loading** - Components load only when needed
- **Optimized Assets** - Compressed images and efficient bundling
- **3D Performance** - Reduced particle counts for smooth animations
- **Code Splitting** - Automatic chunk splitting for faster loading

## 📞 Contact

- **Email**: aarya27@gmail.com
- **LinkedIn**: [aarya-p9](https://linkedin.com/in/aarya-p9)
- **GitHub**: [axryap27](https://github.com/axryap27)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
