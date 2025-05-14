import BlogsSection from "@/components/blogs/blogs";
import Search from "@/components/search";
import Tag from "@/components/tag";
import { BlogService } from "@/services/blog";
import { Metadata } from "next";


async function getAllTags() {
  const res = await BlogService.getAllTags();
  const blog = res.data;
  return blog;
}

export const metadata: Metadata = {
  title: "Blogs | NmesomaHenry's Blog",
}

export default async function Blogs({ searchParams }: { searchParams: { [key: string]: string | number } }) {
  const params = {
    limit: 5,
    ...searchParams
  }
  const tags = await getAllTags();

  return (
    <main>
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
        <BlogsSection queryParams={params} />
      </section>
    </main >
  );
}
