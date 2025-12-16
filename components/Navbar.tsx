"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="w-full px-6 py-4 absolute top-0 left-0 z-30 bg-transparent">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* LEFT BUTTONS */}
        <div className="hidden md:flex gap-3">
          <button className="px-4 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition">
            رزرو نوبت
          </button>
          <button className="px-4 py-2 border border-white rounded-full text-sm hover:bg-white hover:text-black transition">
            پنل کاربری
          </button>
        </div>

        {/* RIGHT SIDE (LOGO + MENU) */}
        <div className="flex items-center justify-between w-full md:w-auto gap-6" dir="rtl">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="logo" className="w-12 h-12 md:w-15 md:h-15" />
            <h1 className="text-lg md:text-xl font-semibold text-white">
              بایو ویو | موج سلامتی هوشمند
            </h1>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-6 text-sm text-white">
            <li className="cursor-pointer hover:text-gray-300 transition">صفحه اصلی</li>
            <li className="cursor-pointer hover:text-gray-300 transition">خدمات</li>
            <li className="cursor-pointer hover:text-gray-300 transition">مقالات</li>
            <li className="cursor-pointer hover:text-gray-300 transition">درباره ما</li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white/30 backdrop-blur-md z-40 transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            className="text-white text-2xl"
            onClick={() => setMobileOpen(false)}
          >
            <X />
          </button>
        </div>
        <ul className="flex flex-col gap-6 mt-8 text-white text-center">
          <li className="cursor-pointer hover:text-gray-300 transition">صفحه اصلی</li>
          <li className="cursor-pointer hover:text-gray-300 transition">خدمات</li>
          <li className="cursor-pointer hover:text-gray-300 transition">مقالات</li>
          <li className="cursor-pointer hover:text-gray-300 transition">درباره ما</li>
        </ul>
        <div className="flex flex-col gap-3 mt-8 px-6">
          <button className="px-4 py-2 bg-white text-black rounded-full text-sm hover:bg-gray-200 transition">
            رزرو نوبت
          </button>
          <button className="px-4 py-2 border border-white rounded-full text-sm hover:bg-white hover:text-black transition">
            تماس با ما
          </button>
        </div>
      </div>

      {/* Optional: overlay behind drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}
    </nav>
  );
}
