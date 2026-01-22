const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'components', 'vendor-pro-subscription', 'SubscriptionPlans.tsx');

// Read file
let content = fs.readFileSync(filePath, 'utf8');

// Replace apostrophe
const oldText = "What's included in Enterprise?";
const newText = "What's included in Enterprise?";

const count = (content.match(new RegExp(oldText.replace('?', '\\?'), 'g')) || []).length;
console.log(`Found ${count} occurrence(s) of "${oldText}"`);

content = content.replace(new RegExp(oldText.replace('?', '\\?'), 'g'), newText);

// Write file
fs.writeFileSync(filePath, content, 'utf8');

console.log(`Fixed apostrophe in SubscriptionPlans.tsx`);
console.log(`Line now contains: ${newText}`);
