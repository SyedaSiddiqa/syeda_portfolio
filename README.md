# Syeda's Premium Portfolio Website

A modern, fully responsive portfolio website built with React, Vite, Tailwind CSS, GSAP, and Framer Motion. Features smooth animations, dark mode, and showcase of 15+ projects.

## 🚀 Features

- ✨ **Modern Design** - Glassmorphism, gradients, and smooth animations
- 🎨 **Dark/Light Mode** - Theme switcher with localStorage persistence
- 📱 **Fully Responsive** - Mobile, tablet, and desktop optimized
- ⚡ **Smooth Animations** - GSAP ScrollTrigger and Framer Motion effects
- 🎯 **SEO Optimized** - Semantic HTML and meta tags
- ♿ **Accessible** - WCAG compliance and keyboard navigation
- 🔥 **Performance** - Lazy loading, code splitting, optimized images
- 📊 **Portfolio Showcase** - 15+ projects with filters and search

## 📋 Sections

1. **Hero** - Eye-catching introduction with CTA buttons
2. **About** - Professional background and statistics
3. **Skills** - Categorized technical expertise
4. **Featured Projects** - 6 highlighted portfolio pieces
5. **Experience** - Learning journey timeline
6. **Contact** - Professional contact form
7. **Footer** - Navigation and social links

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: GSAP + Framer Motion
- **Icons**: Lucide React
- **State Management**: React Context + Hooks

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Steps

1. **Clone or extract the project**
```bash
cd syeda-portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```
The app will open automatically at `http://localhost:3000`

4. **Build for production**
```bash
npm run build
```

5. **Preview production build**
```bash
npm run preview
```

## 📁 Project Structure

```
syeda-portfolio/
├── src/
│   ├── App.jsx           # Main component with all sections
│   ├── main.jsx          # React entry point
│   └── index.css         # Global styles
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS configuration
├── package.json          # Dependencies
└── README.md             # This file
```

## 🎨 Customization

### Update Personal Info
Edit `src/App.jsx` and replace:
- Name: "Syeda" → Your name
- Social links: GitHub, LinkedIn, Email
- Bio and description text
- Project details

### Change Colors
Modify `tailwind.config.js`:
```javascript
colors: {
  primary: '#00D9FF',    // Cyan
  secondary: '#A855F7',  // Purple
}
```

### Add New Projects
In `src/App.jsx`, update the `projects` array in `FeaturedProjects`:
```javascript
const projects = [
  {
    title: 'Your Project',
    desc: 'Description here',
    tech: ['React', 'Tailwind'],
  },
  // ... more projects
];
```

## 🌙 Dark Mode

The theme preference is automatically saved to localStorage. Users can toggle between:
- **Dark Mode** (Default) - Deep navy background with cyan/purple accents
- **Light Mode** - White background with cyan/purple accents

## ⚙️ Configuration

### GSAP Animations
ScrollTrigger is already set up. For more custom animations:
```javascript
useEffect(() => {
  gsap.from('.element', {
    scrollTrigger: { trigger: '.element', start: 'top center' },
    duration: 0.8,
    opacity: 0,
    y: 30,
  });
}, []);
```

### Framer Motion
Used for component-level animations:
```javascript
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  whileHover={{ scale: 1.05 }}
>
  Content
</motion.div>
```

## 📊 Performance Tips

1. **Image Optimization**
   - Use WebP format
   - Implement lazy loading
   - Compress images

2. **Code Splitting**
   - Vite handles this automatically
   - Dynamic imports for heavy sections

3. **Lighthouse Scores Target**
   - Performance: 90+
   - Accessibility: 95+
   - Best Practices: 95+
   - SEO: 100

## 🔐 Production Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### GitHub Pages
Update `vite.config.js`:
```javascript
export default defineConfig({
  base: '/your-repo-name/',
  // ...
});
```

## 📧 Contact Form Integration

To enable EmailJS:
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Get your Service ID, Template ID, and Public Key
3. Add to the contact form in `src/App.jsx`

## ✅ Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork, modify, and use this portfolio as a template for your own!

## 📞 Support

For issues, feature requests, or customization help, refer to the component comments in `src/App.jsx`.

---

**Built with ❤️ using React + Tailwind + GSAP**
