import { Activity } from '@open-source-bazaar/activityhub-service';
import { observer } from 'mobx-react';
import Link from 'next/link';
import { FC } from 'react';
import { Card } from 'react-bootstrap';

import styles from './ActivityCard.module.less';

export const ActivityCard: FC<Activity> = observer(
  ({ id, title, startTime, address, slug, banner }) => (
    <Card className={`h-100 shadow-sm ${styles.activityCard}`}>
      {banner && (
        <Card.Img
          variant="top"
          src={banner}
          alt={title}
          style={{ height: '12.5rem' }}
          className="object-fit-cover"
        />
      )}
      <Card.Body>
        <Card.Title as="h4" className="fs-5 mb-3">
          <Link
            href={slug ? `/activity/${slug}` : `/activity/${id}`}
            className="stretched-link text-decoration-none"
          >
            {title}
          </Link>
        </Card.Title>
        <ul className="list-unstyled small text-muted">
          <li className="mb-1">
            <i className="bi bi-calendar me-2" />
            {new Date(startTime).toLocaleDateString()}
          </li>
          {address && (
            <li className="mb-1">
              <i className="bi bi-geo-alt me-2" />
              {address}
            </li>
          )}
        </ul>
      </Card.Body>
    </Card>
  ),
);
