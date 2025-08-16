import { observer } from 'mobx-react';
import { FC, useContext } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';

import { I18nContext } from '../../models/Translation';
import { Activity } from '../../pages/api/home';

export interface ActivityListProps {
  activities: Activity[];
  showMoreButton?: boolean;
}

export const ActivityList: FC<ActivityListProps> = observer(
  ({ activities, showMoreButton = false }) => {
    const { t } = useContext(I18nContext);

    return (
      <>
        <Row className="g-4" xs={1} md={2} lg={3}>
          {activities.map(
            ({
              id,
              displayName,
              description,
              startDate,
              location,
              participants,
              link,
            }) => (
              <Col key={id}>
                <Card className="h-100 shadow-sm activity-card">
                  <Card.Body>
                    <Card.Title as="h4" className="fs-5 mb-3">
                      <a
                        href={link}
                        className="stretched-link text-decoration-none"
                      >
                        {displayName}
                      </a>
                    </Card.Title>
                    <Card.Text className="text-muted mb-2">
                      {description}
                    </Card.Text>
                    <div className="small text-muted">
                      <div className="mb-1">
                        <i className="bi bi-calendar me-2" />
                        {new Date(startDate).toLocaleDateString()}
                      </div>
                      <div className="mb-1">
                        <i className="bi bi-geo-alt me-2" />
                        {location}
                      </div>
                      <div>
                        <i className="bi bi-people me-2" />
                        {participants} participants
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ),
          )}
        </Row>

        {showMoreButton && (
          <div className="text-center mt-4">
            <Button variant="outline-primary" size="lg" href="/activity">
              {t('more_activities')}
            </Button>
          </div>
        )}
      </>
    );
  },
);
