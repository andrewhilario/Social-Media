import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../pages/Layout";
import { Homepage } from "../pages/Homepage";
import { Profile } from "../pages/Profile";
import Reels from "../pages/Reels/Reels";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/register" element={<h1>Register</h1>} />
        <Route path="/reels" element={<Reels />} />
      </Routes>
    </BrowserRouter>
  );
}
