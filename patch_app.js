const fs = require('fs');
const file = 'frontend/src/App.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  'import { TooltipProvider } from "@/components/ui/tooltip";',
  'import { TooltipProvider } from "@/components/ui/tooltip";\nimport { ThemeProvider } from "next-themes";'
);

code = code.replace(
  '<QueryClientProvider client={queryClient}>',
  '<ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>\n  <QueryClientProvider client={queryClient}>'
);

code = code.replace(
  '</QueryClientProvider>',
  '</QueryClientProvider>\n  </ThemeProvider>'
);

fs.writeFileSync(file, code);
