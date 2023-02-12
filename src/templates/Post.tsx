import Container from '@/components/common/Container';
import ContentContainer from '@/components/common/ContentContainer';
import PostContents from '@/components/post/PostContents';
import { Post } from '@/types/post';

type Props = {
  post: Post;
};

const PostTemplate: React.FC<Props> = (props) => {
  const { post } = props;
  return (
    <Container>
      <ContentContainer>
        <PostContents post={post} />
      </ContentContainer>
    </Container>
  );
};

export default PostTemplate;
