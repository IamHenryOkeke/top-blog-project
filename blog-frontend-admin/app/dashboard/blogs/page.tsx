import Search from "@/components/search";
import Tag from "@/components/tag";
import AddBlog from "@/components/dashboard/blogs/add-blog";
import BlogsSection from "@/components/dashboard/blogs/blogs";
import { TagService } from "@/services/tag";

async function getAllTags() {
  try {
    const res = await TagService.getAllTags({});
    return res.data;
  } catch (error) {
    console.error("Error fetching tags:", error);
    return null;
  }
}

export default async function Blogs({ searchParams }: { searchParams: { [key: string]: string | number } }) {
  const params = {
    limit: 5,
    ...searchParams
  }

  const tags = await getAllTags()
  return (
    <main className="px-4 lg:px-10">
      <section className="pt-12 flex items-center justify-between">
        <h2 className="text-2xl md:text-4xl font-bold text-accent">All Blog Posts</h2>
        <AddBlog tags={tags.data} />
      </section>
      <section className="max-w-4xl mx-auto py-8 space-y-3">
        <Search placeholder="Search for posts....." />
        <div>
          <h2 className="text-2xl font-bold text-gray-500">Filter by Tags</h2>
          <p className="text-gray-500">Click on a tag to filter blogs by that tag.</p>
          <Tag tags={tags.data} />
        </div>
        <BlogsSection queryParams={params} />
      </section>
    </main>
  );
}

