import PostCard, { PostCardProps } from './PostCard';
import fs from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';

async function getPosts() {
  // TODO: Get data from api
  const files = fs.readdirSync('src/contents');

  const allPosts = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fileContent = fs.readFileSync(`src/contents/${fileName}`, 'utf-8');

    const { data } = matter(fileContent);
    return { metaData: data, slug };
  });
  console.log(allPosts);

  return allPosts;
}

const PostCardList = async () => {
  const posts = await getPosts();

  return (
    <div>
      {posts.map((post) => {
        return (
          <Link key={post.slug} href={`/posts/${post.slug}`}>
            <PostCard {...(post.metaData as PostCardProps)} />
          </Link>
        );
      })}
      {/* TODO: impl pagination */}
    </div>
  );
};
export default PostCardList;
