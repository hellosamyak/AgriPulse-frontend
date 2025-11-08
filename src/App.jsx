import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import Chat from "./pages/Chat";
import DiseaseDetect from "./pages/DiseaseDetect";
import Dashboard from "./pages/Dashboard";
import Terminal from "./pages/Terminal";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page route - no Layout wrapper */}
        <Route path="/" element={<LandingPage />} />

        {/* App routes with Layout wrapper */}
        <Route path="/app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="chat" element={<Chat />} />
          <Route path="detect" element={<DiseaseDetect />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="terminal" element={<Terminal />} />
        </Route>

        {/* Alternative: Direct routes with Layout for backward compatibility */}
        <Route path="/chat" element={<Layout />}>
          <Route index element={<Chat />} />
        </Route>
        <Route path="/detect" element={<Layout />}>
          <Route index element={<DiseaseDetect />} />
        </Route>
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/terminal" element={<Layout />}>
          <Route index element={<Terminal />} />
        </Route>

        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
