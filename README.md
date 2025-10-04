# Portfolio Website - Hardware Hacker & IT Manager

My personal portfolio website showcasing my expertise as a Computer Science Engineer specializing in hardware hacking and IT management. Built from scratch to highlight my technical skills, professional experience, and innovative projects.

![Portfolio Preview](https://via.placeholder.com/800x400/2563eb/ffffff?text=Portfolio+Website)

## 🚀 Features

### 🎨 Modern Design
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Dark/Light Theme**: Toggle between light and dark modes
- **Interactive Elements**: Hover effects, animations, and smooth scrolling

### 💼 Professional Sections
- **Hero Section**: Eye-catching introduction with animated elements
- **About**: Personal introduction and professional highlights
- **Skills**: Organized into Hardware Hacking, Computer Science, and IT Management
- **Projects**: Featured work with detailed descriptions and technologies
- **Experience**: Professional timeline with achievements
- **Contact**: Interactive contact form with validation

### ⚡ Performance Optimized
- **Fast Loading**: Optimized CSS and JavaScript
- **SEO Friendly**: Meta tags and semantic HTML structure
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Cross-browser Compatible**: Works on all modern browsers

## 🛠️ Technologies Used

### Frontend
- **HTML5**: Semantic markup with modern standards
- **CSS3**: Custom properties, Grid, Flexbox, and animations
- **Vanilla JavaScript**: ES6+ with modern patterns
- **Google Fonts**: Inter font family for typography

### Development Tools
- **Live Server**: Development server with hot reload
- **ESLint**: Code linting and quality assurance
- **Prettier**: Code formatting
- **Terser**: JavaScript minification
- **CleanCSS**: CSS optimization

### Build & Deployment
- **GitHub Pages**: Static site hosting
- **ImageMin**: Image optimization
- **HTML Validator**: Markup validation

## 📁 Project Structure

```
portfolio-website/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   └── script.js          # Interactive functionality
├── images/                # Image assets
├── assets/               # Additional assets
├── public/               # Public files
├── src/                  # Source files
├── package.json          # Project configuration
├── README.md            # Project documentation
└── .gitignore           # Git ignore file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Modern web browser
- Git (optional, for version control)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```
   or
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the website

## 📚 Available Scripts

### Development
- `npm start` - Start development server
- `npm run dev` - Start development server with file watching
- `npm run serve` - Serve files using http-server

### Code Quality
- `npm run lint` - Run ESLint to check for code issues
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code using Prettier
- `npm run validate-html` - Validate HTML markup

### Build & Deploy
- `npm run build` - Build optimized version for production
- `npm run deploy` - Deploy to GitHub Pages
- `npm run minify-css` - Minify CSS files
- `npm run minify-js` - Minify JavaScript files
- `npm run optimize-images` - Optimize image files

## 🎨 Customization

### Personal Information
1. **Update HTML content** in `index.html`:
   - Customize content with specific information
   - Update contact details and social links
   - Add specific project descriptions and achievements

2. **Update CSS variables** in `css/style.css`:
   ```css
   :root {
     --primary-color: #2563eb;    /* Brand color */
     --accent-color: #10b981;     /* Accent color */
     --font-family: 'Inter', sans-serif; /* Typography */
   }
   ```

3. **Configure package.json**:
   - Update author information
   - Change repository URLs
   - Modify project description

### Adding New Sections
1. Add HTML markup for the new section
2. Style the section in CSS
3. Add any interactive behavior in JavaScript
4. Update navigation links

### Theme Customization
- Modify CSS custom properties for colors
- Update font selections in HTML and CSS
- Customize animations and transitions
- Add or modify responsive breakpoints

## 📱 Responsive Design

The website is built with a mobile-first approach and includes:

- **Desktop**: Full layout with all features (1200px+)
- **Tablet**: Optimized layout with adjusted spacing (768px-1199px)
- **Mobile**: Stacked layout with hamburger menu (320px-767px)

### Breakpoints
```css
/* Mobile First */
@media (max-width: 480px) { /* Mobile */ }
@media (max-width: 768px) { /* Small tablet */ }
@media (max-width: 1024px) { /* Tablet */ }
@media (min-width: 1200px) { /* Desktop */ }
```

## 🔧 Configuration

### Environment Setup
Create a `.env` file (optional) for environment-specific settings:
```bash
PORT=3000
NODE_ENV=development
```

### GitHub Pages Deployment
1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**:
   ```bash
   npm run deploy
   ```

3. **Configure GitHub Pages** in your repository settings to use the `gh-pages` branch

## 🌐 SEO & Performance

### SEO Features
- Meta descriptions and keywords
- Open Graph tags for social sharing
- Structured data markup
- Semantic HTML elements
- Proper heading hierarchy

### Performance Optimizations
- Minified CSS and JavaScript
- Optimized images
- Lazy loading for images
- Efficient CSS animations
- Reduced HTTP requests

### Accessibility
- WCAG 2.1 AA compliance
- Proper ARIA labels
- Keyboard navigation support
- Screen reader compatibility
- High contrast color ratios

## 🐛 Troubleshooting

### Common Issues

1. **Development server not starting**
   - Check if port 3000 is available
   - Verify Node.js and npm versions
   - Clear npm cache: `npm cache clean --force`

2. **Styles not loading**
   - Check file paths in HTML
   - Verify CSS syntax
   - Clear browser cache

3. **JavaScript not working**
   - Check browser console for errors
   - Verify script paths
   - Ensure DOM is loaded before script execution

4. **Deployment issues**
   - Check GitHub Pages settings
   - Verify build process completes successfully
   - Ensure all file paths are relative

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/portfolio-website/issues).

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For questions or collaboration opportunities:

- 📧 Email: bgside2368@gmail.com
- 💼 LinkedIn: [linkedin.com/in/bgside](https://linkedin.com/in/bgside)
- 🐙 GitHub: [github.com/bgside](https://github.com/bgside)

## 🙏 Acknowledgments

- [Inter Font](https://fonts.google.com/specimen/Inter) by Google Fonts
- Icons and emojis from various open-source projects
- Inspired by the hardware hacking and IT management community
- Built following modern web development best practices

---

**Crafted with passion for hardware hacking and IT excellence**

*Last updated: October 2024*
