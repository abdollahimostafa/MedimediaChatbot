"use client";
import React, { useState } from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function BackgroundBeamsDemo() {
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone) {
      alert(`Thank you! We will contact you at ${phone}`);
      setPhone("");
    }
  };

  return (
    <div className="h-[40rem] w-full rounded-md bg-background relative flex flex-col items-center justify-center antialiased z-3">
      <div className="max-w-4xl mx-auto p-4 flex flex-col items-center">
        <h1 className="relative z-10 text-4xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-[#1888f8] via-90% to-[#3399ff] text-center font-sans font-bold">
          به خانواده بایو ویو بپیوندید
        </h1>

        <p className="text-muted-foreground max-w-xl mx-auto my-4 text-center text-lg relative z-10">
          ثبت شماره تماس خود را انجام دهید تا تیم ما با شما تماس بگیرد و وقت ویزیت شما را رزرو کند
          یا مستقیماً با شماره‌های زیر تماس بگیرید
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 w-full max-w-md mt-4 relative z-10"
        >
          <Input
            type="tel"
            placeholder=" تلفن همراه خود را وارد کنید"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 rounded-full py-7 px-16"
          />
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-7 cursor-pointer">
            ثبت شماره
          </Button>
        </form>

        <div className="mt-6 text-center relative z-10 flex-col  gap-4 space-y-2 ">
                      <p className="text-gray-700 bg-gray-200 rounded-3xl px-4 py-3">مدی مدیا</p>

          <p className="text-gray-700 bg-gray-200 rounded-3xl px-4 py-3">+989102949876 </p>
          <p className="text-gray-700 bg-gray-200 rounded-3xl px-4 py-3">برج میلاد, دانشگاه علوم پزشکی ایران</p>
        </div>
      </div>

      <BackgroundBeams />
    </div>
  );
}

export { BackgroundBeamsDemo };
