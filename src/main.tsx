import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import LangueProvider from './contexts/langue.context.tsx'
import { CookiesProvider } from 'react-cookie'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CookiesProvider>
      <LangueProvider>
        <App />
      </LangueProvider>
    </CookiesProvider>
  </StrictMode>,
)
