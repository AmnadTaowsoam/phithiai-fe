@echo off
setlocal enabledelayedexpansion

set "file=components\vendor-pro-subscription\SubscriptionPlans.tsx"
set "old=What's included in Enterprise?"
set "new=What's included in Enterprise?"

powershell -Command "(Get-Content '%file%' -Raw) -replace [regex]::Escape('%old%'), '%new%' | Set-Content '%file%' -NoNewline"

echo Fixed apostrophe in SubscriptionPlans.tsx
echo Line now contains: %new%
