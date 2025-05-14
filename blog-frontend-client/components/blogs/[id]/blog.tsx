'use client'

import { TbMessage2 } from "react-icons/tb"
import { BsDot } from "react-icons/bs"
import Image from "next/image"
import { calculateReadTime } from "@/utils/helpers"
import MarkdownRenderer from "./markdown-renderer"
import { BlogService } from "@/services/blog"
// import { getAllComments } from "./comments"
import { useQuery } from "@tanstack/react-query"
import { BlogPostSkeleton } from "@/components/loaders"
import BreadCrumb from "./bread-crumb"
import { getAllComments } from "./comments"

export type BlogType = {
  id: string
  title: string
  description: string
  content: string
  thumbnailImage: string
  createdAt: string
  isPublished: boolean
  tags: Array<{ id: string; name: string }>
}

async function getBlogById(id: string): Promise<{ data: BlogType }> {
  try {
    const res = await BlogService.getBlogById(id);
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message = error.response?.data?.message || "Something went wrong";

    if (error.response?.status) {
      throw new Error(message, error.response?.status);
    }
    throw new Error(message);
  }
}

export default function Post({ id }: { id: string }) {
  const {
    isLoading: isLoadingPost,
    data: post,
    error: postError,
  } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => getBlogById(id),
  });

  const {
    isLoading: isLoadingComments,
    data: comments,
    error: commentsError,
  } = useQuery({
    queryKey: ['comments', id],
    queryFn: () => getAllComments(id),
  });

  if (isLoadingPost || isLoadingComments) {
    return <BlogPostSkeleton />;
  }

  if (postError instanceof Error || commentsError instanceof Error) {
    return <div className="text-red-500">Error: {postError?.message || commentsError?.message}</div>;
  }

  if (!post || !post.data) {
    return <div className="text-red-500">Blog post not found.</div>;
  }

  return (
    <div className="space-y-3">
      <BreadCrumb blogTitle={post.data.title} />
      <div className='space-y-4 md:space-y-6'>
        <div className='w-full'>
          <Image
            src={post.data.thumbnailImage || "./fallback.jpg"}
            alt={`Blog image: ${post.data.title}`}
            className='rounded-xl w-full h-[204px] md:h-[270px] object-cover'
            width={300}
            height={200}
          />
        </div>

        <div className="flex justify-between items-center text-sm text-[#676767]">
          <div className='flex items-center'>
            <span>{new Date(post.data.createdAt).toDateString()}</span>
            <BsDot size={20} />
            <span>{calculateReadTime(post.data.content)} mins read</span>
          </div>
          <div className='flex items-center gap-1 text-black font-medium text-base'>
            <TbMessage2 size={18} />
            <span>{comments?.data?.length || 0} Comments</span>
          </div>
        </div>
        <h1 className='font-semibold text-2xl md:text-3xl lg:text-5xl'>
          {post.data.title}
        </h1>
        <div className='flex flex-wrap gap-2'>
          {post.data.tags.map(tag => (
            <span
              key={tag.id}
              className='bg-[#F1F1F1] py-1.5 px-3 rounded-md text-xs font-semibold'
            >
              {tag.name}
            </span>
          ))}
        </div>
        <MarkdownRenderer markdown={post.data.content} />
      </div>
    </div>
  );
}
