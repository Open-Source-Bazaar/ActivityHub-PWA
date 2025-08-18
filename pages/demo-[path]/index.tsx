import { Activity } from '@open-source-bazaar/activityhub-service';
import { observer } from 'mobx-react';
import { GetServerSideProps } from 'next';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';

import { PageHead } from '../../components/PageHead';

interface DemoActivityPageProps {
  activity: Activity;
}

// Mock activity data for demonstration
const createMockActivity = (path: string): Activity => ({
  id: 1,
  title: `Demo Activity: ${path.toUpperCase()}`,
  startTime: '2024-03-15T09:00:00Z',
  endTime: '2024-03-15T17:00:00Z',
  address: 'Demo Conference Center, Tech City',
  url: 'https://example.com/register',
  banner: 'https://via.placeholder.com/1200x400/007bff/ffffff?text=Demo+Activity+Banner',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  organization: {
    id: 1,
    name: 'Demo Organization',
    englishName: 'Demo Organization',
    summary: 'A demonstration organization for showcasing activity features.',
    logo: 'https://via.placeholder.com/120x120/28a745/ffffff?text=ORG',
    url: 'https://example.com',
    members: [],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: {} as any,
  },
  createdBy: {} as any,
});

export const getServerSideProps: GetServerSideProps<DemoActivityPageProps> = async ({ params }) => {
  const path = params!.path as string;

  // For demo purposes, create a mock activity for any path
  const activity = createMockActivity(path);

  return {
    props: { activity },
  };
};

const DemoActivityPage = observer(({ activity }: DemoActivityPageProps) => (
    <>
      <PageHead title={activity.title} />

      {/* Hero Banner Section */}
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
              <div>
                <i className="bi bi-geo-alt me-2" />
                {activity.address}
              </div>
            </div>
          </Container>
        </div>
      </div>

      <Container className="py-5">
        <Row>
          <Col lg={8}>
            {/* Call to Action Section */}
            <div className="mb-5">
              <div className="d-flex flex-wrap gap-3">
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
                  🎉 <strong>Welcome to this demonstration!</strong>
                  <br />
                  <br />
                  This page demonstrates the individual activity homepage feature. Each activity can
                  now have its own dedicated page accessible via a custom path (like{' '}
                  <code>/coscon2020</code> or <code>/techconf2024</code>).
                  <br />
                  <br />
                  <strong>Key Features:</strong>
                  <ul>
                    <li>✅ Dynamic routing with custom paths</li>
                    <li>✅ Beautiful hero banner with overlay</li>
                    <li>✅ Event information and organizer details</li>
                    <li>✅ Responsive design</li>
                    <li>✅ Call-to-action buttons</li>
                  </ul>
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

                  <dt className="col-4">Location:</dt>
                  <dd className="col-8">{activity.address}</dd>

                  <dt className="col-4">Status:</dt>
                  <dd className="col-8">
                    <span className="badge bg-success">Demo Mode</span>
                  </dd>
                </dl>
              </Card.Body>
            </Card>

            {/* Organizer Information */}
            <Card className="mb-4 shadow-sm">
              <Card.Header className="bg-secondary text-white">
                <Card.Title as="h3" className="h5 mb-0">
                  <i className="bi bi-building me-2" />
                  Organizer
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="d-flex align-items-start">
                  <Image
                    src={activity.organization!.logo}
                    alt={activity.organization!.name}
                    width={60}
                    height={60}
                    className="rounded me-3 flex-shrink-0"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="flex-grow-1">
                    <h4 className="h6 mb-2">{activity.organization!.name}</h4>
                    <p className="small text-muted mb-2">{activity.organization!.summary}</p>
                    <a
                      href={activity.organization!.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary btn-sm"
                    >
                      <i className="bi bi-link-45deg me-1" />
                      Visit Website
                    </a>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-sm">
              <Card.Header className="bg-info text-white">
                <Card.Title as="h3" className="h5 mb-0">
                  <i className="bi bi-lightning me-2" />
                  Demo Actions
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="d-grid gap-2">
                  <Button
                    variant="primary"
                    href={activity.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bi bi-box-arrow-up-right me-2" />
                    Demo Registration
                  </Button>
                  <Button variant="outline-secondary" href="/">
                    <i className="bi bi-house me-2" />
                    Home
                  </Button>
                  <Button variant="outline-success" href="/demo-coscon2020">
                    <i className="bi bi-arrow-right me-2" />
                    Try: /demo-coscon2020
                  </Button>
                  <Button variant="outline-warning" href="/demo-techconf2024">
                    <i className="bi bi-arrow-right me-2" />
                    Try: /demo-techconf2024
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  ));

export default DemoActivityPage;
