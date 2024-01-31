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

const Post = async ({ params }: { params: { slug: string } }) => {
  const post = await getPost(params.slug);

  return <PostTemplate post={post} />;
};

export default Post;
