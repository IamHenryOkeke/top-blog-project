import { AppError } from "../error/errorHandler";
import { Prisma } from "@prisma/client"; 
import { prisma } from "../prisma/client";

export async function registerUser(values: Prisma.UserCreateInput) {
  try {
    const data = await prisma.user.create({
      data: values
    })
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error inserting new user:", error.message);
    } else {
      console.error("Error inserting new user:", error);
    }
    throw new AppError("Internal server error", 500)
  }
}

export async function updateUser(id: string, values: any) {
  try {
    const data = await prisma.user.update({
      where: { id },
      data: values
    })
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error updating user:", error.message);
    } else {
      console.error("Error updating user:", error);
    }
    throw new AppError("Internal server error", 500)
  }
}

export async function getUserByEmail(email: string) {
  try {
    const data = await prisma.user.findUnique({
      where: { email }
    })
    return data;
  } catch (error) {
    throw new AppError("Internal server error", 500)
  }
}

export async function getAllBlogPosts(offset: number, limit: number, searchTerm: string) {
  try {
    const data = await prisma.blogPost.findMany({
      where: {
        OR: [
          { title: { contains: searchTerm, mode: 'insensitive' } },
          { description: { contains: searchTerm, mode: 'insensitive' } },
        ]
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      },
      ...((limit > 0) && { take: limit }),
      skip: offset,
      orderBy: {
        createdAt: 'desc'
      }
    })
    return data;
  } catch (error) {
    throw new AppError("Internal server error", 500)
  }
}

export async function createBlogPost(values: Prisma.BlogPostCreateInput) {
  try {
    const data = await prisma.blogPost.create({
      data: values
    })
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating new blog post:", error.message);
    } else {
      console.error("Error creating new blog post:", error);
    }
    throw new AppError("Internal server error", 500)
  }
}


export async function getBlogPostById(id: string) {
  try {
    const data = await prisma.blogPost.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        tags: true
      }
    })
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error getting blog post by id:", error.message);
    } else {
      console.error("Error getting blog post by id:", error);
    }
    throw new AppError("Internal server error", 500)
  }
}

export async function updateBlogPost( id: string, authorId: string, values: Partial<Prisma.BlogPostUpdateInput>) {
  try {
    const updatedPost = await prisma.blogPost.update({
      where: {
        id,
        authorId
      },
      data: values
    });

    return updatedPost;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new AppError("Blog post not found", 404);
      }
    }

    console.error("Error updating blog post:", error);
    throw new AppError("Internal server error", 500);
  }
}

export async function deleteBlogPost( id: string, authorId: string ) {
  try {
    const deletedPost = await prisma.blogPost.delete({
      where: {
        id,
        authorId
      }
    });

    return deletedPost;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new AppError("Blog post not found", 404);
      }
    }
    
    console.error("Error updating blog post:", error);
    throw new AppError("Internal server error", 500);
  }
}

export async function createComment(values: Prisma.CommentCreateInput) {
  try {
    const data = await prisma.comment.create({
      data: values
    })
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating new comment", error.message);
    } else {
      console.error("Error creating new comment", error);
    }
    throw new AppError("Internal server error", 500)
  }
}

export async function getCommentOfBlogPost(postId: string, offset: number, limit: number) { 
  try {
    const data = await prisma.comment.findMany({
      where: {
        postId
      },
      ...((limit > 0) && { take: limit }),
      skip: offset,
      orderBy: {
        createdAt: 'desc'
      }
    })
    return data;
  } catch (error) {
    throw new AppError("Internal server error", 500)
  }
}

export async function getCommentById(id: string) {
  try {
    const data = await prisma.comment.findUnique({
      where: { id },
      include: {
        post: {
          select: {
            id: true,
            title: true
          }
        }
      }
    })
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error getting comment by id:", error.message);
    } else {
      console.error("Error getting comment by id:", error);
    }
    throw new AppError("Internal server error", 500)
  }
}

export async function updateComment( id: string, postId: string, values: Partial<Prisma.CommentUpdateInput>) {
  try {
    const updatedComment = await prisma.comment.update({
      where: {
        id,
        postId
      },
      data: values
    });

    return updatedComment;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new AppError("Comment not found", 404);
      }
    }

    console.error("Error updating Comment:", error);
    throw new AppError("Internal server error", 500);
  }
}


export async function deleteComment(id: string, postId: string) {
  try {
    const data = await prisma.comment.delete({
      where: {
        id,
        postId
      }
    })
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error deleting comment", error.message);
    } else {
      console.error("Error deleting comment", error);
    }
    throw new AppError("Internal server error", 500)
  }
}
