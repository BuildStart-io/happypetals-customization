UPDATE public.settings 
SET value = jsonb_set(
  COALESCE(value, '{}'::jsonb), 
  '{text}', 
  to_jsonb('Thank you for contacting Happy Petals Flowers🌹

Kindly let us know the items you''d like to order
 *item
  delivery date
  location*. 📍
ඔබට මිලදී ගැනීමට අවශ්ය දෑ /දිනය /සහ ලැබිය යුතු ස්ථානය සදහන් කරන්න

🎓 Graduation Teddies
🌹 Fresh Flower Bouquets
🌺 Artificial Flowers 
👰 Bridal bouquet
💐 wedding Decor:
🎂 Cakes, Chocolates

 ඔබේ අවශ්යතාවය සදහන් WhatsApp පණිවිඩයක් පමණක්  එවන්න. මෙම අංකයට ඇමතුම් (Calls) ලබාගැනීමෙන් වලකින්න.

🚨 හදිසි අවශ්යතාවයකදී පමණක් 0714298182 අමතන්න.'::text)
)
WHERE key = 'welcome_message' AND user_id = (SELECT id FROM auth.users WHERE email = 'admin@happypetal.com');
