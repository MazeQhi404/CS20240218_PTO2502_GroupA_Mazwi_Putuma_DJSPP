import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { ThemeProvider } from './contexts/ThemeContext'
import { FavoritesProvider } from './contexts/FavoritesContext'
import { AudioProvider } from './contexts/AudioContext'

/**
 * Application entrypoint
 * ----------------------
 * - Renders <App /> wrapped with providers and BrowserRouter.
 * - Provider order: ThemeProvider -> FavoritesProvider -> AudioProvider -> App
 *
 * Notes:
 * - BrowserRouter must be a single instance at app root (avoid duplicating Router inside App).
 */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <FavoritesProvider>
          <AudioProvider>
            <App />
          </AudioProvider>
        </FavoritesProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
