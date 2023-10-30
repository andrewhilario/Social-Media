import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../pages/Layout";
import { Homepage } from "../pages/Homepage";
import { Profile } from "../pages/Profile";
import Reels from "../pages/Reels/Reels";
import Admin from "../pages/Admin/Admin";
import Login from "../pages/Login/Login";
import { useEffect, useState } from "react";
import { AuthProvider } from "../context/AuthContext";
import ViewProfile from "../pages/ViewProfile/ViewProfile";
import ViewPost from "../pages/ViewPost/ViewPost";
import Notification from "../pages/FriendRequests/FriendRequests";
import FriendRequests from "../pages/FriendRequests/FriendRequests";

export default function Router() {
  // const [isAuth, setIsAuth] = useState(checkAuth());
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:uid" element={<ViewProfile />} />
          <Route path="/post/:postId" element={<ViewPost />} />
          <Route path="/friend-requests" element={<FriendRequests />} />
          <Route path="/reels" element={<Reels />} />
          <Route path="/admin" element={<Admin active={0} />} />
          <Route path="/admin/users" element={<Admin active={1} />} />
          <Route path="/admin/earnings" element={<Admin active={2} />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
