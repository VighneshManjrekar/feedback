import Register from "./components/pages/auth/register";
import ResumePage from "./components/resume-builer/components/resume-select";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/home";
import Login from "./components/pages/auth/login";
import CreateResume from "./components/resume-builer/components/create";

function App() {
  return (
    <div className="bg-[#fefefe]">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/resume/create" element={<CreateResume />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;