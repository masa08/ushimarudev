import Container from '@/components/common/container';
import Flex from '@/components/common/flex';
import MainContents from '@/components/common/mainContents';
import SideContents from '@/components/common/sideContents';

const TopTemplate = () => {
  return (
    <Container>
      <Flex>
        <SideContents>
          <p>sidecontents</p>
        </SideContents>
        <MainContents>
          <p>maincontents</p>
        </MainContents>
      </Flex>
    </Container>
  );
};

export default TopTemplate;
