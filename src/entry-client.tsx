import './styles/index.css'
import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { App } from './app/App'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Built pages arrive prerendered: hydrate them. `vite dev` has an empty root.
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)
