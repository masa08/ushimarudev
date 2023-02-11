import React from 'react';
import PostCard from './PostCard';

type Props = {
  className?: string;
};

const PostCardList: React.FC<Props> = (props) => {
  // TODO: localのmarkdownファイルを参照して最新順で記事を取得

  return (
    <div>
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      {/* TODO: pagination実装 */}
    </div>
  );
};
export default PostCardList;
