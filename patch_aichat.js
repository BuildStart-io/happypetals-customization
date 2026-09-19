const fs = require('fs');
const file = 'supabase/functions/ai-chat/index.ts';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  'const freeDeliveryThreshold = deliverySettings.free_delivery_threshold || 0;',
  'const freeDeliveryThreshold = deliverySettings.free_delivery_threshold || 0;\n    const freshFlowersPdfs = settings.find(s => s.key === "fresh_flowers_pdfs")?.value?.urls || [];'
);

const hardcodedLinks = `- For 1500 - 4000: https://storage.buildstart.io/happypetals/fresh-flowers-1500-4000.pdf
    - For 4000 - 6000: https://storage.buildstart.io/happypetals/fresh-flowers-4000-6000.pdf
    - For 6000 and above: https://storage.buildstart.io/happypetals/fresh-flowers-6000-above.pdf`;

const dynamicLinks = `\${freshFlowersPdfs[0] ? \`- For 1500 - 4000: \${freshFlowersPdfs[0]}\` : ""}
    \${freshFlowersPdfs[1] ? \`- For 4000 - 6000: \${freshFlowersPdfs[1]}\` : ""}
    \${freshFlowersPdfs[2] ? \`- For 6000 and above: \${freshFlowersPdfs[2]}\` : ""}`;

code = code.replace(hardcodedLinks, dynamicLinks);

fs.writeFileSync(file, code);
