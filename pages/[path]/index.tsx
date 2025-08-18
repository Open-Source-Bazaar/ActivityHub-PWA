import { Activity } from '@open-source-bazaar/activityhub-service';
import { observer } from 'mobx-react';
import { cache, compose, errorLogger } from 'next-ssr-middleware';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';

import { PageHead } from '../../components/PageHead';
import { ActivityModel } from '../../models/Activity';

interface ActivityPageProps {
  activity: Activity;
}

export const getServerSideProps = compose<{ path: string }, ActivityPageProps>(
  cache(),
  errorLogger,
  async ({ params }) => {
    const activityStore = new ActivityModel();
    const { path } = params!;

    try {
      // First, try to find activity by various path matching strategies
      const activities = await activityStore.getList({}, 1, 100);

      // Strategy 1: Find by exact URL match (if url field contains the path)
      let activity = activities.find((a: Activity) => a.url && a.url.includes(path));

      // Strategy 2: Find by title slug match (convert title to slug and compare)
      if (!activity) {
        activity = activities.find(
          (a: Activity) =>
            a.title
              .toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/[^a-z0-9-]/g, '') === path.toLowerCase(),
        );
      }

      // Strategy 3: Find by title containing path
      if (!activity) {
        activity = activities.find((a: Activity) =>
          a.title.toLowerCase().includes(path.toLowerCase()),
        );
      }

      // Strategy 4: Find by ID if path is numeric
      if (!activity && /^\d+$/.test(path)) {
        try {
          activity = await activityStore.getOne(Number(path));
        } catch {
          // Ignore error if ID lookup fails
        }
      }

      // Strategy 5: Search by keywords - use simple filter if possible
      if (!activity) {
        const searchResults = await activityStore.getList({}, 1, 50);
        [activity] = searchResults.filter(
          (a: Activity) =>
            a.title.toLowerCase().includes(path.toLowerCase()) ||
            (a.address && a.address.toLowerCase().includes(path.toLowerCase())),
        );
      }

      if (!activity) {
        return { notFound: true };
      }

      return {
        props: JSON.parse(JSON.stringify({ activity })),
      };
    } catch (error) {
      console.error('Error fetching activity:', error);

      return { notFound: true };
    }
  },
);

const ActivityPage = observer(({ activity }: ActivityPageProps) => (
  <>
    <PageHead title={activity.title} />

    {/* Hero Banner Section */}
    {activity.banner && (
      <div className="position-relative">
        <Image
          src={activity.banner}
          alt={activity.title}
          className="w-100"
          style={{ height: '60vh', minHeight: '400px', objectFit: 'cover' }}
        />
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-25" />
        <div className="position-absolute bottom-0 start-0 p-4 text-white">
          <Container>
            <h1 className="display-3 fw-bold mb-3 text-shadow">{activity.title}</h1>
            <div className="d-flex flex-wrap gap-4 fs-5">
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
          </Container>
        </div>
      </div>
    )}

    <Container className="py-5">
      <Row>
        <Col lg={8}>
          {/* Activity Header (if no banner) */}
          {!activity.banner && (
            <div className="mb-5">
              <h1 className="display-4 mb-3">{activity.title}</h1>
              <div className="d-flex flex-wrap gap-3 text-muted fs-5">
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
          )}

          {/* Call to Action Section */}
          <div className="mb-5">
            <div className="d-flex flex-wrap gap-3">
              {activity.url && (
                <Button
                  variant="primary"
                  size="lg"
                  href={activity.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-box-arrow-up-right me-2" />
                  Register Now
                </Button>
              )}
              <Button variant="outline-primary" size="lg" href="/">
                <i className="bi bi-house me-2" />
                Back to Home
              </Button>
              <Button variant="outline-secondary" size="lg" href="/activity">
                <i className="bi bi-calendar-event me-2" />
                All Activities
              </Button>
            </div>
          </div>

          {/* Activity Description Section */}
          <Card className="mb-4">
            <Card.Body>
              <Card.Title as="h2" className="h3 mb-4">
                <i className="bi bi-info-circle me-2" />
                Activity Details
              </Card.Title>
              <Card.Text className="fs-6 lh-lg">
                Welcome to this exciting activity! Stay tuned for more detailed information about
                the agenda, speakers, and registration process.
              </Card.Text>
            </Card.Body>
          </Card>

          {/* Schedule Preview */}
          <Card>
            <Card.Body>
              <Card.Title as="h2" className="h3 mb-4">
                <i className="bi bi-clock me-2" />
                Schedule
              </Card.Title>
              <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded">
                <div>
                  <h5 className="mb-1">Event Duration</h5>
                  <p className="mb-0 text-muted">
                    {new Date(activity.startTime).toLocaleString()} -{' '}
                    {new Date(activity.endTime).toLocaleString()}
                  </p>
                </div>
                <i className="bi bi-calendar-check fs-1 text-primary" />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          {/* Event Information Sidebar */}
          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <Card.Title as="h3" className="h5 mb-0">
                <i className="bi bi-info-square me-2" />
                Event Information
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <dl className="row">
                <dt className="col-4">Start:</dt>
                <dd className="col-8">{new Date(activity.startTime).toLocaleDateString()}</dd>

                <dt className="col-4">End:</dt>
                <dd className="col-8">{new Date(activity.endTime).toLocaleDateString()}</dd>

                {activity.address && (
                  <>
                    <dt className="col-4">Location:</dt>
                    <dd className="col-8">{activity.address}</dd>
                  </>
                )}

                <dt className="col-4">Status:</dt>
                <dd className="col-8">
                  <span className="badge bg-success">
                    {new Date() < new Date(activity.startTime)
                      ? 'Upcoming'
                      : new Date() > new Date(activity.endTime)
                        ? 'Completed'
                        : 'Ongoing'}
                  </span>
                </dd>
              </dl>
            </Card.Body>
          </Card>

          {/* Organizer Information */}
          {activity.organization && (
            <Card className="mb-4 shadow-sm">
              <Card.Header className="bg-secondary text-white">
                <Card.Title as="h3" className="h5 mb-0">
                  <i className="bi bi-building me-2" />
                  Organizer
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="d-flex align-items-start">
                  {activity.organization.logo && (
                    <Image
                      src={activity.organization.logo}
                      alt={activity.organization.name}
                      width={60}
                      height={60}
                      className="rounded me-3 flex-shrink-0"
                      style={{ objectFit: 'cover' }}
                    />
                  )}
                  <div className="flex-grow-1">
                    <h4 className="h6 mb-2">{activity.organization.name}</h4>
                    {activity.organization.summary && (
                      <p className="small text-muted mb-2">{activity.organization.summary}</p>
                    )}
                    {activity.organization.url && (
                      <a
                        href={activity.organization.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-primary btn-sm"
                      >
                        <i className="bi bi-link-45deg me-1" />
                        Visit Website
                      </a>
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          )}

          {/* Quick Actions */}
          <Card className="shadow-sm">
            <Card.Header className="bg-info text-white">
              <Card.Title as="h3" className="h5 mb-0">
                <i className="bi bi-lightning me-2" />
                Quick Actions
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="d-grid gap-2">
                {activity.url && (
                  <Button
                    variant="primary"
                    href={activity.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bi bi-box-arrow-up-right me-2" />
                    Register & Participate
                  </Button>
                )}
                <Button variant="outline-secondary" href="/">
                  <i className="bi bi-house me-2" />
                  Home
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </>
));

export default ActivityPage;
