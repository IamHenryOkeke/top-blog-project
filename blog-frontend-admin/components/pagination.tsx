'use client'

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import ReactPaginate from "react-paginate";

export default function Pagination({ pageCount }: { pageCount: number }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const handlePageClick = (event: { selected: number }) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', (event.selected + 1).toString())
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <ReactPaginate
      breakLabel="..."
      className="flex justify-center items-center gap-4 my-4"
      previousLabel={<div className="flex p-2 text-white bg-accent rounded-lg"><HiChevronLeft /></div>}
      nextLabel={<div className="flex p-2 text-white bg-accent rounded-lg"><HiChevronRight /></div>}
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      pageLinkClassName="rounded-lg p-2 hover:bg-accent hover:text-white transition duration-300"
      activeLinkClassName="bg-accent text-white rounded-lg p-2"
      renderOnZeroPageCount={null}
    />
  )
}
