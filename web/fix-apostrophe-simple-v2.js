const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'components', 'vendor-pro-subscription', 'SubscriptionPlans.tsx');

// Read file
let content = fs.readFileSync(filePath, 'utf8');

// Replace apostrophe
const oldText = "What's included in Enterprise?";
const newText = "What's included in Enterprise?";

console.log(`Looking for: "${oldText}"`);
console.log(`Replacing with: "${newText}"`);

// Count occurrences
const count = (content.match(new RegExp(oldText.replace('?', '\\?'), 'g')) || []).length;
console.log(`Found ${count} occurrence(s)`);

content = content.replace(new RegExp(oldText.replace('?', '\\?'), 'g'), newText);

// Write file
fs.writeFileSync(filePath, content, 'utf8');

console.log('File written successfully');
console.log(`Line now contains: ${newText}`);
