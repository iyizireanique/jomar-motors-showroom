import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './providers/ThemeProvider'
import { LanguageProvider } from "@/contexts/LanguageContext";
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="jomar-ui-theme">
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </ThemeProvider>
);
