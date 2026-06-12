import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";

import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Whatsapp from "./pages/Whatsapp.jsx";
import Email from "./pages/Email";
import Analytics from "./pages/Analytics";
import Team from "./pages/Team";
import Setting from "./pages/Setting";
import Facebook from "./pages/Facebook";
import Instagram from "./pages/Instagram";
function App() {
  return (
    <BrowserRouter> 
      <Routes>

        <Route element={<AppLayout />}>

          <Route path="/" element={<Dashboard />} />

          <Route path="/leads" element={<Leads />} />

          <Route path="/whatsapp" element={<Whatsapp />} />
          <Route path="/facebook" element={<Facebook />} />
          <Route path="/instagram" element={<Instagram />} />

          <Route path="/email" element={<Email />} />

          <Route path="/analytics" element={<Analytics />} />

          <Route path="/team" element={<Team />} />

          <Route path="/setting" element={<Setting />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;