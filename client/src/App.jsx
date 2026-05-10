import { Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"

import LandingPage from "./pages/LandingPage"
import { Auth } from "./pages/AuthPage"
import SignUpPage from "./pages/SignUpPage"
// import { SignedIn } from "@neondatabase/neon-js/auth/react"
import {AIPipeline} from "./components/landingpage/ai-pipeline"
import {ComplaintSubmission} from "./components/landingpage/complaint-submission"
import { DashboardPreview } from "./components/landingpage/dashboard-preview"
import { Footer } from "./components/landingpage/footer"
import { Navbar } from "./components/landingpage/navbar"
import { HeroSection } from "./components/landingpage/hero-section"
import { OfficerWorkflow } from "./components/landingpage/officer-workflow"
import {TrustTransparency} from "./components/landingpage/trust-transparency"
import { ThemeProvider } from "./components/landingpage/theme-provider"


function App() {

  return (
    <ThemeProvider>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/:pathname" element={<Auth />} />
        <Route path="/auth/signup" element={<SignUpPage />} />
        <Route path="/ai-pipeline" element={<AIPipeline />} />
        <Route path="/complaint-submission" element={<ComplaintSubmission />} />
        <Route path="/dashboard-preview" element={<DashboardPreview />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/hero-section" element={<HeroSection />} />
        <Route path="/officer-workflow" element={<OfficerWorkflow />} />
        <Route path="/trust-transparency" element={<TrustTransparency />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
