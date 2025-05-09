'use client'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import useTogglePasswordVisibility from "@/hooks/useTogglePasswordVisibility"
import CardWrapper from "@/components/auth/card-wrapper"
import { TextInput } from "@/components/input";
import { useState } from "react";
import Button from "@/components/button";
import { authService } from "@/services/auth";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import useAuthStore from "@/store/auth";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({ message: "Must be a valid email" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
})

export default function LoginForm() {
  const { isVisible, toggleVisibility } = useTogglePasswordVisibility();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setToken, setLoggedIn, setUserProfile } = useAuthStore();
  const { push } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const res = await authService.login(values);
      if(res) {
        setToken(res.token);
        setUserProfile(res.user);
        setLoggedIn(true);
        toast.success("Login successful");
        push("/dashboard/home");
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
    <CardWrapper
      title='Login'
      description='Welcome back'
      footerPara='Forgot your password?'
      footerLink={{
        href: "/auth/reset-password",
        text: "Reset Password"
      }}
    >
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <TextInput name='email' label="Email Address" placeholder="Enter Email Address" />
          <div className="relative">
            <TextInput name='password' type={isVisible ? "text" : "password"} label="Password" placeholder="Enter your password" />
            <div className="absolute top-12 right-4 cursor-pointer" onClick={toggleVisibility}>
              {
                isVisible ? <IoEyeOffOutline className="h-4 w-4" /> : <IoEyeOutline className="h-4 w-4" />
              }
            </div>
          </div>
          <div>
            <Button
              type="submit"
              fullWidth={true}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging In..." : "Log In"}
            </Button>

          </div>
        </form>
      </FormProvider>
    </CardWrapper>
  )
}
