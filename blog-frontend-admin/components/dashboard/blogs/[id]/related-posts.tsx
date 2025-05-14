import BlogCard from "../blog-card"
import { BlogType } from "./blog"

const RelatedBlogs = ({ blogPosts }: { blogPosts: (BlogType & {publishedAt: string})[] }) => {
  return (
    <div className='pb-10 md:pb-20 grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10'>
      {
        blogPosts.map((blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            title={blog.title}
            description={blog.description}
            publishedAt={blog.publishedAt}
          />
        ))}
    </div>
  )
}

export default RelatedBlogs