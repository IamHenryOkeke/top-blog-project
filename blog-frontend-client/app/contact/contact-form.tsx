'use client';

import { useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { TextInput, TextInput2 } from "@/components/text-input";
import { AxiosError } from "axios";
import Button from "@/components/button";

const contactSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(1, { message: "Message is required" }),
});

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();

  const methods = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: z.infer<typeof contactSchema>) => {
    startTransition(async () => {
      try {
        const mailtoLink = `mailto:iamhenryokeke@gmail.com?subject=Message from ${encodeURIComponent(
          data.name
        )}&body=${encodeURIComponent(`Email: ${data.email}\n\nMessage:\n${data.message}`)}`;

        window.location.href = mailtoLink;

        toast.success("Opening your email app...");
        methods.reset();
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        if (err.response) {
          toast.error(err.response.data?.message || "Something went wrong");
        } else if (err.request) {
          toast.error("No response from server");
        } else {
          console.log("Error", err.message);
          toast.error("An unexpected error occurred");
        }
      }
    });
  };

  return (
    <div className="min-h-screen px-4 py-12 flex flex-col items-center bg-gray-50">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-center mb-6">Contact Me</h1>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="bg-white p-8 rounded-2xl shadow-md space-y-6">
            <TextInput name="name" label="Name" placeholder="Your Name" />
            <TextInput name="email" label="Email" placeholder="Your Email" />
            <TextInput2 name="message" label="Message" placeholder="Your Message" />

            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={isPending}
                className={`px-6 py-2 text-white font-semibold bg-accent rounded-lg hover:bg-accent/80 transition duration-300 ${isPending && "opacity-50 cursor-not-allowed"}`}
              >
                {isPending ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
