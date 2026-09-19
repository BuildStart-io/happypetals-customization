const fs = require('fs');
const file = 'frontend/src/pages/Settings.tsx';
let code = fs.readFileSync(file, 'utf8');

const target = `                <Button onClick={handleSaveAutoResponses} disabled={saving}>
                  {saving ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Save Settings
                </Button>
              </CardContent>
            </Card>`;

const newUI = `                <Button onClick={handleSaveAutoResponses} disabled={saving}>
                  {saving ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Save Settings
                </Button>
              </CardContent>
            </Card>

            <Card>
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
                <Button onClick={handleSaveWelcome} disabled={saving} className="mt-6">
                  {saving ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Save Catalog
                </Button>
              </CardContent>
            </Card>`;

code = code.replace(target, newUI);
fs.writeFileSync(file, code);
