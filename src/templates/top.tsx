import Container from '@/components/common/container';
import Flex from '@/components/common/flex';
import MainContents from '@/components/common/mainContents';
import SideContents from '@/components/common/sideContents';
import PostCardList from '@/components/mainContents/PostCardList';
import Contacts from '@/components/sideBar/Contacts';
import Hobby from '@/components/sideBar/Hobby';
import Profile from '@/components/sideBar/Profile';
import Skills from '@/components/sideBar/Skills';

const TopTemplate = () => {
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
          <PostCardList />
        </MainContents>
      </Flex>
    </Container>
  );
};

export default TopTemplate;
