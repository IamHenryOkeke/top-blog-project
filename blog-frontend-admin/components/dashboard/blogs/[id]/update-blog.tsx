'use client'

import { useState } from "react";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BlogType } from "./blog";
import { TagService } from "@/services/tag";
import Image from "next/image";
import { addBlogSchema } from "../add-blog";
import CustomCheckbox from "@/components/input-checkbox";

const updateBlogSchema = addBlogSchema.partial().merge(z.object({
  isPublished: z.boolean().optional(),
}));

const getTags = async () => {
  try {
    const res = await TagService.getAllTags({});
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    if (err.response) {
      throw new Error(err.response.data?.message || "Something went wrong");
    } else if (err.request) {
      throw new Error("No response from server");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}

const handleUpdateBlogPost = async (id: string, payload: FormData) => {
  try {
    const res = await BlogService.updateBlog(id, payload);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    if (err.response) {
      throw new Error(err.response.data?.message || "Something went wrong");
    } else if (err.request) {
      throw new Error("No response from server");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }

}

export default function UpdateBlog({ blogData }: { blogData: BlogType }) {
  const [openModal, setOpenModal] = useState(false);
  const queryClient = useQueryClient()

  const {
    isLoading,
    data: tags,
    error,
  } = useQuery({
    queryKey: ['tags'],
    queryFn: getTags
  });

  console.log(blogData)

  const form = useForm<z.infer<typeof updateBlogSchema>>({
    resolver: zodResolver(updateBlogSchema),
    defaultValues: {
      title: blogData.title,
      description: blogData.description,
      content: blogData.content,
      tags: blogData.tags.map((tag) => tag.id),
      isPublished: blogData.isPublished
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("thumbnailImage", file);
    }
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id, payload }: { id: string, payload: FormData }) => handleUpdateBlogPost(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog', blogData.id] })
      toast.success("Blog updated successfully");
      setOpenModal(false)
      form.reset();
    },
    onError: (error) => {
      toast.error(error.message);
    }
  })

  const onSubmit = async (data: z.infer<typeof updateBlogSchema>) => {
    const formData = new FormData();
    formData.append("title", data.title || "");
    formData.append("description", data.description || "");
    formData.append("content", data.content || "");
    formData.append("thumbnailImage", data.thumbnailImage || "");
    formData.append('tags', JSON.stringify(data.tags));
    formData.append('isPublished', data.isPublished !== undefined ? String(data.isPublished) : "");
    console.log(formData)
    await mutateAsync({ id: blogData.id, payload: formData })
  };

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (error instanceof Error) {
    return <div className="text-red-500">Error: {error?.message}</div>;
  }

  return (
    <div>
      <Button
        onClick={() => setOpenModal(true)}
      >
        <span>Update Blog</span>
      </Button>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} title="Update Blog">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
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
              <p>Current Image</p>
              <Image src={blogData.thumbnailImage} alt={blogData.title} width={300} height={150} className="w-full" />
              {form.formState.errors["thumbnailImage"] && <p className="text-red-500 text-sm">{(form.formState.errors["thumbnailImage"])?.message as string}</p>}
            </div>
            <fieldset className="space-y-2">
              <legend className="font-medium">Tags:</legend>
              {tags.data.map((tag: { id: string, name: string }) => (
                <label key={tag.id} className="block w-fit capitalize">
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
                <MarkdownEditor label="Content" name="content" value={field.value || ""} onChange={field.onChange} />
              )}
            />
            <CustomCheckbox name="isPublished" control={form.control} label="Publish Post" />
            <div className="flex justify-between">
              <Button
                variant="destructive"
                onClick={() => {
                  form.reset()
                  setOpenModal(false)
                }}
              >
                Close
              </Button>
              <Button
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </div>
  )
}
