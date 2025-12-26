import Login from "./pages/Login";
import Register from "./pages/Register";
import Issues from "./pages/Issues";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />   
        <Route path="/register" element={<Register />} />
        <Route path="/issues" element={<Issues />} />
      </Routes>
    </Router>
  );
}

export default App;
