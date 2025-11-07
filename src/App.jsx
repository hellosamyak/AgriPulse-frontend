import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Chat from "./pages/Chat";
import DiseaseDetect from "./pages/DiseaseDetect";
import Dashboard from "./pages/Dashboard";
import Terminal from "./pages/Terminal";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="chat" element={<Chat />} />
          <Route path="detect" element={<DiseaseDetect />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="terminal" element={<Terminal />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
