import TopTemplate from '@/templates/Top';
import fs from 'fs';
import matter from 'gray-matter';

// TODO: Get data from api
export async function getPosts(page: string | undefined) {
  let currentOffset = 0;
  const limit = 10;
  const pageInt = parseInt(page ?? '1');
  if (pageInt > 1) {
    currentOffset = (pageInt - 1) * limit;
  }

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

  const posts = allPosts.slice(currentOffset, currentOffset + limit);
  const hasMore = currentOffset + limit < allPosts.length;
  return { posts: posts, hasMore: hasMore };
}

const Home = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page } = searchParams;
  const { posts, hasMore } = await getPosts(page);

  return <TopTemplate posts={posts} hasMore={hasMore} />;
};

export default Home;
