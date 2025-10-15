# Quick Portfolio Project Addition Script
# Simplified interface for adding networking projects to portfolio

Write-Host "🚀 Adding New Networking Project to Portfolio" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan

# Collect project information interactively
$projectName = Read-Host "Enter Project Name"
$projectDescription = Read-Host "Enter Project Description (2-3 sentences)"
$githubRepo = Read-Host "Enter GitHub Repository Name (without .git)"

Write-Host "`nSelect Technologies (comma-separated):" -ForegroundColor Yellow
Write-Host "Examples: Python, Flask, Scapy, Redis, Docker, SNMP, SSH, Linux, etc."
$techInput = Read-Host "Technologies"
$technologies = $techInput.Split(',') | ForEach-Object { $_.Trim() }

Write-Host "`nEnter 4 Key Features:" -ForegroundColor Yellow
$features = @()
for ($i = 1; $i -le 4; $i++) {
    $feature = Read-Host "Feature $i"
    $features += $feature
}

Write-Host "`nSelect Categories (space-separated):" -ForegroundColor Yellow
Write-Host "Options: networking, security, monitoring, automation, analytics"
$categoryInput = Read-Host "Categories"
$categories = $categoryInput.Split(' ') | ForEach-Object { $_.Trim() }

Write-Host "`nSelect Icon:" -ForegroundColor Yellow
Write-Host "1. Network (fas fa-network-wired)"
Write-Host "2. Security (fas fa-shield-alt)" 
Write-Host "3. Monitoring (fas fa-chart-line)"
Write-Host "4. Automation (fas fa-cogs)"
Write-Host "5. Analytics (fas fa-brain)"
Write-Host "6. Custom (enter your own)"

$iconChoice = Read-Host "Icon choice (1-6)"
$icon = switch ($iconChoice) {
    "1" { "fas fa-network-wired" }
    "2" { "fas fa-shield-alt" }
    "3" { "fas fa-chart-line" }
    "4" { "fas fa-cogs" }
    "5" { "fas fa-brain" }
    "6" { Read-Host "Enter custom FontAwesome icon class" }
    default { "fas fa-network-wired" }
}

Write-Host "`nSelect Badges:" -ForegroundColor Yellow
Write-Host "1. Production Ready"
Write-Host "2. Production Ready + Featured"
Write-Host "3. Production Ready + AI Powered"
Write-Host "4. Production Ready + Security Focus"
Write-Host "5. Custom combination"

$badgeChoice = Read-Host "Badge choice (1-5)"
$badges = switch ($badgeChoice) {
    "1" { @("Production Ready") }
    "2" { @("Production Ready", "Featured") }
    "3" { @("Production Ready", "AI Powered") }
    "4" { @("Production Ready", "Security Focus") }
    "5" { 
        $customBadges = Read-Host "Enter badges (comma-separated)"
        $customBadges.Split(',') | ForEach-Object { $_.Trim() }
    }
    default { @("Production Ready") }
}

$linesOfCode = Read-Host "Estimated Lines of Code (press Enter for auto-estimate based on complexity)"
if ([string]::IsNullOrEmpty($linesOfCode)) {
    # Auto-estimate based on technologies and features
    $baseLines = 2000
    $techMultiplier = [Math]::Min($technologies.Count * 200, 1000)
    $featureMultiplier = $features.Count * 300
    $linesOfCode = $baseLines + $techMultiplier + $featureMultiplier
}

$liveDemoUrl = Read-Host "Live Demo URL (press Enter for placeholder)"
if ([string]::IsNullOrEmpty($liveDemoUrl)) {
    $liveDemoUrl = "#"
}

# Confirmation
Write-Host "`n📋 Project Summary:" -ForegroundColor Green
Write-Host "Name: $projectName"
Write-Host "Description: $projectDescription"
Write-Host "Repository: $githubRepo"
Write-Host "Technologies: $($technologies -join ', ')"
Write-Host "Features: $($features -join ', ')"
Write-Host "Categories: $($categories -join ', ')"
Write-Host "Icon: $icon"
Write-Host "Badges: $($badges -join ', ')"
Write-Host "Lines of Code: $linesOfCode"
Write-Host "Live Demo: $liveDemoUrl"

$confirm = Read-Host "`nProceed with adding this project? (Y/n)"
if ($confirm -eq 'n' -or $confirm -eq 'N') {
    Write-Host "❌ Project addition cancelled" -ForegroundColor Red
    exit
}

# Execute the main update script
$updateScriptPath = Join-Path $PSScriptRoot "update-portfolio.ps1"
if (Test-Path $updateScriptPath) {
    & $updateScriptPath -ProjectName $projectName -ProjectDescription $projectDescription -GitHubRepo $githubRepo -Technologies $technologies -Features $features -Categories $categories -Icon $icon -Badges $badges -LinesOfCode ([int]$linesOfCode) -LiveDemoUrl $liveDemoUrl
} else {
    Write-Host "❌ Update script not found at $updateScriptPath" -ForegroundColor Red
}

Write-Host "`n💡 Quick tip: You can also call the update script directly:" -ForegroundColor Blue
Write-Host ".\update-portfolio.ps1 -ProjectName '$projectName' -ProjectDescription '$projectDescription' -GitHubRepo '$githubRepo' -Technologies @('$($technologies -join "','")') -Features @('$($features -join "','")') -Categories @('$($categories -join "','")') -Icon '$icon' -Badges @('$($badges -join "','")') -LinesOfCode $linesOfCode -LiveDemoUrl '$liveDemoUrl'" -ForegroundColor Gray