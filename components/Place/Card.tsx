import { Place, PlaceType } from '@open-source-bazaar/activityhub-service';
import { FC, useContext } from 'react';
import { Badge, Button, Card } from 'react-bootstrap';

import { I18nContext } from '../../models/Translation';

export interface PlaceCardProps {
  place: Place;
  onEdit?: (place: Place) => void;
  selected?: boolean;
  onSelect?: (place: Place) => void;
}





export const PlaceCard: FC<PlaceCardProps> = ({
  place,
  onEdit,
  selected,
  onSelect,
}) => {
  const { t } = useContext(I18nContext);
  
  const placeTypeLabels = {
    [PlaceType.Room]: t('meeting_room'),
    [PlaceType.Hall]: t('lecture_hall'),
    [PlaceType.Cafe]: t('reception_hall'),
    [PlaceType.Restaurant]: t('lounge')
  };

  const weekDayLabels = [
    t('sunday'),
    t('monday'),
    t('tuesday'), 
    t('wednesday'),
    t('thursday'),
    t('friday'),
    t('saturday')
  ];

  const className = [
    onSelect ? 'cursor-pointer' : '',
    selected ? 'border-primary' : ''
  ].filter(Boolean).join(' ');

  return (
    <Card
      className={className}
      onClick={() => onSelect?.(place)}
    >
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div>
          <Badge bg="secondary" className="me-2">
            {placeTypeLabels[place.type] || t('type')}
          </Badge>
          <strong>{place.name}</strong>
        </div>
        {onEdit && (
          <Button
            size="sm"
            variant="outline-primary"
            href={`/place/${place.id}/editor`}
          >
            {t('edit')}
          </Button>
        )}
      </Card.Header>
      <Card.Body as="dl">
        {place.address && (
          <>
            <dt>{t('location')}</dt>
            <dd>{place.address}</dd>
          </>
        )}
        <dt>{t('capacity')}</dt>
        <dd>{place.size} {t('participants')}</dd>
        {place.openTime && place.closeTime && (
          <>
            <dt>{t('opening_hours')}</dt>
            <dd>{place.openTime} - {place.closeTime}</dd>
          </>
        )}
        {place.openWeekDays?.length && (
          <>
            <dt>{t('open_days')}</dt>
            <dd>
              {place.openWeekDays
                .map(day => weekDayLabels[day])
                .join(', ')}
            </dd>
          </>
        )}
        {place.devices?.length && (
          <>
            <dt>{t('equipment')}</dt>
            <dd>
              {place.devices.map(device => (
                <Badge key={device} bg="info" className="me-1">
                  {device}
                </Badge>
              ))}
            </dd>
          </>
        )}
      </Card.Body>
    </Card>
  );
};