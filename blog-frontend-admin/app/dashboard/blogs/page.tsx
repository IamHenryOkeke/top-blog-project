import BlogCard from "@/components/blog-card";
import Pagination from "@/components/pagination";
import Search from "@/components/search";
import Tag from "@/components/tag";
import { BlogService } from "@/services/blog";
import AddBlog from "./add-blog";

async function getAllBlogs(payload: { [key: string]: string | number }) {
  try {
    const res = await BlogService.getAllBlogs(payload);
    return res.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return null;
  }
}

async function getAllTags() {
  try {
    const res = await BlogService.getAllTags();
    return res.data;
  } catch (error) {
    console.error("Error fetching tags:", error);
    return null;
  }
}

export default async function Blogs({ searchParams }: { searchParams: { [key: string]: string | number } }) {
  const [blogs, tags] = await Promise.all([
    getAllBlogs({
      limit: 5,
      ...searchParams
    }),
    getAllTags()
  ]);

  if (!blogs || !tags) {
    return (
      <main className="px-4 lg:px-10">
        <section className="pt-12 flex items-center justify-between">
          <h2 className="text-2xl md:text-4xl font-bold text-accent">All Blog Posts</h2>
          <AddBlog tags={tags} />
        </section>
        <section className="max-w-4xl mx-auto py-8">
          <div className="mb-3 space-y-3">
            <Search />
            <div>
              <h2 className="text-2xl font-bold text-gray-500">Filter by Tags</h2>
              <p className="text-gray-500">Click on a tag to filter blogs by that tag.</p>
              <Tag tags={tags.data} />
            </div>
          </div>
        </section>
        <h2 className="text-2xl text-red-500 font-semibold">Failed to load blogs or tags. Please try again later.</h2>
      </main>
    );
  }

  return (
    <main className="px-4 lg:px-10">
      <section className="pt-12 flex items-center justify-between">
        <h2 className="text-2xl md:text-4xl font-bold text-accent">All Blog Posts</h2>
        <AddBlog tags={tags.data} />
      </section>
      <section className="max-w-4xl mx-auto py-8">
        <div className="mb-3 space-y-3">
          <Search />
          <div>
            <h2 className="text-2xl font-bold text-gray-500">Filter by Tags</h2>
            <p className="text-gray-500">Click on a tag to filter blogs by that tag.</p>
            <Tag tags={tags.data} />
          </div>
        </div>
        {
          blogs.data.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {blogs.data.map((blog: { id: string, title: string, description: string, createdAt: string }) => (
                <BlogCard
                  key={blog.id}
                  id={blog.id}
                  title={blog.title}
                  description={blog.description}
                  createdAt={blog.createdAt}
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
      </section>
    </main>
  );
}

