const fs = require('fs');
const file = 'frontend/src/pages/Settings.tsx';
let code = fs.readFileSync(file, 'utf8');

// 1. Add freshFlowersPdfs state
code = code.replace(
  'const [welcomeMediaUrls, setWelcomeMediaUrls] = useState<string[]>([]);',
  'const [welcomeMediaUrls, setWelcomeMediaUrls] = useState<string[]>([]);\n  const [freshFlowersPdfs, setFreshFlowersPdfs] = useState<string[]>([]);'
);

// 2. Add to fetchSettings
code = code.replace(
  'case "welcome_message": {',
  'case "fresh_flowers_pdfs": {\n            setFreshFlowersPdfs(Array.isArray(setting.value?.urls) ? setting.value.urls : []);\n            break;\n          }\n          case "welcome_message": {'
);

// 3. Add to save auto responses (or anywhere, handleSaveAutoResponses is fine, or we create handleSaveFreshFlowers)
code = code.replace(
  'const handleSaveAutoResponses = async () => {',
  `const handleSaveFreshFlowers = async () => {
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

  const handleSaveAutoResponses = async () => {`
);

// 4. Add UI to the chatbot tab, just above Auto Responses
const targetUI = `<Card>
              <CardHeader>
                <CardTitle>Auto Responses</CardTitle>`;
const ui = `<Card>
              <CardHeader>
                <CardTitle>Fresh Flowers Catalog (Happy Petals)</CardTitle>
                <CardDescription>
                  Upload exactly 3 PDFs here for the Fresh Flowers budget ranges.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  The AI will automatically send these to customers based on their selection. 
                  Upload order matters: 1st (1500-4000), 2nd (4000-6000), 3rd (6000 and above).
                </p>
                <WelcomeMediaUpload
                  label="Fresh Flowers PDFs"
                  description="Upload up to 3 PDFs."
                  mediaUrls={freshFlowersPdfs}
                  onChange={setFreshFlowersPdfs}
                  maxFiles={3}
                />
                <Button onClick={handleSaveFreshFlowers} disabled={saving} className="mt-6">
                  {saving ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Save Catalog
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Auto Responses</CardTitle>`;

code = code.replace(targetUI, ui);

fs.writeFileSync(file, code);
