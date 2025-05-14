import React from 'react';
import { BlogType } from '../../../libs/types';
import BlogCard from '../BlogCard';

const RelatedBlogs = ({ blogPosts }: { blogPosts: BlogType[] }) => {
  return (
    <div className='pb-10 md:pb-20 grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10'>
      {
        blogPosts.map((blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            title={blog.title}
            image={blog.image}
            content={blog.content}
            tags={blog.tags}
            createdAt={blog.createdAt}
            comments={blog.comments}
            isRecentBlogSection={false}
          />
        ))}
    </div>
  )
}

export default RelatedBlogs