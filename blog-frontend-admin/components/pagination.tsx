'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  maxVisiblePages?: number;
}

export default function Pagination({ currentPage,totalPages, maxVisiblePages = 5}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname()
  if (totalPages < 1) return null;

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    const showLeftDots = currentPage > maxVisiblePages - 2;
    const showRightDots = currentPage < totalPages - (maxVisiblePages - 3);

    const firstPage = 1;
    const lastPage = totalPages;

    const siblings = Math.floor((maxVisiblePages - 3) / 2);
    const leftSibling = Math.max(currentPage - siblings, 2);
    const rightSibling = Math.min(currentPage + siblings, totalPages - 1);

    pages.push(firstPage);

    if (showLeftDots) {
      if (leftSibling > 2) pages.push("...");
    }

    for (let i = leftSibling; i <= rightSibling; i++) {
      pages.push(i);
    }

    if (showRightDots) {
      if (rightSibling < totalPages - 1) pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(lastPage);
    }

    return pages;
  };

  const handlePageClick = ( page: number ) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex gap-2 items-center justify-center mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageClick(1)}
        className="px-2 py-1 text-sm border rounded disabled:opacity-50"
      >
        First
      </button>

      <button
        disabled={currentPage === 1}
        onClick={() => handlePageClick(currentPage - 1)}
        className="px-2 py-1 text-sm border rounded disabled:opacity-50"
      >
        Prev
      </button>

      {getPageNumbers().map((page, idx) =>
        typeof page === "string" ? (
          <span key={`ellipsis-${idx}`} className="px-2 py-1 text-sm">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`px-3 py-1 text-sm border rounded ${
              page === currentPage
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageClick(currentPage + 1)}
        className="px-2 py-1 text-sm border rounded disabled:opacity-50"
      >
        Next
      </button>

      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageClick(totalPages)}
        className="px-2 py-1 text-sm border rounded disabled:opacity-50"
      >
        Last
      </button>
    </div>
  );
};

