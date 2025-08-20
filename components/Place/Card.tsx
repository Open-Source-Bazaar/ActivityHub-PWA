import { Place } from '@open-source-bazaar/activityhub-service';
import { FC } from 'react';
import { Badge, Button, Card } from 'react-bootstrap';

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
            {['房间', '会堂', '茶座', '餐厅'][place.type] || '未知'}
          </Badge>
          <strong>{place.name}</strong>
        </div>
        {onEdit && (
          <Button
            size="sm"
            variant="outline-primary"
            href={`/place/${place.id}/editor`}
          >
            编辑
          </Button>
        )}
      </Card.Header>
      <Card.Body as="dl">
        {place.address && (
          <>
            <dt>位置</dt>
            <dd>{place.address}</dd>
          </>
        )}
        <dt>容纳人数</dt>
        <dd>{place.size} 人</dd>
        {place.openTime && place.closeTime && (
          <>
            <dt>开放时间</dt>
            <dd>{place.openTime} - {place.closeTime}</dd>
          </>
        )}
        {place.openWeekDays && place.openWeekDays.length > 0 && (
          <>
            <dt>开放日期</dt>
            <dd>
              {place.openWeekDays
                .map(day => ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][day])
                .join(', ')}
            </dd>
          </>
        )}
        {place.devices && place.devices.length > 0 && (
          <>
            <dt>设备</dt>
            <dd>
              {place.devices.map((device, index) => (
                <Badge key={index} bg="info" className="me-1">
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