import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../pages/Layout";
import { Homepage } from "../pages/Homepage";
import { Profile } from "../pages/Profile";
import Reels from "../pages/Reels/Reels";
import Admin from "../pages/Admin/Admin";
import Login from "../pages/Login/Login";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<h1>Register</h1>} />
        <Route path="/reels" element={<Reels />} />
        <Route path="/admin" element={<Admin active={0} />} />
        <Route path="/admin/users" element={<Admin active={1} />} />
        <Route path="/admin/earnings" element={<Admin active={2} />} />
      </Routes>
    </BrowserRouter>
  );
}
