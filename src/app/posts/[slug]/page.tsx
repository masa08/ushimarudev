import PostTemplate from '@/templates/Post';
import fs from 'fs';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import linkifyHtml from 'linkify-html';

async function getPost(slug: string) {
  const post = fs.readFileSync(`src/contents/${slug}.md`, 'utf-8');
  const { data, content } = matter(post);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return { metaData: data, content: linkifyHtml(contentHtml) };
}

async function getPosts() {
  const files = fs.readdirSync('src/contents');

  const allPosts = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fileContent = fs.readFileSync(`src/contents/${fileName}`, 'utf-8');

    const { data } = matter(fileContent);
    return { metaData: data, slug };
  });

  allPosts.sort(function (a, b) {
    return a.metaData.createdAt < b.metaData.createdAt ? 1 : -1;
  });

  return allPosts;
}

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

const Post = async ({ params }: { params: { slug: string } }) => {
  const post = await getPost(params.slug);

  return <PostTemplate post={post} />;
};

export default Post;
