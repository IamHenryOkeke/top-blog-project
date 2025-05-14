import LatestPosts from "@/components/home/latest-posts";

export default async function Home() {
  return (
    <main className="">
      <section className="text-center py-12">
        <h2 className="text-4xl font-bold mb-4">Welcome to My Blog</h2>
        <p className="text-lg text-gray-600">Tips, Thoughts, Stories, and Ideas worth sharing.</p>
      </section>

      <section className="bg-[#4682B4] text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Latest Posts</h2>
          <p className="text-lg">Stay updated with my latest articles and insights.</p>
        </div>
      </section>
      <LatestPosts />
    </main>
  );
}
