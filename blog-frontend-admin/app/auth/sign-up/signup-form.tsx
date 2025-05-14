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
import { useRouter } from "next/navigation";

export const formSchema = z.object({
  name: z.string({ message: "Name is required" }).min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string({ message: "Email is required" }).email({ message: "Email must be valid" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" })
});

export default function SignUpForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isVisible, toggleVisibility } = useTogglePasswordVisibility();
  const { push } = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const res = await authService.signUp(values);
      if (res) {
        toast.success("Sign Up successful");
        push("/auth/login")
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
      title='Sign Up'
      footerPara='Already have an account?'
      footerLink={{
        href: "/auth/login",
        text: "Log in"
      }}
    >
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <TextInput name='name' label="Name" placeholder="Enter your name" />
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
              {isSubmitting ? "Signing up..." : "Sign up"}
            </Button>

          </div>
        </form>
      </FormProvider>
    </CardWrapper>
  )
}
