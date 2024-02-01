import Container from '@/components/common/Container';
import Flex from '@/components/common/Flex';
import MainContents from '@/components/common/MainContents';
import SideContents from '@/components/common/SideContents';
import PostCardList from '@/components/mainContents/PostCardList';
import Contacts from '@/components/sideBar/Contacts';
import Hobby from '@/components/sideBar/Hobby';
import Profile from '@/components/sideBar/Profile';
import Skills from '@/components/sideBar/Skills';
import { Posts } from '@/types/post';

type Props = {
  posts: Posts[];
};

const TopTemplate: React.FC<Props> = (props) => {
  const { posts } = props;
  return (
    <Container>
      <Flex>
        <SideContents>
          <Profile />
          <Skills />
          <Hobby />
          <Contacts />
        </SideContents>
        <MainContents>
          <PostCardList posts={posts} />
        </MainContents>
      </Flex>
    </Container>
  );
};

export default TopTemplate;
