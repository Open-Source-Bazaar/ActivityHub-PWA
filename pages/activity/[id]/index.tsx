import { Activity } from '@open-source-bazaar/activityhub-service';
import { observer } from 'mobx-react';
import { cache, compose, errorLogger } from 'next-ssr-middleware';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import { formatDate } from 'web-utility';

import { PageHead } from '../../../components/PageHead';
import { ActivityModel } from '../../../models/Activity';

interface ActivityDetailPageProps {
  activity: Activity;
}

export const getServerSideProps = compose<{ id: string }, ActivityDetailPageProps>(
  cache(),
  errorLogger,
  async ({ params }) => {
    const activityStore = new ActivityModel();
    const idOrTitle = params!.id;

    try {
      const activity = await activityStore.getOne(idOrTitle);

      return { props: { activity } };
    } catch {
      const [activity] = await activityStore.getList({ title: idOrTitle }, 1, 1);

      return activity ? { props: { activity } } : { notFound: true };
    }
  },
);

const ActivityDetailPage = observer(({ activity }: ActivityDetailPageProps) => (
  <>
    <PageHead title={activity.title} />

    <Container className="py-4">
      {/* Hero Section */}
      {activity.banner && (
        <div className="mb-4">
          <Image
            src={activity.banner}
            alt={activity.title}
            rounded
            className="w-100 object-fit-cover"
            style={{ maxHeight: '25rem' }}
          />
        </div>
      )}

      <Row>
        <Col lg={8}>
          {/* Activity Header */}
          <div className="mb-4">
            <h1 className="display-4 mb-3">{activity.title}</h1>

            <div className="d-flex flex-wrap gap-3 text-muted">
              <div>
                <i className="bi bi-calendar me-2" />
                <time dateTime={activity.startTime}>
                  {formatDate(activity.startTime, 'YYYY-MM-DD')}
                </time>{' '}
                -{' '}
                <time dateTime={activity.endTime}>
                  {formatDate(activity.endTime, 'YYYY-MM-DD')}
                </time>
              </div>
              {activity.address && (
                <div>
                  <i className="bi bi-geo-alt me-2" />
                  {activity.address}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mb-4">
            <Button variant="primary" size="lg" target="_blank" className="me-3">
              Register Now
            </Button>

            <Button variant="outline-secondary" href="/">
              Back to Home
            </Button>
          </div>

          {/* Content Section */}
          <Card>
            <Card.Body>
              <Card.Title as="h3">Activity Details</Card.Title>
              <Card.Text>Activity description will be available soon.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          {/* Sidebar with Activity Info */}
          <Card className="mb-4">
            <Card.Header>
              <Card.Title as="h4" className="mb-0">
                Event Information
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <dl className="row">
                <dt className="col-sm-5">Start Time:</dt>
                <dd className="col-sm-7">
                  <time dateTime={activity.startTime}>
                    {formatDate(activity.startTime, 'YYYY-MM-DD HH:mm')}
                  </time>
                </dd>

                <dt className="col-sm-5">End Time:</dt>
                <dd className="col-sm-7">
                  <time dateTime={activity.endTime}>
                    {formatDate(activity.endTime, 'YYYY-MM-DD HH:mm')}
                  </time>
                </dd>

                {activity.address && (
                  <>
                    <dt className="col-sm-5">Location:</dt>
                    <dd className="col-sm-7">{activity.address}</dd>
                  </>
                )}
              </dl>
            </Card.Body>
          </Card>

          {/* Organization Info if available */}
          {activity.organization && (
            <Card>
              <Card.Header>
                <Card.Title as="h4" className="mb-0">
                  Organizer
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="d-flex align-items-center">
                  {activity.organization.logo && (
                    <Image
                      src={activity.organization.logo}
                      alt={activity.organization.name}
                      width={48}
                      height={48}
                      className="rounded me-3"
                    />
                  )}
                  <div>
                    <h5 className="mb-1">{activity.organization.name}</h5>
                    {activity.organization.url && (
                      <a
                        href={activity.organization.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-decoration-none small"
                      >
                        Visit Website
                      </a>
                    )}
                  </div>
                </div>
                {activity.organization.summary && (
                  <p className="mt-3 mb-0 small text-muted">{activity.organization.summary}</p>
                )}
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  </>
));

export default ActivityDetailPage;
