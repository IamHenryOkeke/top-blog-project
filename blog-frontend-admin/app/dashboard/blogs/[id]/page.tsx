import BreadCrumb from "@/components/[id]/BreadCrumb";
import Post from "@/components/[id]/Post";
import { BlogService } from "@/services/blog";
import AddComment from "./add-comment";

async function getBlogById(id: string) {
  const res = await BlogService.getBlogById(id);
  const blog = res.data;
  return blog;
}

async function getBlogComments(id: string) {
  const res = await BlogService.getBlogComments(id);
  const blog = res.data;
  return blog;
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [blog, comments] = await Promise.all([
    getBlogById(id),
    getBlogComments(id)
  ]);

  return (
    <main>
      <div className='px-4 md:px-10 lg:px-24 py-10 lg:py-20'>
        <BreadCrumb blogTitle={blog.data.title} />
        <div className='pt-5 grid gap-4 lg:grid-cols-[1fr_0.5fr] lg:gap-14'>
          <Post blogPost={blog.data} commentsLength={comments.data.length} />
        </div>
        <div className="nt-10 lg:pt-20 space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">Comments</h2>
          <AddComment id={id} />
          <div className="grid gap-4">
            {
              comments.data.map((comment: { id: string, name: string, content: string, createdAt: string }) => (
                <div key={comment.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold">{comment.name}</h3>
                  <p className="text-gray-600">{comment.content}</p>
                  <p className="text-sm text-gray-500">{new Date(comment.createdAt).toDateString()}</p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </main>
  )
}