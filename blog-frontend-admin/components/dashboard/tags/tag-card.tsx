import Link from "next/link";

type TagCardProps = {
  id: string;
  name: string;
}

export default function TagCard({ id, name }: TagCardProps) {
  return (
    <div>
      <Link
        href={`./tags/${id}`}
        className="px-4 py-2 rounded-lg text-sm font-semibold bg-gray-200 text-gray-700 hover:bg-accent hover:text-white transition duration-300"
      >
        {name}
      </Link>
    </div>
  )
}
