import './initAxios'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import './index.css'
import App from './App.jsx'

const initializeApp = () => {
  const currentPath = window.location.pathname;
  const pathLang = currentPath.split('/')[1];
  const supportedLangs = ['uz', 'ru', 'en'];

  // If the path doesn't start with a supported language, redirect to /uz/...
  if (!supportedLangs.includes(pathLang)) {
    window.location.replace(`/uz${currentPath}${window.location.search}`);
    return;
  }

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <ThemeProvider>
        <LanguageProvider initialLang={pathLang}>
          <BrowserRouter basename={`/${pathLang}`}>
            <App />
          </BrowserRouter>
        </LanguageProvider>
      </ThemeProvider>
    </StrictMode>,
  )
};

initializeApp();
