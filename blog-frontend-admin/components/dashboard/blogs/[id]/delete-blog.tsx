'use client'

import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "@/components/modal";
import { BlogService } from "@/services/blog";
import { AxiosError } from "axios";
import Button from "@/components/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BlogType } from "./blog";
import { useRouter } from "next/navigation";

const deleteBlogPost = async (id: string) => {
  try {
    const res = await BlogService.deleteteBlog(id);
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

export default function DeleteBlog({ blogData }: { blogData: BlogType }) {
  const [openModal, setOpenModal] = useState(false);
  const queryClient = useQueryClient();
  const { push } = useRouter();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: () => deleteBlogPost(blogData.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      toast.success("Blog deleted successfully")
      setOpenModal(false)
      push("/dashboard/blogs")
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
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} title={`Delete ${blogData.title} Blog?`}>
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
