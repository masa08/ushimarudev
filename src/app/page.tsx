import TopTemplate from '@/templates/Top';
import fs from 'fs';
import matter from 'gray-matter';

// TODO: Get data from api
export async function getPosts() {
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

const Home = async () => {
  const posts = await getPosts();

  return <TopTemplate posts={posts} />;
};

export default Home;
