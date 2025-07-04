import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/public/Home";
import Login from "@/pages/public/Login";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
       
      </Route>
      <Route path="/login" element={<Login />} /> 
    </Routes>
  );
}

export default AppRoutes;
