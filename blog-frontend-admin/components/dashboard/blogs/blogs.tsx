'use client'

import BlogCard from "@/components/dashboard/blogs/blog-card";
import { BlogCardSkeleton } from "@/components/loaders";
import Pagination from "@/components/pagination";
import { BlogService } from "@/services/blog";
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios";

async function getAllBlogs(payload: { [key: string]: string | number }) {
  try {
    const res = await BlogService.getAllBlogs(payload);
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


export default function BlogsSection({ queryParams }: { queryParams: { [key: string]: string | number } }) {
  const { isLoading, data: blogs, error } = useQuery({
    queryKey: ['blogs', queryParams], queryFn: () => getAllBlogs(queryParams)
  })

  if (isLoading) return (
    <div className="grid md:grid-cols-2 gap-8">
      {Array.from({ length: 4 }).map((_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  );

  if (error instanceof Error) return <div>{error.message}</div>;

  return (
    <div>
      {
        blogs.data.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {blogs.data.map((blog: { id: string, title: string, description: string, publishedAt: string, createdAt: string }) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                description={blog.description}
                publishedAt={blog.publishedAt || blog.createdAt}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <h2 className="text-2xl font-bold text-gray-500">No blogs found</h2>
          </div>
        )
      }
      <Pagination totalPages={blogs.pagination.totalPages} currentPage={blogs.pagination.page} />
    </div>
  )
}
