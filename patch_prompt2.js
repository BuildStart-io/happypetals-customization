const fs = require('fs');
const file = 'supabase/functions/ai-chat/index.ts';
let code = fs.readFileSync(file, 'utf8');

const targetStr = `Calculate the total by taking the Base Price of the requested Teddy and adding the costs of the selected customizations (+400 for cloak, +100 for name, +2100 for stethoscope, etc.). Show the calculation to the user.`;

const replacementStr = `Calculate the total by taking the Base Price of the requested Teddy and adding the costs of the selected customizations (+400 for cloak, +100 for name, +2100 for stethoscope, etc.). Show the calculation to the user.
  - IMPORTANT TEDDY RULES you must enforce and inform the customer about:
    1. PAYMENT: Graduation Teddies must be paid for via BANK TRANSFER to confirm the order. Cash on Delivery (COD) is strictly NOT available because the teddies are uniquely customized and cannot be resold. Do NOT offer COD for teddies.
    2. PHOTOS: Flower bouquets shown in some teddy photos are NOT included in the teddy price. Custom flower bouquets start from Rs. 1,800 onwards.
    3. ADD-ONS: We also sell Graduation Mugs (Rs. 1000/=) and Graduation Notebooks/Cards (Rs. 150/=).`;

code = code.replace(targetStr, replacementStr);
fs.writeFileSync(file, code);
