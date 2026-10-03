const fs = require('fs');
const path = require('path');

const functionsDir = '/home/anuhas/programming/happypetals-customization/supabase/functions';
const schemaName = 'happypetal_customization';

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Standard createClient injection
  content = content.replace(/createClient\((SUPABASE_URL|supabaseUrl|Deno\.env\.get[^,]+),\s*(SUPABASE_ANON_KEY|SERVICE_KEY|supabaseServiceKey|supabaseAnonKey|serviceKey)\)/g, 
    `createClient($1, $2, { db: { schema: '${schemaName}' } })`);

  // 2. Complex config injection
  const complexRegex = /createClient\(([^,]+),\s*([^,]+),\s*\{\s*global:\s*\{\s*headers:\s*\{\s*Authorization:\s*authHeader\s*\}\s*\}\s*\}\)/g;
  content = content.replace(complexRegex, 
    `createClient($1, $2, { global: { headers: { Authorization: authHeader } }, db: { schema: '${schemaName}' } })`);

  // 3. send-push
  const sendPushRegex = /createClient\(\s*Deno\.env\.get\("SUPABASE_URL"\)!,\s*Deno\.env\.get\("SUPABASE_SERVICE_ROLE_KEY"\)!\s*\)/g;
  content = content.replace(sendPushRegex, `createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { db: { schema: '${schemaName}' } })`);
  
  // 4. register-device
  const regDeviceRegex = /createClient\(\s*Deno\.env\.get\("SUPABASE_URL"\)!,\s*Deno\.env\.get\("SUPABASE_ANON_KEY"\)!\s*\)/g;
  content = content.replace(regDeviceRegex, `createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, { db: { schema: '${schemaName}' } })`);

  // 5. wsender-sessions-happypetal webhook fix
  if (filePath.includes('wsender-sessions-happypetal')) {
    const webhookRegex = /const webhookUrl = Deno\.env\.get\("WEBHOOK_URL_OVERRIDE"\) \|\| `\$\{supabaseUrl\}\/functions\/v1\/webhook-wsender-happypetal`;/g;
    content = content.replace(webhookRegex, `let override = Deno.env.get("WEBHOOK_URL_OVERRIDE");\n    if (override && !override.includes("-happypetal")) {\n      override = override.replace("webhook-wsender", "webhook-wsender-happypetal");\n    }\n    const webhookUrl = override || \`\$\{supabaseUrl\}/functions/v1/webhook-wsender-happypetal\`;`);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log('Fixed:', filePath);
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'main') continue; // skip main router
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (file === 'index.ts' || file.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

walk(functionsDir);
