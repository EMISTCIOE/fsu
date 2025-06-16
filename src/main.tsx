import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "./index.css"
import { AuthProvider } from "./contexts/AuthContext"
import { NoticeProvider } from "./contexts/NoticeContext"
import { SuggestionProvider } from "./contexts/SuggestionContext"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NoticeProvider>
          <SuggestionProvider>
            <App />
          </SuggestionProvider>
        </NoticeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
