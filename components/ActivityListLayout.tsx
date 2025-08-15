import { FC } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';

import { Activity } from '../pages/api/home';

interface ActivityListLayoutProps {
  defaultData: Activity[];
}

export const ActivityListLayout: FC<ActivityListLayoutProps> = ({
  defaultData,
}) => (
  <Row className="g-4" xs={1} sm={2} lg={3}>
    {defaultData.map(
      ({ name, displayName, ribbon, description, startTime }) => (
        <Col key={name}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title as="h3" className="fs-5 mb-2">
                {displayName}
              </Card.Title>
              <Card.Subtitle className="mb-3 text-muted">
                {ribbon}
              </Card.Subtitle>
              <Card.Text className="mb-3">{description}</Card.Text>
              <Card.Text className="small text-muted mb-3">
                {new Date(startTime).toLocaleDateString()}
              </Card.Text>
              <Button
                variant="outline-primary"
                size="sm"
                href={`/activity/${name}/`}
              >
                Learn More
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ),
    )}
  </Row>
);
