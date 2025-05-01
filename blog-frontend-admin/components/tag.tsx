'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function Tag({ tags }: { tags: { id: string, name: string }[] }) {
  const searchParams = useSearchParams()
  const currentTag = searchParams.get('tag') || '';
  const pathname = usePathname()
  const router = useRouter()

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete('page');
    if (tag === currentTag) {
      params.delete('tag')
      router.replace(`${pathname}?${params.toString()}`)
      return
    }
    params.set('tag', tag)
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <section>
      {
        tags && tags.length > 0 ?
          <div className="flex flex-wrap gap-2 mt-2">
            {
              tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => handleTagClick(tag.name)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold ${currentTag === tag.name ? 'bg-accent text-white' : 'bg-gray-200 text-gray-700 hover:bg-accent hover:text-white transition duration-300'}`}
                >
                  {tag.name}
                </button>
              ))
            }
          </div>
          :
          <div className="flex justify-center items-center">
            <h2 className="text-2xl font-bold text-gray-500">No tags found</h2>
          </div>
      }
    </section>
  )
}
