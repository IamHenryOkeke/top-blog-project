"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const authorId = 'cm9sm1z7k0000n8782fruppht';
        yield client_1.prisma.blogPost.createMany({
            data: [
                {
                    title: 'Getting Started with Prisma',
                    description: 'A comprehensive guide to get started with Prisma ORM.',
                    thumbnailImage: 'https://example.com/images/prisma.png',
                    content: 'This post will walk you through the steps of using Prisma...',
                    isPublished: true,
                    authorId,
                },
                {
                    title: 'Understanding Relational Databases',
                    description: 'An overview of how relational databases work.',
                    thumbnailImage: 'https://example.com/images/databases.png',
                    content: 'Relational databases store data in tables with rows and columns...',
                    isPublished: false,
                    authorId,
                },
                {
                    title: 'Advanced Next.js Patterns',
                    description: 'Learn some advanced patterns in building Next.js apps.',
                    thumbnailImage: 'https://example.com/images/nextjs.png',
                    content: 'In this post, we cover dynamic routing, API routes...',
                    isPublished: true,
                    authorId,
                },
                {
                    title: 'A Guide to Tailwind CSS',
                    description: 'How to use Tailwind CSS to quickly style your web apps.',
                    thumbnailImage: 'https://example.com/images/tailwind.png',
                    content: 'Tailwind CSS is a utility-first CSS framework...',
                    isPublished: true,
                    authorId,
                },
                {
                    title: 'Working with REST APIs',
                    description: 'Best practices when integrating REST APIs into your app.',
                    thumbnailImage: 'https://example.com/images/restapi.png',
                    content: 'REST APIs follow a resource-based URL pattern...',
                    isPublished: false,
                    authorId,
                },
                {
                    title: 'GraphQL vs REST',
                    description: 'A comparison of GraphQL and REST API paradigms.',
                    thumbnailImage: 'https://example.com/images/graphql-vs-rest.png',
                    content: 'GraphQL offers flexibility in data fetching...',
                    isPublished: true,
                    authorId,
                },
                {
                    title: 'Deploying on Vercel',
                    description: 'Step-by-step guide to deploy your Next.js app on Vercel.',
                    thumbnailImage: 'https://example.com/images/vercel.png',
                    content: 'Vercel makes it easy to deploy frontend applications...',
                    isPublished: true,
                    authorId,
                },
                {
                    title: 'Authentication with NextAuth',
                    description: 'Secure your Next.js apps using NextAuth.js.',
                    thumbnailImage: 'https://example.com/images/nextauth.png',
                    content: 'NextAuth provides authentication flows out of the box...',
                    isPublished: false,
                    authorId,
                },
                {
                    title: 'Building a Blog with Next.js and Prisma',
                    description: 'How to build a full-stack blog using modern tech stack.',
                    thumbnailImage: 'https://example.com/images/blog-stack.png',
                    content: 'Combining Next.js, Prisma, and a database...',
                    isPublished: true,
                    authorId,
                },
                {
                    title: 'Using TypeScript with React',
                    description: 'Improve your code quality by using TypeScript with React.',
                    thumbnailImage: 'https://example.com/images/typescript-react.png',
                    content: 'TypeScript helps catch bugs at compile time...',
                    isPublished: true,
                    authorId,
                },
            ],
        });
        console.log('✅ 10 blog posts seeded!');
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => {
    client_1.prisma.$disconnect();
});
