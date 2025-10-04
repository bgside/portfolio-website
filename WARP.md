# Development Guide

This file provides guidance for developers working with this portfolio website codebase.

## Overview

This is a modern, responsive portfolio website for a Hardware Hacker & IT Manager built with vanilla HTML5, CSS3, and JavaScript. The project emphasizes performance, accessibility, and professional presentation with a focus on hardware hacking and IT management expertise.

## Essential Commands

### Development
```powershell
# Start development server with live reload
npm start
# or with file watching
npm run dev

# Alternative development server
npm run serve
```

### Code Quality & Validation
```powershell
# Lint JavaScript files
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format all code files
npm run format

# Validate HTML markup
npm run validate-html
```

### Build & Production
```powershell
# Build optimized production version
npm run build

# Individual build tasks
npm run minify-css
npm run minify-js
npm run optimize-images

# Deploy to GitHub Pages
npm run deploy
```

## Architecture Overview

### Project Structure
- **Static Site Architecture**: Single-page application with vanilla technologies
- **Mobile-First Design**: Responsive layouts with progressive enhancement
- **Component-Based CSS**: Organized stylesheets with CSS custom properties
- **Modern JavaScript**: ES6+ with modular patterns and utility functions

### Key Components

#### HTML Structure (`index.html`)
- Semantic HTML5 with accessibility features
- Single-page layout with scrollable sections:
  - Navigation with smooth scrolling
  - Hero section with animated elements
  - About, Skills, Projects, Experience, Contact sections
  - Footer with professional links

#### CSS Architecture (`css/style.css`)
- **CSS Custom Properties**: Centralized theming system with color, typography, and spacing variables
- **Modern Layout**: CSS Grid and Flexbox for responsive design
- **Component Organization**: Logical grouping (reset, utilities, navigation, sections)
- **Animation System**: CSS transitions and transforms for interactive elements
- **Responsive Breakpoints**: Mobile-first with tablet and desktop optimizations

#### JavaScript Functionality (`js/script.js`)
- **Controller Pattern**: NavbarController and AnimationController classes
- **Utility Functions**: Throttle, debounce, and DOM helpers
- **Interactive Features**:
  - Mobile hamburger menu with animations
  - Smooth scrolling navigation
  - Active section highlighting
  - Intersection Observer for scroll animations
  - Form validation and submission handling

### Development Dependencies
- **Live Server**: Development server with hot reload
- **ESLint**: Code linting with browser and ES2021 configuration
- **Prettier**: Code formatting with specific project preferences
- **Build Tools**: Terser (JS minification), CleanCSS (CSS optimization), ImageMin (image optimization)
- **Deployment**: GitHub Pages integration

## Development Guidelines

### Code Standards
- **JavaScript**: ES6+ syntax, prefer const/let over var, no console warnings
- **CSS**: Use CSS custom properties for theming, maintain mobile-first approach
- **HTML**: Semantic markup with proper ARIA labels for accessibility

### Styling Approach
- Modify CSS custom properties in `:root` for theme changes
- Use utility classes for common patterns
- Follow the established component naming convention
- Maintain responsive design principles with existing breakpoints

### JavaScript Patterns
- Use the established controller pattern for new features
- Implement throttling for scroll events and debouncing for user input
- Follow the modular structure with utility functions
- Use modern DOM APIs and avoid jQuery

### File Organization
- CSS organized by component sections (navigation, hero, about, etc.)
- JavaScript organized by functionality controllers
- Images and assets should be optimized before commit
- Maintain the flat directory structure for simplicity

### Performance Considerations
- All production assets are minified through build process
- Images are automatically optimized during build
- CSS and JS are structured to minimize render-blocking
- Intersection Observer is used for efficient scroll animations

### Content Customization
- Personal information is in HTML content sections
- Contact details and social links need updating in multiple locations
- Project descriptions and achievements are in structured HTML sections
- Theme colors are controlled via CSS custom properties in `:root`

### Browser Compatibility
- Targets modern browsers (> 1%, last 2 versions, not IE <= 11)
- Uses progressive enhancement for advanced features
- Fallbacks provided for older browsers where needed

### Deployment
- GitHub Pages deployment configured with `npm run deploy`
- Build process creates optimized `dist/` directory
- All paths are relative for proper hosting compatibility