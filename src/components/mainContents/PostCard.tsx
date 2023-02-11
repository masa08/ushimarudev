import React from 'react';

type Props = {
  className?: string;
};

const PostCard: React.FC<Props> = (props) => {
  return (
    <div className="mb-2">
      <h3 className="text-2xl mb-2">Title of Posts</h3>
      <p className="mb-2 text-sm">Published on Dec 11, 2022</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, modi!
        Nostrum, veritatis temporibus, excepturi eveniet deserunt sint dolorum
        architecto optio reiciendis nihil ratione ad animi, fugiat quibusdam ab
        rem tenetur!
      </p>
      <hr className="my-3 border-gray-200 dark:border-gray-700" />
    </div>
  );
};
export default PostCard;
