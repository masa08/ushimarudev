import { Post } from '@/types/post';

type Props = {
  post: Post;
};

const PostContents: React.FC<Props> = (props) => {
  const { post } = props;

  return (
    <article>
      <div>
        <h2 className="text-center text-3xl font-bold">
          {post.metaData.title}
        </h2>
        <p className="text-right mb-2 text-sm mt-4">
          {post.metaData.createdAt} @ushimaru08
        </p>
      </div>
      <hr className="mt-4 mb-10 border-gray-200 dark:border-gray-700" />
      <p>{post.content}</p>
    </article>
  );
};
export default PostContents;
