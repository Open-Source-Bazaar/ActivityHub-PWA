import { observer } from 'mobx-react';
import { FC, useContext } from 'react';
import { Card } from 'react-bootstrap';

import { I18nContext } from '../models/Translation';
import { Activity } from '../pages/api/home';

export interface ActivityCardProps {
  activity: Activity;
}

export const ActivityCard: FC<ActivityCardProps> = observer(({ activity }) => {
  const { t } = useContext(I18nContext);
  const {
    displayName,
    description,
    startDate,
    location,
    participants,
    link,
    banner,
  } = activity;

  return (
    <Card className="h-100 shadow-sm activity-card">
      {banner && (
        <Card.Img
          variant="top"
          src={banner.uri}
          alt={banner.name}
          style={{ height: '12.5rem' }}
          className="object-fit-cover"
        />
      )}
      <Card.Body>
        <Card.Title as="h4" className="fs-5 mb-3">
          <a href={link} className="stretched-link text-decoration-none">
            {displayName}
          </a>
        </Card.Title>
        <Card.Text className="text-muted mb-2">{description}</Card.Text>
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
            {participants} {t('participants')}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
});
