import { TbMessage2 } from "react-icons/tb"
import { BsDot } from "react-icons/bs"
import Image from "next/image"
import { calculateReadTime } from "@/utils/helpers"
import MarkdownRenderer from "./MarkdownRenderer"

type BlogType = {
  id: string
  title: string
  description: string
  content: string
  thumbnailImage: string
  createdAt: string
  tags: Array<{ id: string; name: string }>
  comments: Array<{ id: string; content: string }>
}
export default function Post ({ blogPost, commentsLength }: { blogPost: BlogType, commentsLength: number }) {
  return (
    <div className='space-y-2 md:space-y-5'>
      <div className='w-full'>
        <Image src={blogPost?.thumbnailImage || ""} alt={`Blog image: ${blogPost.title}`} className='rounded-xl w-full h-[204px] md:h-[270px] object-cover' width={300} height={200} />
      </div>
      <div className="flex justify-between items-center">
        <div className='text-[#676767] flex items-center text-sm'>
          <span>{new Date(blogPost.createdAt).toDateString()}</span>
          <BsDot size={20} />
          <span>{calculateReadTime(blogPost.content)} mins read time</span>
        </div>
        <div className='text-base flex gap-1 items-center text-black font-medium'>
          <TbMessage2 size={25} />
          <span>{commentsLength} Comments</span>
        </div>
      </div>
      <h3 className='font-semibold text-2xl md:text-3xl lg:text-5xl'>{blogPost.title}</h3>
      <div className="flex justify-between">
        <div className="flex gap-4">
          <div className='flex gap-1 items-center text-xs font-semibold'>
            {
              blogPost.tags.map((tag: { id: string, name: string }) => (
                <span key={tag.id} className='bg-[#F1F1F1] py-2 px-3 rounded-md'>{tag.name}</span>
              ))
            }
          </div>
        </div>
      </div>
      <article className='space-y-2 text-base lg:text-xl 2xl:text-2xl text-[#3E3D34] prose prose-p:my-2 prose-a:text-primary'>
        <MarkdownRenderer markdown={blogPost.content} />
      </article>
    </div>
  )
}
