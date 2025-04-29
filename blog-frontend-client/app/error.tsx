'use client' // Error components must be Client Components

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-gray-50">
      <div className="max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-6">
          An unexpected error occurred. Please try again or contact support if the issue persists.
        </p>
        <button
          onClick={() => reset()}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
        >
          Try again
        </button>
      </div>
    </div>
  )
}