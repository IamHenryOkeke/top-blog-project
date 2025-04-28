import Link from "next/link";

type BlogCardProps = {
  id: string;
  title: string;
  description: string;
  createdAt: string
}

export default function BlogCard({ id, title, description, createdAt }: BlogCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-2">
      <h3 className="text-2xl font-semibold text-[#4682B4]">{title}</h3>
      <p className="text-gray-700">{description}</p>
      <div className="text-gray-500 text-sm">
        <p>Published on: {new Date(createdAt).toDateString()}</p>
      </div>
      <div className="mt-2">
        <Link href={`/blogs/${id}`} className="inline-block bg-[#4682B4] text-white px-4 py-2 rounded hover:bg-[#3A6E99] transition">Read More</Link>
      </div>
    </div>
  )
}
