const fs = require('fs');
const file = 'frontend/src/pages/Settings.tsx';
let code = fs.readFileSync(file, 'utf8');

const targetFunc = `  const handleSaveAutoResponses = () => {`;
const newFunc = `  const handleSaveFreshFlowers = async () => {
    setSaving(true);
    try {
      const { error } = await supabase.from("settings").upsert({
        key: "fresh_flowers_pdfs",
        value: { urls: freshFlowersPdfs },
        user_id: user!.id,
      });
      if (error) throw error;
      toast({ title: "Saved", description: "Fresh flowers PDFs saved." });
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAutoResponses = () => {`;

code = code.replace(targetFunc, newFunc);
fs.writeFileSync(file, code);
