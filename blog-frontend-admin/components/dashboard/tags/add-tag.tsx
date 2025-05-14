'use client'

import { useState } from "react";
import Modal from "@/components/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import { TextInput } from "@/components/input";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "@/components/button";
import { TagService } from "@/services/tag";

export const addTagSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

const handleAddTag = async (payload: { [key: string]: string | number }) => {
  try {
    const res = await TagService.addTag(payload);
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

export default function AddTag() {
  const [openModal, setOpenModal] = useState(false);
  const queryClient = useQueryClient();

  const methods = useForm<z.infer<typeof addTagSchema>>({
    resolver: zodResolver(addTagSchema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ payload }: { payload: { [key: string]: string | number } }) => handleAddTag(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] })
      toast.success("Tag added successfully");
      setOpenModal(false)
      methods.reset();
    },
    onError: (error) => {
      toast.error(error.message);
    }
  })

  const onSubmit = async (data: z.infer<typeof addTagSchema>) => {
    await mutateAsync({ payload: data });
  };

  return (
    <div>
      <Button
        onClick={() => setOpenModal(true)}
      >
        <span>Add Tag</span>
      </Button>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} title="Add Tag">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <TextInput name='name' label="Name" placeholder="Name" />
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
