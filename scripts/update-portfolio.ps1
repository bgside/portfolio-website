# Portfolio Update Automation Script
# Automatically updates the projects.html page with new networking projects

param(
    [Parameter(Mandatory=$true)]
    [string]$ProjectName,
    
    [Parameter(Mandatory=$true)]
    [string]$ProjectDescription,
    
    [Parameter(Mandatory=$true)]
    [string]$GitHubRepo,
    
    [Parameter(Mandatory=$true)]
    [string[]]$Technologies,
    
    [Parameter(Mandatory=$true)]
    [string[]]$Features,
    
    [Parameter(Mandatory=$true)]
    [string[]]$Categories,
    
    [Parameter(Mandatory=$false)]
    [string]$Icon = "fas fa-network-wired",
    
    [Parameter(Mandatory=$false)]
    [string[]]$Badges = @("Production Ready"),
    
    [Parameter(Mandatory=$false)]
    [int]$LinesOfCode = 2000,
    
    [Parameter(Mandatory=$false)]
    [string]$LiveDemoUrl = "#"
)

# Configuration
$portfolioPath = "D:\github-projects\portfolio-website"
$projectsHtmlPath = "$portfolioPath\projects.html"
$backupPath = "$portfolioPath\backups"

# Ensure backup directory exists
if (!(Test-Path $backupPath)) {
    New-Item -ItemType Directory -Path $backupPath -Force
}

# Create backup of current projects.html
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
Copy-Item $projectsHtmlPath "$backupPath\projects_backup_$timestamp.html"

Write-Host "🔄 Updating portfolio with new project: $ProjectName" -ForegroundColor Cyan

try {
    # Read the current projects.html content
    $htmlContent = Get-Content $projectsHtmlPath -Raw
    
    # Generate project card HTML
    $categoryString = $Categories -join " "
    $badgeHtml = ""
    foreach ($badge in $Badges) {
        $badgeClass = switch ($badge) {
            "Production Ready" { "production" }
            "Featured" { "featured" }
            "AI Powered" { "ai" }
            "Security Focus" { "security" }
            default { "production" }
        }
        $badgeHtml += "`n                            <span class=`"badge $badgeClass`">$badge</span>"
    }
    
    $featuresHtml = ""
    for ($i = 0; $i -lt [Math]::Min(4, $Features.Length); $i++) {
        $featureIcon = switch ($i) {
            0 { "fas fa-star" }
            1 { "fas fa-cog" }
            2 { "fas fa-chart-line" }
            3 { "fas fa-shield-alt" }
            default { "fas fa-check" }
        }
        $featuresHtml += "`n                            <div class=`"feature`">`n                                <i class=`"$featureIcon`"></i>`n                                <span>$($Features[$i])</span>`n                            </div>"
    }
    
    $techTagsHtml = ""
    foreach ($tech in $Technologies) {
        $techTagsHtml += "`n                            <span class=`"tech-tag`">$tech</span>"
    }
    
    $projectCardHtml = @"

                <!-- $ProjectName -->
                <div class="project-card-detailed" data-category="$categoryString">
                    <div class="project-header">
                        <div class="project-icon">
                            <i class="$Icon"></i>
                        </div>
                        <div class="project-badges">$badgeHtml
                        </div>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">$ProjectName</h3>
                        <p class="project-description">
                            $ProjectDescription
                        </p>
                        <div class="project-features">$featuresHtml
                        </div>
                        <div class="project-tech">$techTagsHtml
                        </div>
                        <div class="project-stats">
                            <div class="stat">
                                <i class="fas fa-code"></i>
                                <span>$($LinesOfCode.ToString("#,0"))+ Lines</span>
                            </div>
                            <div class="stat">
                                <i class="fas fa-star"></i>
                                <span>Enterprise Grade</span>
                            </div>
                        </div>
                        <div class="project-actions">
                            <a href="https://github.com/bgside/$GitHubRepo" 
                               class="btn btn-primary" target="_blank">
                                <i class="fab fa-github"></i>
                                View Code
                            </a>
                            <a href="$LiveDemoUrl" class="btn btn-secondary" target="_blank">
                                <i class="fas fa-external-link-alt"></i>
                                Live Demo
                            </a>
                        </div>
                    </div>
                </div>
"@

    # Find the insertion point (before the closing </div></div></section> of projects-grid)
    $insertionPattern = '(\s*</div>\s*</div>\s*</section>\s*<!--\s*Technology Stack\s*-->)'
    
    if ($htmlContent -match $insertionPattern) {
        $htmlContent = $htmlContent -replace $insertionPattern, "$projectCardHtml`n`n$1"
        Write-Host "✅ Project card added successfully" -ForegroundColor Green
    } else {
        Write-Host "❌ Could not find insertion point in HTML" -ForegroundColor Red
        return
    }
    
    # Update project statistics
    $currentProjects = [regex]::Matches($htmlContent, '<div class="project-card-detailed"').Count
    $htmlContent = $htmlContent -replace '(\s*<span class="stat-number">)\d+\+(\s*</span>\s*<span class="stat-label">Projects Built</span>)', "`$1$currentProjects+`$2"
    
    # Update lines of code estimate (rough calculation)
    $totalLines = $currentProjects * 3000  # Average 3000 lines per project
    $htmlContent = $htmlContent -replace '(\s*<span class="stat-number">)[\d,]+\+(\s*</span>\s*<span class="stat-label">Lines of Code</span>)', "`$1$($totalLines.ToString("#,0"))+`$2"
    
    # Write updated content back to file
    $htmlContent | Out-File -FilePath $projectsHtmlPath -Encoding UTF8
    
    Write-Host "🎉 Portfolio successfully updated!" -ForegroundColor Green
    Write-Host "📊 Statistics updated: $currentProjects projects, $($totalLines.ToString("#,0"))+ lines of code" -ForegroundColor Cyan
    Write-Host "🔗 GitHub Repository: https://github.com/bgside/$GitHubRepo" -ForegroundColor Blue
    
    # Optional: Open the projects page in browser
    $openBrowser = Read-Host "Open updated projects page in browser? (y/N)"
    if ($openBrowser -eq 'y' -or $openBrowser -eq 'Y') {
        Start-Process $projectsHtmlPath
    }
    
} catch {
    Write-Host "❌ Error updating portfolio: $($_.Exception.Message)" -ForegroundColor Red
    
    # Restore backup
    Write-Host "🔄 Restoring backup..." -ForegroundColor Yellow
    Copy-Item "$backupPath\projects_backup_$timestamp.html" $projectsHtmlPath
    Write-Host "✅ Backup restored" -ForegroundColor Green
}

Write-Host "`n📝 Portfolio update completed successfully!" -ForegroundColor Yellow
