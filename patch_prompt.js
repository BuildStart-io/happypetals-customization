const fs = require('fs');
const file = 'supabase/functions/ai-chat/index.ts';
let code = fs.readFileSync(file, 'utf8');

const targetStr = `- HAPPY PETALS SPECIFIC FLOW:
  - If the user asks about "Graduation Teddies", send them EXACTLY this message to collect customization details:
    "ඔබට අවශ්ය විදියටම ටෙඩී customize  කර සාදාගැනීමට පහත විස්තර පුරවා  එවන්න
    Kindly fill out and send back the same.

    • Teddy colour -
    • shirt colour -
    • cloak colour(+400)(only if needed)
    • shirt border ribon colour _
    • galand colour -
    • hood /sash colour-
    • hat colour -
    • ribbon colour on hat-
    • tasal colour -
    • graduate's name(+100)-
    • Name on hat or shrit ??-
    • Scroll colour-
    • scroll lines (gold /silver)-
    • Name on scroll -
         (short +100/full +200)

    • Book colour(+100)-
    • print on book(+100)
    • Flowers hat(+100)
    • hat bow(+50)
    • Logo image
    • logo on book or garland??
          logo(+100)

    • other
    Spectacle (+400)
    Stethoscope (+2100)

    Delivery location and date"
  - After the user provides the teddy customization details, YOU MUST CALCULATE the final price by taking the base price of a Teddy and adding the costs of the selected customizations (+400 for cloak, +100 for name, etc.) and give the user the final price.
  - If the user asks about "Fresh Flower Bouquets" or "Fresh Flowers", send them EXACTLY this message:
    "🌹🌹🌹🌺🌺🌺
    අප සතුව (fresh flowers ) විශාල නිර්මාණ එකතුවක් ඇති බැවින්, ඔබේ අවශ්යතාවයට වඩාත් ගැලපෙන  Photos එවීම සඳහා කරුණාකර ඔබ කැමති මිල පරාසය (Budget range) සඳහන් කරන්න

    As we have a wide range of designs, please select your preferred budget range. so we can send you the most suitable photos:
      
    🌸 Fresh Flowers

     📌 1500 - 4000 
     📌 4000 - 6000 
     📌 6000 and above

    Delivery Information
    Delivery is available within the Colombo district"
  - When the user selects a budget range for fresh flowers, provide them with the corresponding PDF link and include it natively as a URL in your response (so WhatsApp renders it):
    \${freshFlowersPdfs[0] ? \`- For 1500 - 4000: \${freshFlowersPdfs[0]}\` : ""}
    \${freshFlowersPdfs[1] ? \`- For 4000 - 6000: \${freshFlowersPdfs[1]}\` : ""}
    \${freshFlowersPdfs[2] ? \`- For 6000 and above: \${freshFlowersPdfs[2]}\` : ""}`;

const replacementStr = `- HAPPY PETALS SPECIFIC FLOW:
  - If the user asks about "Graduation Teddies", send them EXACTLY this message to collect customization details:
    "ඔබට අවශ්‍ය විදියටම ටෙඩී customize කර සාදාගැනීමට පහත විස්තර පුරවා එවන්න 🌸
    Kindly fill out and send back this form so we can customize your teddy perfectly! 🧸✨

    • 🧸 Teddy Colour:
    • 👕 Shirt Colour:
    • 🎓 Cloak Colour (+400 if needed):
    • 🎀 Shirt Border Ribbon Colour:
    • 🌺 Garland Colour:
    • 🧣 Hood / Sash Colour:
    • 🎓 Hat Colour:
    • 🎗️ Ribbon Colour on Hat:
    • 🧶 Tassel Colour:
    • 🎓 Graduate's Name (+100):
    • 🎓 Name on Hat or Shirt?:
    • 📜 Scroll Colour:
    • ✨ Scroll Lines (Gold/Silver):
    • 📜 Name on Scroll (Short +100 / Full +200):
    • 📖 Book Colour (+100):
    • 🖨️ Print on Book (+100):
    • 🌸 Flowers on Hat (+100):
    • 🎀 Hat Bow (+50):
    • 🖼️ Logo Image (Yes/No):
    • 🎓 Logo on Book or Garland? (+100):
    • 👓 Spectacles (+400):
    • 🩺 Stethoscope (+2100):

    • 📍 Delivery Location:
    • 🗓️ Delivery Date:"
  - After the user provides the teddy customization details, YOU MUST CALCULATE the final price.
    TEDDY BASE PRICES:
    - 11 inch Golden Brown: LKR 2500/=
    - 11 inch other colours (Brown, peach, white, yellow, pink, orange): LKR 2100/=
    - 7 inch other colours (Brown, peach, white, yellow, pink, orange): LKR 1500/=
    Calculate the total by taking the Base Price of the requested Teddy and adding the costs of the selected customizations (+400 for cloak, +100 for name, +2100 for stethoscope, etc.). Show the calculation to the user.
  - If the user asks about "Fresh Flower Bouquets" or "Fresh Flowers", send them EXACTLY this message:
    "🌹🌹🌹🌺🌺🌺
    අප සතුව (fresh flowers) විශාල නිර්මාණ එකතුවක් ඇති බැවින්, ඔබේ අවශ්‍යතාවයට වඩාත් ගැලපෙන Photos එවීම සඳහා කරුණාකර ඔබ කැමති මිල පරාසය (Budget range) සඳහන් කරන්න 🌸

    As we have a wide range of beautiful designs, please select your preferred budget range so we can send you the most suitable photos! 💐

    🌸 Fresh Flowers:
    📌 1500 - 4000 
    📌 4000 - 6000 
    📌 6000 and above"
  - When the user selects a budget range for fresh flowers, provide them with the corresponding PDF link below natively as a URL (so WhatsApp renders it):
    \${freshFlowersPdfs[0] ? \`- 1500 - 4000 Range: \${freshFlowersPdfs[0]}\` : ""}
    \${freshFlowersPdfs[1] ? \`- 4000 - 6000 Range: \${freshFlowersPdfs[1]}\` : ""}
    \${freshFlowersPdfs[2] ? \`- 6000 and above Range: \${freshFlowersPdfs[2]}\` : ""}
    AND ALSO append EXACTLY this delivery/flower note right after the PDF link:
    "1500 to 10,000/= fresh flowers photos / prices (pdf) 👆

    🌸 *Note on our Chrysanthemums:* 🌸
    Please note that since we work with fresh, natural flowers, occasionally the natural tone or the shape of the petals of Chrysanthemums may vary slightly from one farm to another. If you pick a Purple bouquet, we will always use Purple Chrysanthemums, but the natural look might be slightly different from the photo sometimes. We always ensure to provide the freshest blooms for your bouquet! 💐🌸

    🚚🛺🛵 *Delivery details* 
    📍 🌹🍰 Fresh Flowers & Cakes can be delivered only within Colombo district and selected areas of Gampaha district.
    *Fresh flowers සහ cake කොළඹ දිස්ත්‍රික්කයේ සහ ගම්පහ දිස්ත්‍රික්කයේ තෝරාගත් ප්‍රදේශ වලට පමණක් ඩිලිවරි කරනු ලැබේ*

    📍🍫👀💐🥡 ISLAND WIDE delivery available for Teddies, graduation teddies, artificial flowers & chocolates.
    *Teddies, artificial flower bouquets, chocolate සඳහා දිවයින පුරා බෙදාහැරීමේ පහසුකම ඇත*"`;

code = code.replace(targetStr, replacementStr);
fs.writeFileSync(file, code);
