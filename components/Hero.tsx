"use client";

import { ArrowUpLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero2() {
  return (
    <motion.section
          initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.4 }}
    className="w-full flex justify-center ">
      {/* OUTER BOX WITH BORDER RADIUS */}
      <div
        className="relative w-full  min-h-[85vh] rounded-4xl mt-7  overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bghero2.png')" }}
      >
        {/* LEFT FLOATING CARD (50% WIDTH, FULL HEIGHT) */}
        <div className="absolute top-0 right-0  w-full md:w-3/7 flex items-center">
          <div className="bg-white/80 backdrop-blur-2xl rounded-4xl  rounded-l-[30px]  p-10 shadow-lg  w-full h-227">
            
      

   {/* main content */}
<div className="flex flex-col items-center text-center px-4">

  {/* Floating Energy Icon */}
  <div className="relative mb-8">
    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 blur-sm opacity-70 absolute inset-0"></div>
    <div className="w-20 h-20 rounded-full bg-white/30 backdrop-blur-xl border border-white/40 relative flex items-center justify-center shadow-xl">
      <span className="text-3xl text-purple-600">⚛️</span>
    </div>
  </div>

  <h2 className="text-4xl font-bold leading-snug text-gray-900">
    چکاپ غیرتهاجمی سلامت بدن  
    <br />
    با تکنولوژی <span className="text-purple-600 font-extrabold">Bioresonance</span>
  </h2>

  <p className="text-gray-700 mt-4 max-w-md">
    تحلیل جامع فرکانس‌های بدنی و شناسایی عدم‌تعادل‌ها بدون سوزن، درد یا آزمایش خون.
  </p>

  {/* CTA */}
  <button className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
    شروع ارزیابی سلامت
  </button>
</div>

{/* bottom info */}
<div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">

  <div className="p-5 rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow-sm hover:shadow-md transition">
    <p className="font-semibold text-lg text-purple-600">غیر تهاجمی 100%</p>
    <p className="text-gray-600 text-xs mt-1">
      بدون درد، بدون اشعه، مناسب برای همه افراد
    </p>
  </div>

  <div className="p-5 rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow-sm hover:shadow-md transition">
    <p className="font-semibold text-lg text-purple-600">تشخیص دقیق</p>
    <p className="text-gray-600 text-xs mt-1">
      بررسی بیش از ۵۵۰ شاخص عملکردی بدن
    </p>
  </div>

  <div className="p-5 rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow-sm hover:shadow-md transition">
    <p className="font-semibold text-lg text-purple-600">نتیجه فوری</p>
    <p className="text-gray-600 text-xs mt-1">
      دریافت گزارش کامل و توصیه‌های شخصی‌سازی‌شده
    </p>
  </div>

</div>


          </div>
        </div>

        {/* OPTIONAL RIGHT ARROW BUTTON LIKE MOCKUP */}
        <button className="absolute bottom-10 left-10 bg-white w-20 h-20 rounded-full items-center justify-center">
          <ArrowUpLeft className=" h-8 w-8 mx-auto" />
        </button>
      </div>
    </motion.section>
  );
}
