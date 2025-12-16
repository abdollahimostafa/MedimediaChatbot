"use client";

import Image from "next/image";

export default function Fe() {
  // Example features
  const features = [
    { title: "بررسی قلب", description: "تحلیل سلامت قلب و عروق", icon: "/icons/heart.png" },
    { title: "بررسی مغز", description: "آنالیز عملکرد مغز و انرژی ذهن", icon: "/icons/brain.png" },
    { title: "بررسی کبد", description: "سلامت کبد و سم‌زدایی بدن", icon: "/icons/liver.png" },
    { title: "بررسی عضلات", description: "وضعیت عضلات و عملکرد فیزیکی", icon: "/icons/muscle.png" },
  ];

  return (
    <section className="relative w-full py-24 bg-gray-900 text-white">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
        ویژگی‌های بایو ویو
      </h2>

      <div className="relative flex items-center justify-center">
        {/* Central Image */}
        <div className="relative z-10">
          <Image
            src="/center-device.png"
            alt="Central Device"
            width={200}
            height={200}
            className="mx-auto"
          />
        </div>

        {/* Lines & Feature Cards */}
        {features.map((feature, idx) => {
          // Position around circle
          const angle = (idx / features.length) * Math.PI * 2;
          const radius = 200; // distance from center
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <div
              key={idx}
              className="absolute flex flex-col items-center w-48"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
              }}
            >
              {/* Line */}
              <svg
                className="absolute w-full h-full -z-10"
                style={{
                  left: `${-x}px`,
                  top: `${-y}px`,
                  width: `${Math.abs(x)}px`,
                  height: `${Math.abs(y)}px`,
                }}
              >
                <line
                  x1={0}
                  y1={0}
                  x2={x}
                  y2={y}
                  stroke="white"
                  strokeWidth={1}
                  className="opacity-50"
                />
              </svg>

              {/* Feature Card */}
              <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-center">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={48}
                  height={48}
                  className="mx-auto mb-2"
                />
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-sm text-white/70">{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
