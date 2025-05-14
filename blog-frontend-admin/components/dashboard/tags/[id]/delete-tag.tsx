'use client'

import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "@/components/modal";
import { AxiosError } from "axios";
import Button from "@/components/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { TagType } from "./tag";
import { TagService } from "@/services/tag";

const deleteTag = async (id: string) => {
  try {
    const res = await TagService.deleteTag(id);
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

export default function DeleteTag({ tagData }: { tagData: TagType }) {
  const [openModal, setOpenModal] = useState(false);
  const queryClient = useQueryClient();
  const { push } = useRouter();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: () => deleteTag(tagData.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] })
      toast.success("Tag deleted successfully")
      setOpenModal(false)
      push("/dashboard/tags")
    },
    onError: (error) => {
      toast.error(error.message);
    }
  })

  const handleDeleteBlogPost = async () => {
    await mutateAsync()
  }

  return (
    <div>
      <Button
        onClick={() => setOpenModal(true)}
      >
        <span>Delete Blog</span>
      </Button>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} title={`Delete ${tagData.name} tag?`}>
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setOpenModal(false)}
          >
            Close
          </Button>
          <Button
            type="submit"
            variant="destructive"
            disabled={isPending}
            onClick={handleDeleteBlogPost}
          >
            {isPending ? "Deleting. Please wait..." : "Yes, Delete"}
          </Button>
        </div>
      </Modal>
    </div>
  )
}
