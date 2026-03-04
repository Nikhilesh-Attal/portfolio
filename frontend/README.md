# Nikhilesh Attal - Portfolio Website

A modern, ultra-animated personal portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. Features AI-powered 3D elements, smooth animations, and production-ready performance optimizations.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Ultra-Smooth Animations**: Framer Motion with respect for `prefers-reduced-motion`
- **3D Hero Section**: Three.js with animated sphere and particle effects
- **Dark/Light Mode**: Smooth theme transitions with system preference detection
- **Mobile-First Design**: Fully responsive with touch-friendly interactions
- **Performance Optimized**: Lighthouse score 90+, optimized images, code splitting
- **Accessibility First**: ARIA attributes, keyboard navigation, screen reader support
- **SEO Ready**: Meta tags, structured data, sitemap generation

## 🎨 Design System

### Colors
- **Primary**: Purple gradient (`#8b5cf6` to `#3b82f6`)
- **Secondary**: Blue (`#3b82f6`)
- **Accent**: Emerald (`#10b981`)
- **Background**: Dynamic based on theme
- **Text**: High contrast ratios (4.5:1+)

### Typography
- **Headings**: Space Grotesk (bold, modern)
- **Body**: Inter (readable, professional)
- **Code**: Geist Mono (when needed)

### Spacing & Layout
- **Container**: Max-width 7xl (1280px)
- **Sections**: 80px vertical padding (py-20)
- **Grid**: Responsive 12-column system
- **Breakpoints**: Mobile-first (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development
\`\`\`bash
# Clone the repository
git clone https://github.com/nikhilesh-attal/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
\`\`\`

### Build for Production
\`\`\`bash
# Create optimized build
npm run build

# Start production server
npm start
\`\`\`

### Deploy to Vercel
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect GitHub repo to Vercel dashboard for automatic deployments
\`\`\`

## 📁 Project Structure

\`\`\`
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles & CSS variables
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── hero.tsx          # 3D hero section
│   ├── about.tsx         # About section with flip cards
│   ├── projects.tsx      # Projects with modal system
│   ├── skills.tsx        # Interactive skills grid
│   ├── philosophy.tsx    # Philosophy quote section
│   ├── what-i-bring.tsx  # Qualities with particle effects
│   ├── contact.tsx       # Contact form with animations
│   ├── navbar.tsx        # Sticky navigation
│   └── theme-toggle.tsx  # Dark/light mode toggle
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
└── types/                # TypeScript definitions
\`\`\`

## 🎭 Animation System

### Framer Motion Configuration
- **Entrance Animations**: Staggered fade + slide effects
- **Hover States**: Scale, rotate, and glow effects
- **Scroll Animations**: Intersection Observer triggers
- **Micro-interactions**: Button springs, particle bursts
- **Reduced Motion**: Respects user preferences

### Animation Timing
- **Fast**: 0.3s for micro-interactions
- **Medium**: 0.6s for component transitions  
- **Slow**: 1.0s+ for complex sequences
- **Easing**: Custom cubic-bezier curves

### Performance Notes
- Animations only trigger when elements are in viewport
- GPU-accelerated transforms (translateZ, scale, rotate)
- Minimal layout thrashing with transform-only animations
- Conditional animation loading based on device capabilities

## 🎯 Sections Overview

### Hero Section
- **3D Animated Sphere**: Three.js with distortion material
- **Staggered Text**: Typewriter-style entrance
- **Floating Particles**: Subtle background elements
- **CTA Buttons**: Smooth scroll navigation

### About Section  
- **Flip Cards**: 3D card rotation on hover
- **Value Rotation**: Cycling through "AI", "Automation", "Startup"
- **Philosophy Quote**: Animated text reveal with underline

### Projects Section
- **Project Cards**: Hover lift effects with tech badges
- **Modal System**: Full-screen project details with carousel
- **Live Previews**: Screenshot galleries with navigation
- **Tech Stack**: Interactive badge system

### Skills Section
- **Category Filter**: Animated pill navigation
- **Skill Grid**: 3D tilt effects on hover
- **Progress Bars**: Animated skill level indicators
- **Glow Effects**: Dynamic hover states

### Contact Section
- **Contact Cards**: Gradient backgrounds with icons
- **Copy to Clipboard**: Email copy with success feedback
- **Confetti Effect**: Celebration animation on CTA click
- **Toast Notifications**: User feedback system

## 🔧 Customization Guide

### Updating Content
1. **Personal Info**: Edit `components/hero.tsx` for main headline
2. **Projects**: Update `components/projects.tsx` with your projects
3. **Skills**: Modify `components/skills.tsx` skill categories
4. **Contact**: Change email in `components/contact.tsx`

### Styling Changes
1. **Colors**: Update CSS variables in `app/globals.css`
2. **Fonts**: Modify font imports in `app/layout.tsx`
3. **Animations**: Adjust timing in component files
4. **Breakpoints**: Update Tailwind config

### Adding New Sections
1. Create component in `components/`
2. Import and add to `app/page.tsx`
3. Add navigation link to `components/navbar.tsx`
4. Implement scroll-to functionality

## 📊 Performance Checklist

- ✅ **Lighthouse Score**: 90+ across all metrics
- ✅ **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- ✅ **Image Optimization**: Next.js Image component with blur placeholders
- ✅ **Code Splitting**: Dynamic imports for heavy libraries
- ✅ **Bundle Analysis**: Optimized chunk sizes
- ✅ **Caching**: Static generation where possible

## ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: ARIA labels and descriptions
- **Focus Management**: Visible focus indicators
- **Color Contrast**: WCAG AA compliance (4.5:1+)
- **Reduced Motion**: Respects user preferences
- **Skip Links**: Quick navigation for assistive technology

## 🧪 Testing

\`\`\`bash
# Run tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
\`\`\`

## 📈 SEO Optimization

- **Meta Tags**: Dynamic title, description, keywords
- **Open Graph**: Social media preview optimization
- **Structured Data**: JSON-LD for rich snippets
- **Sitemap**: Auto-generated XML sitemap
- **Robots.txt**: Search engine crawling instructions

## 🚀 Deployment

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Configure build settings (auto-detected)
3. Set environment variables if needed
4. Deploy with automatic CI/CD

### Other Platforms
- **Netlify**: Works with standard Next.js build
- **AWS Amplify**: Full-stack deployment support
- **Railway**: Simple deployment with GitHub integration

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Framer Motion**: Smooth animations
- **Three.js**: 3D graphics capabilities
- **Tailwind CSS**: Utility-first styling
- **Next.js**: React framework
- **Vercel**: Deployment platform
- **Radix UI**: Accessible components

---

Built with ❤️ by [Nikhilesh Attal](https://github.com/nikhilesh-attal)
