const fs = require('fs');
const file = 'supabase/functions/ai-chat/index.ts';
let code = fs.readFileSync(file, 'utf8');

const targetStr = `Offer both Cash on Delivery (COD) and Bank Transfer as payment options.`;
const replacementStr = `Offer both Cash on Delivery (COD) and Bank Transfer as payment options, EXCEPT for Graduation Teddies (which are strictly Bank Transfer only).`;

code = code.replace(targetStr, replacementStr);
fs.writeFileSync(file, code);
