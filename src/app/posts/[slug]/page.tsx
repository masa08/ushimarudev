import PostTemplate from '@/templates/Post';
import fs from 'fs';
import matter from 'gray-matter';

async function getPost(slug: string) {
  const post = fs.readFileSync(`src/contents/${slug}.md`, 'utf-8');
  const { data, content } = matter(post);
  return { metaData: data, content };
}

const Post = async ({ params }: { params: { slug: string } }) => {
  const post = await getPost(params.slug);

  return <PostTemplate post={post} />;
};

export default Post;
