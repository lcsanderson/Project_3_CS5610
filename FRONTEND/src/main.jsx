import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import IndexPage from "./components/IndexPage.jsx"

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <StrictMode>
    <IndexPage />
  </StrictMode>,
);
