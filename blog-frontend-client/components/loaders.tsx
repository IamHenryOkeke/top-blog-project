import { BsDot } from "react-icons/bs";
import { TbMessage2 } from "react-icons/tb";

export function BlogCardSkeleton() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4 animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-1/3 mt-2"></div>
      <div className="h-10 bg-gray-300 rounded w-24 mt-4"></div>
    </div>
  );
}

export function CommentCardSkeleton() {
  return (
    <div className="p-4 space-y-2 bg-gray-100 rounded-lg shadow-md animate-pulse">
      <h3 className="h-3 bg-gray-300 rounded w-2/3"></h3>
      <p className="h-3 bg-gray-300 rounded w-2/4"></p>
      <p className="h-2 bg-gray-300 rounded w-1/3"></p>
    </div>
  );
}

export function TagCardSkeleton() {
  return (
    <div className="shadow-md animate-pulse">
      <span
        className="px-10 py-2 capitalize rounded-lg text-sm font-semibold bg-gray-200 text-gray-700 hover:bg-accent hover:text-white transition duration-300"
      >
      </span>
    </div>
  );
}


export function BlogPostSkeleton() {
  return (
    <div className='space-y-2 md:space-y-5 animate-pulse'>
      <div className='w-full'>
        <div className='rounded-xl w-full h-[204px] md:h-[270px] bg-gray-200' />
      </div>

      <div className="flex justify-between items-center">
        <div className='text-[#676767] flex items-center text-sm gap-2'>
          <div className="w-24 h-4 bg-gray-200 rounded" />
          <BsDot size={20} />
          <div className="w-20 h-4 bg-gray-200 rounded" />
        </div>
        <div className='text-base flex gap-2 items-center text-black font-medium'>
          <TbMessage2 size={25} />
          <div className="w-16 h-4 bg-gray-200 rounded" />
        </div>
      </div>

      <div className='font-semibold text-2xl md:text-3xl lg:text-5xl'>
        <div className="w-3/4 h-6 md:h-8 bg-gray-200 rounded" />
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className='bg-gray-200 py-2 px-3 rounded-md w-16 h-6' />
          ))}
        </div>
      </div>

      <article className='space-y-2 text-base lg:text-xl 2xl:text-2xl text-[#3E3D34]'>
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="w-full h-4 bg-gray-200 rounded" />
        ))}
      </article>
    </div>
  );
}

