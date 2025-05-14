'use client'

import Button from '@/components/button'
import Modal from '@/components/modal'
import { CommentService } from '@/services/comment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BsTrash } from 'react-icons/bs';

const deleteComment = async (blogId: string, commentId: string) => {
  try {
    const res = await CommentService.deleteComment(blogId, commentId)
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

export default function CommentCard({ blogId, comment }: { blogId: string, comment: { id: string, name: string, content: string, createdAt: string } }) {
  const [openModal, setOpenModal] = useState(false);
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: () => deleteComment(blogId, comment.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', blogId] })
      toast.success("Comment deleted successfully")
      setOpenModal(false)
    },
    onError: (error) => {
      toast.error(error.message);
    }
  })

  const handleDeleteComment = async () => {
    await mutateAsync()
  }

  return (
    <div>
      <div key={comment.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold">{comment.name}</h3>
          <Button variant="outline" onClick={() => setOpenModal(true)}>
            <BsTrash className="text-red-600" />
          </Button>
        </div>
        <p className="text-gray-600">{comment.content}</p>
        <p className="text-sm text-gray-500">{new Date(comment.createdAt).toDateString()}</p>
      </div>
      <Modal title="Delete Comment?" isOpen={openModal} onClose={() => setOpenModal(false)}>
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
            onClick={handleDeleteComment}
            className={`px-4 py-2 text-sm font-semibold text-white bg-accent rounded-lg hover:bg-accent/80 transition duration-300 ${isPending && "opacity-50 cursor-not-allowed"}`}
          >
            {isPending ? "Deleting. Please wait..." : "Yes, Delete"}
          </button>
        </div>
      </Modal>
    </div>
  )
}
