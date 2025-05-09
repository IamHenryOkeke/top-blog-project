'use client'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import CardWrapper from "@/components/auth/card-wrapper"
import { useState } from "react"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5"
import useTogglePasswordVisibility from "@/hooks/useTogglePasswordVisibility"
import { TextInput } from "@/components/input"
import Button from "@/components/button"
import { authService } from "@/services/auth"
import toast from "react-hot-toast"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"

export default function ResetPasswordForm() {
  const [formStatus, setFormStatus] = useState<"email" | "change-password">("email");
  const [email, setEmail] = useState("");
  return (
    <CardWrapper
      title={formStatus === "email" ? "Send OTP" : "Reset Password"}
      footerPara='Go back to'
      footerLink={{
        href: "/auth/login",
        text: "login"
      }}
    >
      {
        formStatus === "email" && <SendOTP setEmail={setEmail} setFormStatus={setFormStatus} />

      }
      {
        formStatus === "change-password" && <ChangePassword email={email} setFormStatus={setFormStatus} />
      }
    </CardWrapper>
  )
}

const SendOTPFormSchema = z.object({
  email: z.string().email({ message: "Must be a valid email" }),
})

function SendOTP({ setEmail, setFormStatus }: { setEmail: (value: string) => void, setFormStatus: (value: "email" | "change-password") => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof SendOTPFormSchema>>({
    resolver: zodResolver(SendOTPFormSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof SendOTPFormSchema>) => {
    setIsSubmitting(true);
    try {
      const res = await authService.sendOTP(values);
      if (res) {
        toast.success("OTP sent to your email");
        setEmail(values.email);
        setFormStatus("change-password")
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "An error occurred");
        setIsSubmitting(false);
        return
      }
      toast.error("An error occurred");
    }
  }
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <TextInput name='email' label="Email Address" placeholder="Enter Email Address" />
        <div>
          <Button
            type="submit"
            fullWidth={true}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending OTP..." : "Send OTP"}
          </Button>

        </div>
      </form>
    </FormProvider>
  )
}


const ChangePasswordFormSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
  confirmPassword: z.string(),
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d{6}$/, "OTP must be numeric"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

function ChangePassword({ email }: { email: string, setFormStatus: (value: "email" | "change-password") => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isVisible, toggleVisibility } = useTogglePasswordVisibility();
  const router = useRouter();

  const form = useForm<z.infer<typeof ChangePasswordFormSchema>>({
    resolver: zodResolver(ChangePasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      otp: ""
    },
  })

  const onSubmit = async (values: z.infer<typeof ChangePasswordFormSchema>) => {
    setIsSubmitting(true);
    try {
      const res = await authService.resetPassword({ email, password: values.password, otp: values.otp });
      if (res) {
        toast.success("Password changed successfully");
        setIsSubmitting(false);
        router.push("/auth/login");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "An error occurred");
        setIsSubmitting(false);
        return
      }
      toast.error("An error occurred");
    }
  }
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="relative">
          <TextInput name='password' type={isVisible ? "text" : "password"} label="New Password" placeholder="Enter your new password" />
          <div className="absolute top-12 right-4 cursor-pointer" onClick={toggleVisibility}>
            {
              isVisible ? <IoEyeOffOutline className="h-4 w-4" /> : <IoEyeOutline className="h-4 w-4" />
            }
          </div>
        </div>
        <div className="relative">
          <TextInput name='confirmPassword' type={isVisible ? "text" : "password"} label="Confirm Password" placeholder="Confirm your new password" />
          <div className="absolute top-12 right-4 cursor-pointer" onClick={toggleVisibility}>
            {
              isVisible ? <IoEyeOffOutline className="h-4 w-4" /> : <IoEyeOutline className="h-4 w-4" />
            }
          </div>
        </div>
        <TextInput name='otp' label="OTP" placeholder="Enter OTP sent to your email" />
        <div>
          <Button
            type="submit"
            fullWidth={true}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating Password..." : "Update Password"}
          </Button>

        </div>
      </form>
    </FormProvider>
  )
}
