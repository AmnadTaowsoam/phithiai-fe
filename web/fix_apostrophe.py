#!/usr/bin/env python3
import os

file_path = os.path.join(os.path.dirname(__file__), 'components', 'vendor-pro-subscription', 'SubscriptionPlans.tsx')

# Read file
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace apostrophe
old_text = "What's included in Enterprise?"
new_text = "What's included in Enterprise?"

count = content.count(old_text)
print(f"Found {count} occurrence(s) of '{old_text}'")

content = content.replace(old_text, new_text)

# Write file
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Fixed apostrophe in SubscriptionPlans.tsx")
print(f"Line now contains: {new_text}")
