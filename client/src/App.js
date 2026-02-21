import React from "react";
import { Helmet } from "react-helmet";
import ResumeState from "./Context/ResumeState";
import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import UserDataCollect from "./Components/UserDataCollect/UserDataCollect";

// ================= ADMIN =================
import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import Users from "./Pages/Admin/Users";
import UserDetails from "./Pages/Admin/UserDetails";
import AdminTemplates from "./Pages/Admin/Templates";
import AdminLayout from "./Pages/Admin/AdminLayout";
import Resumes from "./Pages/Admin/Resumes";
import AdminResumePreview from "./Pages/Admin/AdminResumePreview";   // ✅ ADDED
import AdminProfile from "./Pages/Admin/AdminProfile";

// ================= USER =================
import UserTemplates from "./Pages/Templates/Templates";

// ================= BUILDER =================
import Builder from "./Pages/Builder/Builder";

// ================= LAYOUT =================
import UserLayout from "./layouts/UserLayout";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <ResumeState>
      <div className="App">
        <Helmet>
          <title>Resume Builder - Create Professional Resumes Online</title>
          <meta
            name="description"
            content="Build and customize professional resumes online with Resume Builder."
          />
        </Helmet>

        <Routes>

          {/* ================= LOGIN / SIGNUP (NO NAVBAR) ================= */}
          <Route path="/login" element={<Login />} />

          {/* ================= USER SIDE (WITH NAVBAR) ================= */}
          <Route element={<UserLayout />}>

            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />

            {/* USER TEMPLATES */}
            <Route path="/templates" element={<UserTemplates />} />

            <Route path="/builder/:id" element={
                <ProtectedRoute>
                  <Builder />
                </ProtectedRoute>
              }
            />

            {/* BUILDER */}
            <Route path="/builder/:id" element={<Builder />} />

            {/* OLD FORM */}
            <Route path="/resume-form" element={<UserDataCollect />} />

          </Route>

          {/* ================= ADMIN LOGIN ================= */}
          <Route path="/adminlogin" element={<AdminLogin />} />

          {/* ================= ADMIN PANEL ================= */}
          <Route path="/admin" element={<AdminLayout />}>

            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<UserDetails />} />
            <Route path="resumes" element={<Resumes />} />

            {/* ✅ NEW PREVIEW ROUTE */}
            <Route
              path="resume-preview/:id"
              element={<AdminResumePreview />}
            />

            <Route path="templates" element={<AdminTemplates />} />
            <Route path="profile" element={<AdminProfile />} />

          </Route>

        </Routes>
      </div>
    </ResumeState>
  );
}

export default App;
