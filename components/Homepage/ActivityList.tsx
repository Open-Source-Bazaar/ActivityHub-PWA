import { observer } from 'mobx-react';
import { FC, useContext } from 'react';
import { Button, Col, Row } from 'react-bootstrap';

import { I18nContext } from '../../models/Translation';
import { Activity } from '../../pages/api/home';
import { ActivityCard } from '../ActivityCard';

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
          {activities.map(activity => (
            <Col key={activity.id}>
              <ActivityCard activity={activity} />
            </Col>
          ))}
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
