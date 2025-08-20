import { GetServerSideProps } from 'next';
import { Container } from 'react-bootstrap';

import { ForumEditor } from '../../components/Forum';
import { SessionBox } from '../../components/User/SessionBox';

export default function CreateForumPage() {
  return (
    <SessionBox
      title="创建分论坛"
      path="/forum/create"
    >
      <Container>
        <ForumEditor />
      </Container>
    </SessionBox>
  );
}

export const getServerSideProps: GetServerSideProps = async () => ({ props: {} });