# Manual Project Addition Workflow

## Step-by-Step Process

After completing each networking project, follow these steps to add it to your portfolio:

### 1. Gather Project Information

Before adding to portfolio, collect:
- **Project Name**: Clear, professional name
- **Description**: 2-3 sentences highlighting enterprise value
- **GitHub Repository**: Repository name (e.g., "network-security-scanner")
- **Technologies Used**: List of main technologies
- **Key Features**: 4 main features/capabilities
- **Categories**: networking, security, monitoring, automation, analytics
- **Lines of Code**: Rough estimate
- **Live Demo URL**: If available, otherwise use "#"

### 2. Create Project Card HTML

Use this template and replace the placeholders:

```html
<!-- PROJECT_NAME -->
<div class="project-card-detailed" data-category="CATEGORIES_SPACE_SEPARATED">
    <div class="project-header">
        <div class="project-icon">
            <i class="ICON_CLASS"></i>
        </div>
        <div class="project-badges">
            <span class="badge production">Production Ready</span>
            <!-- Add more badges if needed -->
        </div>
    </div>
    <div class="project-content">
        <h3 class="project-title">PROJECT_NAME</h3>
        <p class="project-description">
            PROJECT_DESCRIPTION
        </p>
        <div class="project-features">
            <div class="feature">
                <i class="fas fa-star"></i>
                <span>FEATURE_1</span>
            </div>
            <div class="feature">
                <i class="fas fa-cog"></i>
                <span>FEATURE_2</span>
            </div>
            <div class="feature">
                <i class="fas fa-chart-line"></i>
                <span>FEATURE_3</span>
            </div>
            <div class="feature">
                <i class="fas fa-shield-alt"></i>
                <span>FEATURE_4</span>
            </div>
        </div>
        <div class="project-tech">
            <span class="tech-tag">TECH_1</span>
            <span class="tech-tag">TECH_2</span>
            <span class="tech-tag">TECH_3</span>
            <!-- Add more as needed -->
        </div>
        <div class="project-stats">
            <div class="stat">
                <i class="fas fa-code"></i>
                <span>LINES_OF_CODE+ Lines</span>
            </div>
            <div class="stat">
                <i class="fas fa-star"></i>
                <span>Enterprise Grade</span>
            </div>
        </div>
        <div class="project-actions">
            <a href="https://github.com/bgside/GITHUB_REPO" 
               class="btn btn-primary" target="_blank">
                <i class="fab fa-github"></i>
                View Code
            </a>
            <a href="LIVE_DEMO_URL" class="btn btn-secondary" target="_blank">
                <i class="fas fa-external-link-alt"></i>
                Live Demo
            </a>
        </div>
    </div>
</div>
```

### 3. Add to projects.html

1. Open `D:\github-projects\portfolio-website\projects.html`
2. Find the closing `</div></div></section>` before the `<!-- Technology Stack -->` comment
3. Add the new project card HTML **before** that closing section
4. Update the project count in the statistics section (search for "Projects Built")

### 4. Update Statistics

Update these numbers in the hero section:
- **Projects Built**: Count the number of `project-card-detailed` divs
- **Lines of Code**: Add the new project's lines to the total

### 5. Commit Changes

```bash
git add .
git commit -m "Add [PROJECT_NAME] to portfolio"
git push origin main
```

## Icon Reference

Common icons for networking projects:
- **Networking**: `fas fa-network-wired`
- **Security**: `fas fa-shield-alt`
- **Monitoring**: `fas fa-chart-line`
- **Automation**: `fas fa-cogs`
- **Analytics**: `fas fa-brain`
- **Topology**: `fas fa-sitemap`
- **Database**: `fas fa-database`
- **API**: `fas fa-plug`

## Badge Options

Available badge types:
- `production`: Green "Production Ready"
- `featured`: Orange "Featured"
- `ai`: Purple "AI Powered"
- `security`: Red "Security Focus"

## Categories

Use space-separated categories:
- `networking`
- `security`  
- `monitoring`
- `automation`
- `analytics`

Example: `data-category="networking security"`

## Example Project Addition

Here's how we'll add the Network Security Scanner that we already built:

**Project Info:**
- Name: Network Security Scanner
- Repo: network-security-scanner
- Categories: security networking
- Icon: fas fa-shield-alt
- Features: Vulnerability Assessment, SSL/TLS Analysis, Professional Reports, Compliance Scanning

This manual approach gives you full control over what gets added and when, ensuring each project is properly represented in your portfolio.