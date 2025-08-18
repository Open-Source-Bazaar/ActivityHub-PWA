import { Activity } from '@open-source-bazaar/activityhub-service';
import { observer } from 'mobx-react';
import { Pager } from 'mobx-restful-table';
import { cache, compose, errorLogger } from 'next-ssr-middleware';
import { Col, Container, Row } from 'react-bootstrap';

import { ActivityCard } from '../../components/ActivityCard';
import { PageHead } from '../../components/PageHead';
import { ActivityModel } from '../../models/Activity';

interface ActivityListPageProps {
  activities: Activity[];
  pageIndex: number;
  pageSize: number;
  pageCount: number;
}

export const getServerSideProps = compose<{}, ActivityListPageProps>(
  cache(),
  errorLogger,
  async ({ query }) => {
    const activityStore = new ActivityModel();
    const pageIndex = parseInt(query.page as string) || 1;
    const pageSize = parseInt(query.size as string) || 12;

    const activities = await activityStore.getList({}, pageIndex, pageSize);
    const pageCount = Math.ceil(activities.length / pageSize);

    return {
      props: JSON.parse(JSON.stringify({ activities, pageIndex, pageSize, pageCount })),
    };
  },
);

const ActivityListPage = observer(
  ({ activities, pageIndex, pageSize, pageCount }: ActivityListPageProps) => (
    <>
      <PageHead title="All Activities" />

      <Container className="py-5">
        <div className="text-center mb-5">
          <h1 className="display-4 mb-3">All Activities</h1>
          <p className="lead text-muted">
            Discover exciting events and activities happening in our community.
          </p>
        </div>

        {activities.length > 0 ? (
          <>
            <Row className="g-4" xs={1} md={2} lg={3}>
              {activities.map(activity => (
                <Col key={activity.id}>
                  <ActivityCard {...activity} />
                </Col>
              ))}
            </Row>

            <div className="d-flex justify-content-center mt-5">
              <Pager pageIndex={pageIndex} pageSize={pageSize} pageCount={pageCount} />
            </div>
          </>
        ) : (
          <div className="text-center py-5">
            <i className="bi bi-calendar-x display-1 text-muted mb-3" />
            <h3 className="text-muted">No Activities Found</h3>
            <p className="text-muted">
              There are currently no activities available. Please check back later.
            </p>
          </div>
        )}
      </Container>
    </>
  ),
);

export default ActivityListPage;
