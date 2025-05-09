'use client'

import { useState, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "@/components/modal";
import { TextInput } from "@/components/input";
import { BlogService } from "@/services/blog";
import { AxiosError } from "axios";
import Button from "@/components/button";
import MarkdownEditor from "@/components/markdown-editor";

export const addBlogSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters long" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters long" }),
  content: z.string().min(20, { message: "Content must be at least 20 characters long" }),
  thumbnailImage: z
    .instanceof(File, { message: "Image is required" })
    .refine(
      (file) => ["image/png", "image/jpeg", "image/jpg"].includes(file.type),
      { message: "Invalid image file type. Only PNG and JPG are allowed." }
    )
    .refine(
      (file) => file.size <= 2 * 1024 * 1024, // 2MB in bytes
      { message: "Image must be less than or equal to 2MB" }
    ),
  tags: z.array(z.string()).min(1, 'Select at least one tag')
});

export default function AddBlog({ tags }: { tags: { id: string, name: string }[] }) {
  const [openModal, setOpenModal] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof addBlogSchema>>({
    resolver: zodResolver(addBlogSchema)
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("thumbnailImage", file);
    }
  };

  const onSubmit = (data: z.infer<typeof addBlogSchema>) => {
    console.log(data)
    startTransition(async () => {
      try {
        const res = await BlogService.addBlog(data);
        if (res.status === 201) {
          toast.success("Comment added successfully");
          setOpenModal(false);
          form.reset();
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
      <Button
        onClick={() => setOpenModal(true)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M2.5 3a1 1 0 00-1 1v12a1 1 0 001 1h15a1 1 0 001-1V4a1 1 0 00-1-1H2.5zm0 2h15v10H2.5V5z" />
          <path d="M5 8h10v2H5V8zm0 3h10v2H5v-2zm0 3h10v2H5v-2z" />
        </svg>
        <span>Add Blog</span>
      </Button>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} title="Add Blog">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <TextInput name='title' label="Title" placeholder="Enter title" />
            <TextInput name='description' label="Description" placeholder="Enter description" />
            <div className="w-full flex flex-col gap-2">
              <label htmlFor='thumbnailImage' className="text-lg font-medium">Image</label>
              <input
                className="border pl-3 py-2 rounded-md border-accent focus:outline-none"
                onChange={handleFileChange}
                name='thumbnailImage'
                type="file"
                accept="image/*"
              />
              {form.formState.errors["thumbnailImage"] && <p className="text-red-500 text-sm">{(form.formState.errors["thumbnailImage"])?.message as string}</p>}
            </div>
            <fieldset className="space-y-2">
              <legend className="font-medium">Tags:</legend>
              {tags.map((tag) => (
                <label key={tag.id} className="block capitalize">
                  <input
                    type="checkbox"
                    value={tag.id}
                    {...form.register('tags')}
                    className="mr-2"
                  />
                  {tag.name}
                </label>
              ))}
              {form.formState.errors.tags && (
                <p className="text-red-500">{form.formState.errors.tags.message}</p>
              )}
            </fieldset>
            <Controller
              name="content"
              control={form.control}
              render={({ field }) => (
                <MarkdownEditor label="Content" name="content" value={field.value} onChange={field.onChange} />
              )}
            />
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
