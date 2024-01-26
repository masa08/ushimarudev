import TopTemplate from '@/templates/Top';
import fs from 'fs';
import matter from 'gray-matter';

// TODO: Get data from api
export async function getPosts(page: string | undefined) {
  let currentOffset = 0;
  let currentLimit = 10;
  if (page) {
    currentOffset = (parseInt(page) - 1) * 10;
    currentLimit = parseInt(page) * 10;
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

  const posts = allPosts.slice(currentOffset, currentLimit);

  return posts;
}

// TODO: paginatin uiの実装
const Home = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page } = searchParams;
  const posts = await getPosts(page);

  return <TopTemplate posts={posts} />;
};

export default Home;
