import { observer } from 'mobx-react';
import { FC, useContext } from 'react';
import { Card } from 'react-bootstrap';

import { I18nContext } from '../models/Translation';
import { Activity } from '../pages/api/home';
import styles from './ActivityCard.module.less';

export const ActivityCard: FC<Activity> = observer(
  ({
    displayName,
    description,
    startDate,
    location,
    participants,
    link,
    banner,
  }) => {
    const { t } = useContext(I18nContext);

    return (
      <Card className={`h-100 shadow-sm ${styles.activityCard}`}>
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
          <ul className="list-unstyled small text-muted">
            <li className="mb-1">
              <i className="bi bi-calendar me-2" />
              {new Date(startDate).toLocaleDateString()}
            </li>
            <li className="mb-1">
              <i className="bi bi-geo-alt me-2" />
              {location}
            </li>
            <li>
              <i className="bi bi-people me-2" />
              {participants} {t('participants')}
            </li>
          </ul>
        </Card.Body>
      </Card>
    );
  },
);
