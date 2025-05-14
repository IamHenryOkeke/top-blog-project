'use client'

import { CommentCardSkeleton } from "@/components/loaders";
import { BlogService } from "@/services/blog";
import { useQuery } from "@tanstack/react-query"
import CommentCard from "./comment-card";

export async function getAllComments(id: string) {
  try {
    const res = await BlogService.getBlogComments(id);
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || "Something went wrong";

      // Handle 400 error specifically
      if (status === 400) {
        console.error("400 Error:", message);
        throw new Error("Invalid request. Please check your filters or parameters.");
      }

      // Handle other known HTTP errors
      console.error(`Error ${status}:`, message);
      throw new Error(message);
    }

    // Handle network or unexpected errors
    console.error("Unexpected error:", error);
    throw new Error("An unexpected error occurred. Please try again later.");
  }
}


export default function CommentsSection({ id }: { id: string }) {
  const { isLoading, data: comments, error } = useQuery({
    queryKey: ['comments', id], queryFn: () => getAllComments(id)
  })

  if (isLoading) return (
    <div className="grid md:grid-cols-2 gap-8">
      {Array.from({ length: 4 }).map((_, i) => (
        <CommentCardSkeleton key={i} />
      ))}
    </div>
  );

  if (error instanceof Error) return <div>{error.message}</div>

  return (
    <div>
      {
        comments.data.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-8 lg:gap-4">
            {
              comments.data.map((comment: { id: string, name: string, content: string, createdAt: string }) => (
                <CommentCard key={comment.id} blogId={id} comment={comment} />
              ))
            }
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <h2 className="text-2xl font-bold text-gray-500">No Comment found</h2>
          </div>
        )
      }
    </div>
  )
}
