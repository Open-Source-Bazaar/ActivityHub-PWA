import { GetServerSideProps } from 'next';
import { Container } from 'react-bootstrap';

import { PlaceManager } from '../../components/Place';
import { SessionBox } from '../../components/User/SessionBox';

export default function PlacePage() {
  return (
    <SessionBox
      title="会议室管理"
      path="/place"
    >
      <Container>
        <PlaceManager />
      </Container>
    </SessionBox>
  );
}

export const getServerSideProps: GetServerSideProps = async () => ({ props: {} });