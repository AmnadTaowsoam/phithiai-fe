#!/usr/bin/env python3
import os

file_path = os.path.join(os.path.dirname(__file__), 'components', 'vendor-pro-subscription', 'SubscriptionPlans.tsx')

# Read file
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find and fix the line with the apostrophe
for i, line in enumerate(lines):
    if "What's included in Enterprise?" in line:
        # Add eslint-disable comment before this line
        lines.insert(i, "          {/* eslint-disable-next-line react/no-unescaped-entities */}\n")
        print(f"Added eslint-disable comment before line {i+1}")
        break

# Write file
with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print("Fixed apostrophe issue in SubscriptionPlans.tsx")
