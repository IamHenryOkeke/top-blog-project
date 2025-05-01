'use server';

import { revalidatePath } from 'next/cache';

export async function revalidateBlogPath(id: string) {
  revalidatePath(`/blogs/${id}`);
}
