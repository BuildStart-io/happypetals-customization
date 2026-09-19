# Happy Petals - Customizations

This repository contains the specific customisations and features implemented for the **Happy Petals** business WhatsApp chatbot, built on top of the BuildStart.io platform.

## 1. Chatbot System Prompt Overhauls (`ai-chat`)

The `ai-chat` edge function has been heavily customized to handle Happy Petals specific flows:

### 🧸 Graduation Teddies Logic
* **Dynamic Pricing Engine**: The AI is programmed with the exact base pricing for Graduation Teddies (11-inch Golden Brown vs other colors, and 7-inch variants).
* **Add-on Calculator**: When a customer submits a customization form (e.g. +Stethoscope, +Cloak, +Spectacles), the AI automatically calculates and outputs the final augmented price.
* **Strict Payment Rules**: The AI enforces that Graduation Teddies must be paid via **Bank Transfer only**. It will actively deny Cash on Delivery (COD) for these items.
* **Photo Clarifications**: The AI clarifies that flower bouquets shown in teddy photos are not included in the base price and start at Rs. 1,800.

### 🌸 Fresh Flowers Flow
* **Budget Selection**: When customers ask about fresh flowers, the AI prompts them to pick a budget range (1500-4000, 4000-6000, 6000+).
* **Dynamic PDF Delivery**: Based on the budget selected, the AI natively attaches the corresponding catalog PDF uploaded by the admin.
* **Chrysanthemum Notes**: The AI appends a friendly, automated note regarding the natural variations in Chrysanthemum petals.

### ✨ Tone & Formatting
* The entire AI personality has been updated to be highly professional, friendly, and heavily utilize flower emojis (🌸, 💐, 🌹).
* Forms sent to customers are neatly formatted with emojis for better readability on WhatsApp.

## 2. Admin Dashboard Customizations (`frontend/`)

* **Fresh Flowers PDF Uploader**: The `Settings > Chatbot` tab now features a dedicated upload widget that allows admins to upload three distinct PDFs corresponding to the fresh flower budget ranges. These are instantly synced to the database and utilized by the AI.
* **Dark Mode Toggle**: Integrated `next-themes` to add a sleek Dark/Light mode toggle directly into the desktop sidebar and mobile header, providing a better viewing experience.
* **Welcome Message Injection**: The default welcome message was customized out-of-the-box to present the Happy Petals catalog menu to first-time customers.

## 3. Infrastructure & Networking (`docker/`)

* **Internal WAHA Networking**: Previously, the WhatsApp engine (WAHA) relied on external Cloudflare tunnel webhooks which could cause sessions to fail (`ENOTFOUND`). WAHA has now been fully integrated into the internal `docker-compose.override.yml` network. 
* **Stable Webhooks**: Edge functions now securely communicate with WAHA using internal routing (`http://api-gw:8000`), ensuring WhatsApp sessions remain stable and QR codes generate instantly.
