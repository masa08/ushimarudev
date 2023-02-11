import Container from '@/components/common/Container';
import Flex from '@/components/common/Flex';
import MainContents from '@/components/common/MainContents';
import SideContents from '@/components/common/SideContents';
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
