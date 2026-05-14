import './initAxios'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import './index.css'
import App from './App.jsx'

// React Query client — global cache for all API data.
// staleTime: treat cached data as fresh for 5 minutes (no refetch on revisit).
// gcTime: keep unused data in memory for 10 minutes before garbage collecting.
// retry: retry failed requests twice before showing an error.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,   // 5 minutes
      gcTime: 10 * 60 * 1000,     // 10 minutes
      retry: 2,
      refetchOnWindowFocus: false, // Don't refetch just because user switched tabs
    },
  },
});

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
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <LanguageProvider initialLang={pathLang}>
            <BrowserRouter basename={`/${pathLang}`}>
              <App />
            </BrowserRouter>
          </LanguageProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>,
  )
};

initializeApp();
