import React from "react";
import { Outlet } from "react-router";
import { Header } from "../components/PublicHeader";
import { Footer } from "../components/PublicFooter";
function MainLayout() {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col min-h-screen w-full md:max-w-4/5  self-center">
        <Header />
        <main className="flex flex-col self-center  ">
          <Outlet />
        </main>

        <div className="flex self-center">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
