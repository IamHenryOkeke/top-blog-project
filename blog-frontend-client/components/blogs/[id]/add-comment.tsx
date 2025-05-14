'use client'

import { useState } from "react";
import Modal from "@/components/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import { BlogService } from "@/services/blog";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "@/components/button";
import { TextInput, TextInput2 } from "@/components/text-input";

const addCommentSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  content: z.string().min(1, { message: "Comment is required" }),
});

const handleAddComment = async (id: string, payload: { [key: string]: string | number }) => {
  try {
    const res = await BlogService.addCommentToBlog(id, payload);
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

export default function AddComment({ id }: { id: string }) {
  const [openModal, setOpenModal] = useState(false);
  const queryClient = useQueryClient();

  const methods = useForm<z.infer<typeof addCommentSchema>>({
    resolver: zodResolver(addCommentSchema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id, payload }: { id: string, payload: { [key: string]: string | number } }) => handleAddComment(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', id] })
      toast.success("Comment added successfully");
      setOpenModal(false)
      methods.reset();
    },
    onError: (error) => {
      toast.error(error.message);
    }
  })

  const onSubmit = async (data: z.infer<typeof addCommentSchema>) => {
    await mutateAsync({ id, payload: data });
  };

  return (
    <div>
      <Button
        onClick={() => setOpenModal(true)}
      >
        <span>Add Comment</span>
      </Button>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} title="Add Comment">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <TextInput name='name' label="Name" placeholder="Name" />
            <TextInput2 name='content' label="Comment" placeholder="Comment" />
            <div className="flex justify-between">
              <Button
                variant="destructive"
                onClick={() => setOpenModal(false)}
              >
                Close
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={isPending}
                className={`px-4 py-2 text-sm font-semibold text-white bg-accent rounded-lg hover:bg-accent/80 transition duration-300 ${isPending && "opacity-50 cursor-not-allowed"}`}
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
