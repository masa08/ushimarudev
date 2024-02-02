'use client';

import PostCard, { PostCardProps } from './PostCard';
import Link from 'next/link';
import { Posts } from '@/types/post';
import { useSearchParams, useRouter } from 'next/navigation';

type Props = {
  posts: Posts[];
  hasMore: boolean;
};

const PostCardList: React.FC<Props> = (props) => {
  const { posts, hasMore } = props;
  const router = useRouter();
  const page = useSearchParams()?.get('page');

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
      <div className="flex">
        {parseInt(page ?? '0') > 0 && (
          <button
            onClick={() => router.push(`/?page=${parseInt(page ?? '0') - 1}`)}
          >
            prev page
          </button>
        )}
        <div className="w-2"></div>
        {hasMore && (
          <button
            onClick={() => router.push(`/?page=${parseInt(page ?? '0') + 1}`)}
          >
            next page
          </button>
        )}
      </div>
    </div>
  );
};
export default PostCardList;
