export default function Home() {
  return (
    <main className="">
      <section className="text-center py-12">
        <h2 className="text-4xl font-bold mb-4">Welcome to My Blog</h2>
        <p className="text-lg text-gray-600">Thoughts, stories, and ideas worth sharing.</p>
      </section>


      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid gap-8">

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-[#4682B4] mb-2">First Blog Post</h3>
            <p className="text-gray-700 mb-4">This is a short preview of my first blog post. Click below to read more.</p>
            <a href="#" className="inline-block bg-[#4682B4] text-white px-4 py-2 rounded hover:bg-[#3A6E99] transition">Read More</a>
          </div>


          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-[#4682B4] mb-2">Another Story</h3>
            <p className="text-gray-700 mb-4">A glimpse into another adventure and what I learned along the way.</p>
            <a href="#" className="inline-block bg-[#4682B4] text-white px-4 py-2 rounded hover:bg-[#3A6E99] transition">Read More</a>
          </div>
        </div>
      </section>


      
    </main>
  );
}
