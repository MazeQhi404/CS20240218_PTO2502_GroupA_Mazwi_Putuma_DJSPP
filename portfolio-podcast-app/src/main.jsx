/**
 * Application Entry Point:
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

/**
 * Global Context Providers 
 */
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { AudioProvider } from './contexts/AudioContext.jsx'
import { FavoritesProvider } from './contexts/FavoritesContext.jsx'

/**
 * Render The App:
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/**StrictMode helps identify potential problems in development*/}
    <ThemeProvider>
      <AudioProvider>
        <FavoritesProvider>
          <App/>
        </FavoritesProvider>
      </AudioProvider >
    </ThemeProvider>
  </React.StrictMode>
)

/**
 * NOTES:
 * All child components now have access to theme, audio and favorites
 */