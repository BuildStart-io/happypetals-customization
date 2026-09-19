# Database & Edge Function Migration Summary
**Customization:** Happy Petals

## 1. Database Schema Changes
A completely isolated database schema was created specifically for the Happy Petals customization to prevent any conflicts with the default `public` schema.

### Isolated Schema
- **New Schema Name**: `happypetal_customization`
- **Migration Scripts**: 
  - `db/04_happypetal_schema.sql`: Contains all identical tables, enums, RLS policies, and functions duplicated from the public schema but explicitly mapped to `happypetal_customization`.
  - `db/05_happypetal_seed.sql`: Seeds the initial setup specifically into the new schema.

### Global Trigger Isolation
Because `auth.users` is a global table shared across the entire Supabase instance, dedicated triggers were created to route new Happy Petals sign-ups exclusively to the new schema:
- `on_auth_user_created_happypetal_customization` → `happypetal_customization.handle_new_user()`
- `on_auth_user_role_created_happypetal_customization` → `happypetal_customization.handle_new_user_role()`
- `on_auth_user_settings_created_happypetal_customization` → `happypetal_customization.handle_new_user_settings()`

## 2. Edge Function Duplication
To ensure existing endpoints are not overwritten, all default Edge Functions were duplicated and suffixed with `-happypetal-customization`. The custom logic for Happy Petals now securely resides within these isolated functions.

**Modified/Created Functions:**
- `admin-manage-users-happypetal-customization`
- `ai-chat-happypetal-customization` (Contains the custom Graduation Teddy calculator & Fresh Flowers flow)
- `assetlinks-happypetal-customization`
- `manage-staff-happypetal-customization`
- `media-storage-happypetal-customization`
- `process-message-happypetal-customization`
- `register-device-happypetal-customization`
- `send-followups-happypetal-customization`
- `send-push-happypetal-customization`
- `send-whatsapp-happypetal-customization`
- `sync-usage-crm-happypetal-customization`
- `sync-usage-crm-global-happypetal-customization`
- `webhook-wsender-happypetal-customization`
- `wsender-sessions-happypetal-customization`

## 3. Frontend Integration Updates
The frontend dashboard (`frontend/src`) has been successfully repointed to interface strictly with the new architecture:
- Reconfigured the Supabase JS client (`client.ts`) to default to the `happypetal_customization` database schema via `db: { schema: 'happypetal_customization' }`.
- Rewrote all internal API calls (both `fetch()` and `supabase.functions.invoke()`) across all components to target the new `-happypetal-customization` endpoints.
