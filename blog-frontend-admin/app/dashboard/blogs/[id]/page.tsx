import Post from "@/components/dashboard/blogs/[id]/blog";
import { BlogService } from "@/services/blog";
import AddComment from "@/components/dashboard/blogs/[id]/add-comment";
import CommentsSection from "@/components/dashboard/blogs/[id]/comments";
import { Metadata } from "next";


export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata | undefined> {
  try {
    const res = await BlogService.getBlogById(params.id);
    const blog = res.data.data;
    return {
      title: blog.title,
      description: blog.description,
    }
  } catch (error) {
    console.log(error)
  }
}


export default async function page({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <main className='px-4 md:px-6 lg:px-10 py-10 lg:py-20'>
      <div className='lg:flex gap-4 lg:gap-14'>
        <Post id={id} />
        <div className="space-y-2 lg:w-1/3">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Comments</h2>
            <AddComment id={id} />
          </div>
          <CommentsSection id={id} />
        </div>
      </div>
    </main>
  )
}