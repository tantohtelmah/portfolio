import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App'

// ✅ Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'

// (Optional) Import Bootstrap JS if you plan to use modals, dropdowns, etc.
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
