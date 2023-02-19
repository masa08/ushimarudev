import { Post } from '@/types/post';

type Props = {
  post: Post;
};

const PostContents: React.FC<Props> = (props) => {
  const { post } = props;

  return (
    <article className="prose dark:prose-invert mx-auto break-all">
      <div>
        <h1 className="text-center text-3xl font-bold">
          {post.metaData.title}
        </h1>
        <p className="text-right mb-2 text-sm mt-4">
          {post.metaData.createdAt} @ushimaru08
        </p>
      </div>
      <hr className="mt-4 mb-10 border-gray-200 dark:border-gray-700" />
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
};
export default PostContents;
