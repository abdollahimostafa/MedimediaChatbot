'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn } from 'next-auth/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import Image from 'next/image'
import { ArrowLeftCircle, CircleQuestionMarkIcon } from 'lucide-react'

export default function SigninPage() {
  const { update } = useSession()
  const [step, setStep] = useState<1 | 2>(1)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ phoneNumber: '', code: '' })

  const normalizeNumbers = (input: string) => {
    return input.replace(/[۰-۹]/g, (d) =>
      String.fromCharCode(d.charCodeAt(0) - 1728)
    )
  }

  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/dashboard')
    }
  }, [status, router])

  if (status === 'loading') {
    return <div className="text-center py-10">در حال بررسی ورود...</div>
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSendCode = async () => {
    setLoading(true)
    const normalizedPhone = normalizeNumbers(form.phoneNumber)
    const res = await fetch('/api/send-code', {
      method: 'POST',
      body: JSON.stringify({ phone: normalizedPhone }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (res.ok) {
      toast.success('کد تأیید ارسال شد', { className: 'ggfont' })
      setStep(2)
    } else {
      toast.error('ارسال کد با خطا مواجه شد', { className: 'ggfont' })
    }

    setLoading(false)
  }

  const handleVerify = async () => {
    setLoading(true)
    const normalizedPhone = normalizeNumbers(form.phoneNumber)
    const normalizedCode = normalizeNumbers(form.code)
    const res = await signIn('credentials', {
      phoneNumber: normalizedPhone,
      code: normalizedCode,
      redirect: false,
    })

    if (res?.ok) {
      await update()
      toast.success('ورود موفقیت‌آمیز بود', { className: 'ggfont' })
      router.push('/dashboard')
    } else {
      toast.error('کد وارد شده معتبر نیست', { className: 'ggfont' })
    }

    setLoading(false)
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white overflow-y-hidden">
      {/* Left: Form Card */}
      <div className="flex-1 flex items-center justify-center p-6 z-1">
        <Card className="w-full max-w-2xl border-none   p-0 pt-10 xl:p-15 shadow-none ">
          <CardContent className="space-y-4">
            <div className='flex justify-between  pb-5 md:pb-10 '>
              <a href='/' className='flex bg-gray-100 cursor-pointer  rounded-full p-2'><ArrowLeftCircle className='mr-2'/> بازگشت</a>
                            <div className='flex bg-gray-100 rounded-full p-2 cursor-pointer text-md text-gray-600'> ‍‍‍پشتیبانی<CircleQuestionMarkIcon className='ml-2'/></div>

            </div>
            <h2 className="text-3xl font-bold mb-2 text-center mb-20">
              {step === 1 ? 'ورود به پنل کاربری' : 'تأیید شماره موبایل'}
            </h2>
            {step === 1 && (
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendCode()
                }}
              >
             <div
  dir="rtl"
  className="flex flex-col items-center mx-auto bg-gray-100 rounded-xl pt-8 border  p-10   -mt-14 -mb-6"
>
  <Label className="mb-4 text-center flex-col lg:flex-row">
<div className='flex'>
      <div className="bg-black w-3 h-3 rounded-full inline-block ml-2"></div>
    شماره موبایل
</div>    <span className="text-black/60 text-[10px] md:text-xs block mt-1">
      (شماره موبایل خود را به همراه ۰۹۱ وارد کنید)
    </span>
  </Label>

  <Input
    className="rounded-full max-w-sm w-full bg-white text-center"
    name="phoneNumber"
    value={form.phoneNumber}
    onChange={handleChange}
    placeholder="شماره همراه"
  />
</div>


                <Button type="submit" className="w-full cursor-pointer bg-[#17172c]" disabled={loading}>
                  ارسال کد ورود
                </Button>
                              <a href='/signup' className='text-center text-sm mt-3 block text-gray-400'>حساب کاربری ندارم</a>

              </form>

            )}

            {step === 2 && (
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault()
                  handleVerify()
                }}
              >
                                  <div className='-mt-16 text-center text-xs'>لطفا کد ۶  رقمی پیامک شده از طرف بایو ویو را در کادر زیر وارد نمائید</div>

                <div className="space-y-2 text-center mx-auto -mb-13 bg-gray-100 rounded-xl p-8 pb-20" dir="ltr">
                  <Label className="block text-sm font-medium mb-5">
                    کد تأیید را وارد کنید
                  </Label>
<InputOTP
  maxLength={6}
  value={form.code}
  onChange={(value) => setForm({ ...form, code: value })}
  className="flex justify-center items-center gap-2 bg-white"
>                
<div className='flex align-middle justify-center  w-fit mx-auto'>
  <InputOTPGroup >
                      <InputOTPSlot className='bg-white' index={0} />
                      <InputOTPSlot className='bg-white' index={1} />
                      <InputOTPSlot className='bg-white' index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator className='mt-1' />
                    <InputOTPGroup >
                      <InputOTPSlot className='bg-white' index={3} />
                      <InputOTPSlot className='bg-white' index={4} />
                      <InputOTPSlot className='bg-white' index={5} />
                    </InputOTPGroup></div>    

                  </InputOTP>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  بررسی کد و ورود
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right: Brand / Illustration */}
        <Image
        width={500}
        height={400}
          src="/wav2.jpg"
          alt="Medical AI Illustration"
          className="mask-image-gradient md:max-w-xs absolute md:relative z-0 w-full  h-screen lg:max-w-xl"
        />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute animate-in inset-0 z-50 flex flex-col items-center justify-center bg-black/80">
          <svg
            className="w-12 h-12 animate-spin text-white mb-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
          <p className="text-white text-lg">در حال پردازش، لطفاً صبر کنید...</p>
        </div>
      )}
    </div>
  )
}
