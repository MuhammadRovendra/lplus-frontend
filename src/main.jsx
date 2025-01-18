import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './apps/App'
import './apps/style/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
