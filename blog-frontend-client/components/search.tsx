'use client'

import { CiSearch } from 'react-icons/ci'

import { useDebouncedCallback } from 'use-debounce'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

export default function Search() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('searchTerm', term)
      params.delete('page')
    } else {
      params.delete('searchTerm')
    }
    router.replace(`${pathname}?${params.toString()}`)
  }, 1000)

  return (
    <div className='relative w-full md:w-1/2'>
      <CiSearch size={20} className='absolute top-2.5 left-1 lg:top-3.5 lg:left-2' />
      <input
        type="text"
        onChange={(e) => {
          handleSearch(e.target.value.trim())
        }}
        defaultValue={searchParams.get('searchTerm')?.toString()} placeholder='Search for a post.....' className='h-10 lg:h-12 w-full pl-7 pr-2 lg:px-10 text-justify text-slate-500 lg:text-lg font-medium focus:outline-none border border-slate-500 rounded-xl'
      />
    </div>
  )
}
