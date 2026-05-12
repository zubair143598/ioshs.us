"use client";

import { useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex bg-[#0B1120] min-h-screen">
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Main Content */}
      <div
        className={` transition-all duration-300 w-full overflow-hidden`}
      >
        {/* Header */}
              <div className="p-4 text-white w-full bg-[#293038]">
                <h1 className="text-[16px] md:text-[24px]  font-bold">Welcome Back, Admin</h1>
                
              </div>
        {children}
      </div>
    </div>
  );
}