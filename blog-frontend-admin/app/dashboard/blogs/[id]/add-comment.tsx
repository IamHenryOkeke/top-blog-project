'use client'

import { useState, useTransition } from "react";
import Modal from "@/components/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import { TextInput, TextInput2 } from "@/components/input";
import { BlogService } from "@/services/blog";
import { AxiosError } from "axios";
import { revalidateBlogPath } from "./action";

const addCommentSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  content: z.string().min(1, { message: "Comment is required" }),
});

export default function AddComment({ id }: { id: string }) {
  const [openModal, setOpenModal] = useState(false);
  const [isPending, startTransition] = useTransition();

  const methods = useForm<z.infer<typeof addCommentSchema>>({
    resolver: zodResolver(addCommentSchema),
  });

  const onSubmit = (data: z.infer<typeof addCommentSchema>) => {
    console.log(data)
    startTransition(async () => {
      try {
        const res = await BlogService.addCommentToBlog(id, data);
        if (res.status === 201) {
          toast.success("Comment added successfully");
          setOpenModal(false);
          methods.reset();
          revalidateBlogPath(id);
        }
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;

        if (err.response) {
          console.log("Error response:", err.response);
          toast.error(err.response.data?.message || "Something went wrong");
        } else if (err.request) {
          console.log("No response received:", err.request);
          toast.error("No response from server");
        } else {
          console.log("Error", err.message);
          toast.error("An unexpected error occurred");
        }
      }
    });
  };

  return (
    <div>
      <button
        onClick={() => setOpenModal(true)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-accent rounded-lg hover:bg-accent/80 transition duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M2.5 3a1 1 0 00-1 1v12a1 1 0 001 1h15a1 1 0 001-1V4a1 1 0 00-1-1H2.5zm0 2h15v10H2.5V5z" />
          <path d="M5 8h10v2H5V8zm0 3h10v2H5v-2zm0 3h10v2H5v-2z" />
        </svg>
        <span>Add Comment</span>
      </button>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} title="Add Comment">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <TextInput name='name' label="Name" placeholder="Name" />
            <TextInput2 name='content' label="Comment" placeholder="Comment" />
            <div className="flex justify-between">
              <button
                onClick={() => setOpenModal(false)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={isPending}
                className={`px-4 py-2 text-sm font-semibold text-white bg-accent rounded-lg hover:bg-accent/80 transition duration-300 ${isPending && "opacity-50 cursor-not-allowed"}`}
              >
                {isPending ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </div>
  )
}
