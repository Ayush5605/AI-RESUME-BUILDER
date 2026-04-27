import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ResumeBuilder from "./pages/ResumeBuilder.jsx";
import Preview from "./pages/Preview.jsx";
import Layout from "./pages/Layout.jsx";


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/builder/:resumeId" element={<ResumeBuilder />} />
        <Route path="/view/:resumeId" element={<Preview />} />
        <Route path="/layout" element={<Layout />} />
      </Routes>
    </>
  )
}

export default App;