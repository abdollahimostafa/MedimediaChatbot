'use client'

import Image from 'next/image'
import { Activity, ArrowRight, Files, Flower, GalleryVerticalEnd, MapPin } from 'lucide-react'
import DottedMap from 'dotted-map'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts'
import { Card } from '@/components/ui/card'
import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { cn } from "@/lib/utils"

export default function CombinedFeaturedSection() {
  const featuredCasestudy = {
    logo: '/ruixen_dark.png',
    company: 'Ruixen',
    tags: 'سازمان‌ها',
    title: 'چگونه به بیش از 1 میلیون کاربر رسیدیم',
    subtitle: 'بدون حتی یک ثانیه قطعی، با معماری هوشمند و مانیتورینگ لحظه‌ای',
  }

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 md:grid-rows-2">

        {/* 1. MAP - Top Left */}
        <div className="relative rounded-none overflow-hidden bg-muted border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <MapPin className="w-4 h-4" />
            آنالیتیکس Ruixen
          </div>
          <h3 className="text-xl font-normal text-gray-900 dark:text-white">
            فعالیت کاربران در مناطق مختلف را بصری کنید.{" "}
            <span className="text-gray-500 dark:text-gray-400">ردیابی، تحلیل و بهینه‌سازی جغرافیایی.</span>
          </h3>

          <div className="relative mt-4">
            <div className="absolute top-16 left-1/2 -translate-x-1/2 z-10 px-3 py-1 bg-white dark:bg-black text-black dark:text-white rounded-md text-xs font-medium shadow flex items-center gap-2">
              🌍 آخرین اتصال از آمریکا
            </div>
            <Map />
          </div>
        </div>

        {/* 2. FEATURED CASE STUDY BLOCK - Top Right */}
        <div className="flex flex-col justify-between gap-4 p-6 rounded-none border border-gray-200 dark:border-gray-800 bg-card">
          <div>
            <span className="text-xs flex items-center gap-2 text-sm text-gray-500">
              <GalleryVerticalEnd className="w-4 h-4" /> {featuredCasestudy.tags}
            </span>
            <h3 className="text-xl font-normal text-gray-900 dark:text-white">
              {featuredCasestudy.title}{" "}
              <span className="text-gray-500 dark:text-gray-400">{featuredCasestudy.subtitle}</span>
            </h3>
          </div>
          <div className="flex justify-center items-center w-full">
            <RuixenFeaturedMessageCard />
          </div>
        </div>

        {/* 3. CHART - Bottom Left */}
        <div className="rounded-none border border-gray-200 dark:border-gray-800 bg-muted p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Activity className="w-4 h-4" />
            آنالیتیکس Ruixen
          </div>
          <h3 className="text-xl font-normal text-gray-900 dark:text-white">
            ردیابی عملکرد در زمان واقعی.{" "}
            <span className="text-gray-500 dark:text-gray-400">تصمیمات UI خود را بلافاصله بهینه کنید.</span>
          </h3>
          <MonitoringChart />
        </div>

        {/* 4. ALL FEATURE CARDS - Bottom Right */}
        <div className="grid sm:grid-cols-2 rounded-none bg-card">
          <FeatureCard
            icon={<Files className="w-4 h-4" />}
            image="/1.png"
            title="بلوک‌های آماده"
            subtitle="کپی و جایگذاری"
            description="بلوک‌های UI آماده که می‌توانید مستقیم در هر پروژه‌ای استفاده کنید."
          />
          <FeatureCard
            icon={<Flower className="w-4 h-4" />}
            image="/2.png"
            title="سفارشی‌سازی آسان"
            subtitle="استفاده راحت"
            description="طرح‌بندی خود را دقیقاً همانطور که می‌خواهید با انعطاف کامل طراحی کنید."
          />
        </div>
      </div>
    </section>
  )
}
