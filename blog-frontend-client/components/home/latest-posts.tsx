'use client'

import Link from "next/link"
import BlogCard from "../blog-card"
import { useQuery } from "@tanstack/react-query";
import { BlogCardSkeleton } from "../loaders";
import { BlogService } from "@/services/blog";
import { AxiosError } from "axios";

async function getLatestBlogs() {
  try {
    const res = await BlogService.getLatestBlogs();
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

export default function LatestPosts() {
  const { isLoading, data: blogs, error } = useQuery({
    queryKey: ['latest-blogPosts'], queryFn: () => getLatestBlogs()
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
    <section className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {
          blogs.data.map((blog: { id: string, title: string, description: string, publishedAt: string }) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              title={blog.title}
              description={blog.description}
              publishedAt={blog.publishedAt}
            />
          ))
        }
      </div>
      <div className="text-center mt-8">
        <Link href="/blogs" className="inline-block bg-[#4682B4] text-white px-4 py-2 rounded hover:bg-[#3A6E99] transition">View All Blogs</Link>
      </div>
    </section>
  )
}
