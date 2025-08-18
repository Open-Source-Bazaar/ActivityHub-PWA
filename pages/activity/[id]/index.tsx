import { Activity } from '@open-source-bazaar/activityhub-service';
import { observer } from 'mobx-react';
import { cache, compose, errorLogger } from 'next-ssr-middleware';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';

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

    try {
      // Try to get activity by ID first
      const activity = await activityStore.getOne(Number(params!.id));

      return {
        props: JSON.parse(JSON.stringify({ activity })),
      };
    } catch {
      // If not found by ID, try to find by title or other criteria
      try {
        const activities = await activityStore.getList({}, 1, 50);
        const activity = activities.find((a: Activity) => a.title === params!.id) || activities[0];

        if (!activity) {
          return { notFound: true };
        }

        return {
          props: JSON.parse(JSON.stringify({ activity })),
        };
      } catch {
        return { notFound: true };
      }
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
            className="w-100 rounded"
            style={{ maxHeight: '400px', objectFit: 'cover' }}
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
                {new Date(activity.startTime).toLocaleDateString()} -{' '}
                {new Date(activity.endTime).toLocaleDateString()}
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
            {activity.url && (
              <Button
                variant="primary"
                size="lg"
                href={activity.url}
                target="_blank"
                className="me-3"
              >
                Register Now
              </Button>
            )}
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
                <dd className="col-sm-7">{new Date(activity.startTime).toLocaleString()}</dd>

                <dt className="col-sm-5">End Time:</dt>
                <dd className="col-sm-7">{new Date(activity.endTime).toLocaleString()}</dd>

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
