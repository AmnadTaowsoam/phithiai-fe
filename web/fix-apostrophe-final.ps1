# Fix apostrophe in SubscriptionPlans.tsx - Final attempt
$filePath = "components\vendor-pro-subscription\SubscriptionPlans.tsx"
$tempFile = "components\vendor-pro-subscription\SubscriptionPlans.tsx.tmp"

# Read file content
$content = Get-Content $filePath -Raw -Encoding UTF8

# Replace the apostrophe
$content = $content -replace "What's included in Enterprise\?", "What's included in Enterprise?"

# Write to temp file
$content | Set-Content $tempFile -NoNewline -Encoding UTF8

# Replace original file
Remove-Item $filePath
Rename-Item $tempFile $filePath

Write-Host "Fixed apostrophe in SubscriptionPlans.tsx"
Write-Host "Line 544 now contains: What's included in Enterprise?"
