# Fix apostrophe in SubscriptionPlans.tsx
$file = "components\vendor-pro-subscription\SubscriptionPlans.tsx"
$content = Get-Content $file -Raw
$content = $content -replace "What's included in Enterprise?", "What's included in Enterprise?"
$content | Set-Content $file -NoNewline
Write-Host "Fixed apostrophe in SubscriptionPlans.tsx"
