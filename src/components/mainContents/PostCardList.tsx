import PostCard, { PostCardProps } from './PostCard';
import Link from 'next/link';
import { Posts } from '@/types/post';

type Props = {
  posts: Posts[];
};

const PostCardList: React.FC<Props> = (props) => {
  const { posts } = props;
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
