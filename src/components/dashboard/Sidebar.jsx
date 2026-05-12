"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  ShieldCheck,
  GraduationCap,
  ClipboardList,
  FileBadge,
  Menu,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    path: "/admin/dashboard",
  },
  {
    title: "First Aid",
    icon: <GraduationCap size={20} />,
    path: "/admin/firstAid",
  },
  {
    title: "OSHA Student List",
    icon: <ClipboardList size={20} />,
    path: "/admin/osha",
  },
  {
    title: "Certificates",
    icon: <ShieldCheck size={20} />,
    path: "/admin/certificates",
  },
  {
    title: "ISO 14001",
    icon: <FileBadge size={20} />,
    path: "/admin/iso",
  },
];

export default function Sidebar({ open, setOpen }) {
  const pathname = usePathname();

  return (
    <div
      className={`bg-[#293038] text-white h-screen transition-all duration-300 border-r border-gray-800
      ${open ? "w-64" : "w-20"}
       md:relative z-50`}
    >
      {/* Top */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-800">
        {open && (
          <h1 className="text-xl font-bold tracking-wide text-cyan-400">
            Admin
          </h1>
        )}

        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-lg hover:bg-gray-800"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Menu */}
      <div className="mt-5 flex flex-col gap-2 px-3">
        {menuItems.map((item, index) => {
          const active = pathname === item.path;

          return (
            <Link
              key={index}
              href={item.path}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all
              ${
                active
                  ? "bg-cyan-500/20 text-cyan-400"
                  : "bg-gray-800 text-gray-300 hover:bg-cyan-500/20 hover:text-cyan-400"
              }`}
            >
              {item.icon}

              {open && (
                <span className="text-sm font-medium">{item.title}</span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}