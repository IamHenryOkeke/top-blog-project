'use client'

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import { IoChevronForward } from "react-icons/io5";

export default function BreadCrumb({ blogTitle }: { blogTitle: string }) {
  const router = useRouter()

  return (
    <section className="text-sm md:text-lg flex gap-1 md:gap-2 items-center">
      <button onClick={() => router.back()} className="text-primary flex gap-1 md:gap-2 items-center">
        <FaArrowLeft />
        <span>Back</span>
      </button>
      <IoChevronForward className="text-primary" />
      <span className="text-[#676767]">{blogTitle || "No blog title"}</span>
    </section>
  )
}
