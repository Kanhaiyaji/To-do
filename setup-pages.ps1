# GitHub Pages Setup Script
# This script configures GitHub Pages to serve from the /dist directory

param(
    [string]$Token
)

if (-not $Token) {
    $Token = Read-Host "Enter your GitHub personal access token"
}

$owner = "Kanhaiyaji"
$repo = "To-do"
$headers = @{
    "Authorization" = "token $Token"
    "Accept" = "application/vnd.github.v3+json"
}

$body = @{
    source = @{
        branch = "main"
        path   = "/dist"
    }
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod `
        -Uri "https://api.github.com/repos/$owner/$repo/pages" `
        -Method POST `
        -Headers $headers `
        -Body $body `
        -ContentType "application/json"
    
    Write-Host "✅ GitHub Pages configured successfully!" -ForegroundColor Green
    Write-Host "Your site will be available at: https://$owner.github.io/$repo/" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "It may take 1-2 minutes for the site to go live."
}
catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Response: $($_.Exception.Response.StatusCode)"
}
