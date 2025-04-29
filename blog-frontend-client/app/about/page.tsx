import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me | My Blog",
  description: "Learn more about the person behind the blog, my journey, and what I write about.",
  openGraph: {
    title: "About Me | My Blog",
    description: "Know more about my background, passions, and writing goals.",
    url: "https://yourdomain.com/about",
    siteName: "My Blog",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen px-4 py-12 flex flex-col items-center bg-gray-50">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold mb-6">About Me</h1>
        <p className="text-gray-700 text-lg leading-7">
          Hey there! 👋 I&apos;m Henry Okeke, a passionate writer and developer who loves sharing insights on web development, technology, and life experiences. 
          Through this blog, I aim to document my journey, share helpful tutorials, and connect with like-minded individuals around the world.
        </p>

        <p className="text-gray-700 text-lg leading-7 mt-4">
          When I&apos;m not writing or coding, you can find me exploring new coffee shops, traveling, or learning something new!
        </p>
      </div>
    </div>
  );
}
