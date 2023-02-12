import React from 'react';

export type PostCardProps = {
  title: string;
  createdAt: string;
  description: string;
};

const PostCard: React.FC<PostCardProps> = (props) => {
  const { title, createdAt, description } = props;
  return (
    <div className="mb-2">
      <h3 className="text-2xl mb-2">{title}</h3>
      <p className="mb-2 text-sm">{createdAt}</p>
      <p>{description}</p>
      <hr className="my-3 border-gray-200 dark:border-gray-700" />
    </div>
  );
};
export default PostCard;
