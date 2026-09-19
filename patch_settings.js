const fs = require('fs');
const file = 'frontend/src/pages/Settings.tsx';
let code = fs.readFileSync(file, 'utf8');

// Add freshFlowersPdfs state
code = code.replace(
  'const [welcomeSequence, setWelcomeSequence] = useState<WelcomeSequenceItem[]>([]);',
  'const [welcomeSequence, setWelcomeSequence] = useState<WelcomeSequenceItem[]>([]);\n  const [freshFlowersPdfs, setFreshFlowersPdfs] = useState<string[]>([]);'
);

// Add to fetch parsing
code = code.replace(
  'if (setting.key === "auto_responses") {',
  'if (setting.key === "fresh_flowers_pdfs") {\n            setFreshFlowersPdfs(Array.isArray(setting.value?.urls) ? setting.value.urls : []);\n          }\n          if (setting.key === "auto_responses") {'
);

// Add to save payload
code = code.replace(
  '{ key: "auto_responses", value: { enabled: autoResponsesEnabled }, user_id: user.id },',
  '{ key: "auto_responses", value: { enabled: autoResponsesEnabled }, user_id: user.id },\n        { key: "fresh_flowers_pdfs", value: { urls: freshFlowersPdfs }, user_id: user.id },'
);

// Render the upload component in Chatbot tab
const freshFlowersUI = `
            <div className="space-y-4 pt-4 border-t border-border mt-4">
              <h3 className="text-lg font-medium">Fresh Flowers Catalog (Happy Petals)</h3>
              <p className="text-sm text-muted-foreground">Upload exactly 3 PDFs here for the Fresh Flowers budget ranges (1500-4000, 4000-6000, 6000 and above). The AI will automatically send them to customers based on their selection.</p>
              <WelcomeMediaUpload
                label="Fresh Flowers PDFs"
                description="Upload up to 3 PDFs."
                mediaUrls={freshFlowersPdfs}
                onChange={setFreshFlowersPdfs}
                maxFiles={3}
              />
            </div>
`;

code = code.replace(
  '<div className="flex items-center space-x-2">',
  freshFlowersUI + '\n            <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-border">'
);

fs.writeFileSync(file, code);
