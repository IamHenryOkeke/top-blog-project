import { Metadata } from "next";
import { TagService } from "@/services/tag";
import Tag from "@/components/dashboard/tags/[id]/tag";


export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata | undefined> {
  try {
    const res = await TagService.getTagById(params.id);
    const blog = res.data.data;
    return {
      title: blog.title,
      description: blog.description,
    }
  } catch (error) {
    console.log(error)
  }
}


export default async function page({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <main className='px-4 md:px-10 lg:px-24 py-10 lg:py-20'>
      <Tag id={id} />
    </main>
  )
}