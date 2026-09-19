const fs = require('fs');
const file = 'frontend/src/components/layout/DashboardLayout.tsx';
let code = fs.readFileSync(file, 'utf8');

// 1. Add Import
code = code.replace(
  'import { Button } from "@/components/ui/button";',
  'import { Button } from "@/components/ui/button";\nimport ThemeToggle from "@/components/ThemeToggle";'
);

// 2. Add to Mobile Header
const mobileTarget = `<Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleLogout}>`;
const mobileReplace = `<div className="flex items-center gap-1">
            <ThemeToggle variant="button" className="h-8 w-8" />
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleLogout}>`;
code = code.replace(mobileTarget, mobileReplace);

// Fix the closing div for Mobile Header
code = code.replace(
  `          </Button>\n        </div>`,
  `          </Button>\n          </div>\n        </div>`
);

// 3. Add to Desktop Sidebar
const desktopTarget = `<div className="p-4 border-t space-y-2">`;
const desktopReplace = `<div className="p-4 border-t space-y-3">
                <ThemeToggle variant="sidebar" />`;
code = code.replace(desktopTarget, desktopReplace);

fs.writeFileSync(file, code);
