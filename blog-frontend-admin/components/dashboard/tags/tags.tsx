'use client'

import { TagCardSkeleton } from "@/components/loaders";
import { TagService } from "@/services/tag";
import { useQuery } from "@tanstack/react-query"
import TagCard from "./tag-card";

async function getAllTags(payload: { [key: string]: string | number }) {
  try {
    const res = await TagService.getAllTags(payload);
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || "Something went wrong";

      if (status === 400) {
        throw new Error("Invalid request. Please check your filters or parameters.");
      }

      throw new Error(message);
    }
    throw new Error("An unexpected error occurred. Please try again later.");
  }
}


export default function TagsSection({ queryParams }: { queryParams: { [key: string]: string | number } }) {
  const { isLoading, data: tags, error } = useQuery({
    queryKey: ['tags', queryParams], queryFn: () => getAllTags(queryParams)
  })

  if (isLoading) return (
    <div className="flex flex-wrap gap-8">
      {Array.from({ length: 5 }).map((_, i) => (
        <TagCardSkeleton key={i} />
      ))}
    </div>
  );

  if (error instanceof Error) return <div>{error.message}</div>;

  return (
    <div>
      {
        tags.data.length > 0 ? (
          <div className="flex flex-wrap gap-8">
            {tags.data.map((blog: { id: string, name: string }) => (
              <TagCard
                key={blog.id}
                id={blog.id}
                name={blog.name}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <h2 className="text-2xl font-bold text-gray-500">No tags found</h2>
          </div>
        )
      }
    </div>
  )
}
