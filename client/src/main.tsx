import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@/providers/ThemeContext.tsx'
import { ToastProvider } from '@/providers/toaster-provider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <ThemeProvider>
          <App />
          <ToastProvider />
        </ThemeProvider>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>,
)
