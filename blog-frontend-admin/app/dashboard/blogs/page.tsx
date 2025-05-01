import BlogCard from "@/components/blog-card";
import Pagination from "@/components/pagination";
import Search from "@/components/search";
import Tag from "@/components/tag";
import { BlogService } from "@/services/blog";


async function getAllBlogs(payload: { [key: string]: string | number }) {
  const res = await BlogService.getAllBlogs(payload);
  const blogs = res.data;
  return blogs;
}

async function getAllTags() {
  const res = await BlogService.getAllTags();
  const blog = res.data;
  return blog;
}

export default async function Blogs({ searchParams }: { searchParams: { [key: string]: string | number } }) {
  const [blogs, tags] = await Promise.all([
    getAllBlogs({
      limit: 5,
      ...searchParams
    }),
    getAllTags()
  ]);
  return (
    <main className="">
      <section className="text-center pt-12">
        <h2 className="text-4xl font-bold text-accent">All Blog Posts</h2>
      </section>
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-3 space-y-3">
          <Search />
          <div>
            <h2 className="text-2xl font-bold text-gray-500">Filter by Tags</h2>
            <p className="text-gray-500">Click on a tag to filter blogs by that tag.</p>
            <Tag tags={tags.data} />
          </div>
        </div>
        {
          blogs && blogs.data.length > 0 ?
            <div className="grid md:grid-cols-2 gap-8">
              {
                blogs.data.map((blog: { id: string, title: string, description: string, createdAt: string }) => (
                  <BlogCard
                    key={blog.id}
                    id={blog.id}
                    title={blog.title}
                    description={blog.description}
                    createdAt={blog.createdAt}
                  />
                ))
              }
            </div>
            :
            <div className="flex justify-center items-center">
              <h2 className="text-2xl font-bold text-gray-500">No blogs found</h2>
            </div>
        }
        <Pagination totalPages={blogs.pagination.totalPages} currentPage={blogs.pagination.page} />
      </section>
    </main >
  );
}
