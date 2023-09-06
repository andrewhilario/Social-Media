import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../pages/Layout";
import { Homepage } from "../pages/Homepage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/profile" element={<h1>Profile</h1>} />
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/register" element={<h1>Register</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
