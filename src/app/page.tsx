import TopTemplate from '@/templates/Top';
import fs from 'fs';
import matter from 'gray-matter';

export async function getPosts() {
  // TODO: Get data from api
  const files = fs.readdirSync('src/contents');

  const allPosts = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fileContent = fs.readFileSync(`src/contents/${fileName}`, 'utf-8');

    const { data } = matter(fileContent);
    return { metaData: data, slug };
  });

  return allPosts;
}

const Home = async () => {
  const posts = await getPosts();

  return <TopTemplate posts={posts} />;
};

export default Home;
