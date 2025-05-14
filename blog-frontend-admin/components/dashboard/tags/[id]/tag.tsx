'use client'

import { TbMessage2 } from "react-icons/tb"
import BreadCrumb from "@/components/dashboard/blogs/[id]/bread-crumb";
import { useQuery } from "@tanstack/react-query"
import { BlogPostSkeleton } from "@/components/loaders"
import UpdateTag from "./update-tag";
import DeleteTag from "./delete-tag";
import { TagService } from "@/services/tag";

export type TagType = {
  id: string
  name: string
  createdAt: string
  posts: Array<{ id: string; title: string; description: string, publishedAt: string }>
}

async function getBlogById(id: string): Promise<{ data: TagType }> {
  try {
    const res = await TagService.getTagById(id);
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

export default function Tag({ id }: { id: string }) {
  const {
    isLoading,
    data: tag,
    error,
  } = useQuery({
    queryKey: ['tag', id],
    queryFn: () => getBlogById(id),
  });


  if (isLoading) {
    return <BlogPostSkeleton />;
  }

  if (error instanceof Error) {
    return <div className="text-red-500">Error: {error?.message}</div>;
  }

  if (!tag) return <p>Tag no found</p>

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <BreadCrumb blogTitle={tag?.data.name || ""} />
        <div className="flex gap-3">
          <UpdateTag tagData={tag.data} />
          <DeleteTag tagData={tag.data} />
        </div>
      </div>
      <div className='space-y-4 md:space-y-6'>
        <h1 className='font-semibold capitalize text-2xl md:text-3xl lg:text-5xl'>
          {tag?.data.name}
        </h1>
        <div className="flex justify-between items-center text-sm text-[#676767]">
          <div className='flex items-center'>
            <span>{new Date(tag?.data.createdAt || "").toDateString()}</span>
          </div>
          <div className='flex items-center gap-1 text-black font-medium text-base'>
            <TbMessage2 size={18} />
            <span>{tag?.data?.posts.length || 0} associated blog posts</span>
          </div>
        </div>
        {
          tag.data.posts.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {tag?.data?.posts.map((post: { id: string, title: string, description: string, publishedAt: string }) => (
                <div key={post.id} className="bg-white p-6 rounded-lg shadow-md space-y-2">
                  <h3 className="text-2xl font-semibold text-[#4682B4]">{post.title}</h3>
                  <p className="text-gray-700">{post.description}</p>
                  <div className="text-gray-500 text-sm">
                    <p>Published on: {new Date(post.publishedAt).toDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <h2 className="text-2xl font-bold text-gray-500">No blogs found</h2>
            </div>
          )
        }
      </div>
    </div>
  );
}
