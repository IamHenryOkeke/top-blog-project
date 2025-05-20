'use client'

import { BlogService } from "@/services/blog";
import { BlogType } from "./blog"
import BlogCard from "@/components/blog-card"
import { AxiosError } from "axios";
import { BlogCardSkeleton } from "@/components/loaders";
import { useQuery } from "@tanstack/react-query";

export async function getRelatedPosts(id: string) {
  try {
    const res = await BlogService.getRelatedBlogs(id);
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
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

export default function RelatedPosts({ id }: { id: string }) {
  const { isLoading, data: blogPosts, error } = useQuery({
    queryKey: ['related-posts', id], queryFn: () => getRelatedPosts(id)
  })

  if (isLoading) return (
    <div className="grid md:grid-cols-2 gap-8">
      {Array.from({ length: 1 }).map((_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  );

  if (error instanceof Error) return <div>{error.message}</div>

  return (
    <div className='pb-10 md:pb-20 grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10'>
      {
        blogPosts.data.map((blog: (BlogType & { publishedAt: string })) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            title={blog.title}
            description={blog.description}
            publishedAt={blog.publishedAt}
          />
        ))}
    </div>
  )
}
