import { DeviceType, Place, PlaceType } from '../../types/temp';
import { FC } from 'react';
import { Badge, Card } from 'react-bootstrap';

export interface PlaceCardProps {
  place: Place;
  onEdit?: (place: Place) => void;
  onDelete?: (place: Place) => void;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: (place: Place) => void;
}

const placeTypeLabels = {
  [PlaceType.Room]: '会议室',
  [PlaceType.Hall]: '演讲厅',
  [PlaceType.Cafe]: '会客厅',
  [PlaceType.Restaurant]: '休息室',
};

const deviceTypeLabels = {
  [DeviceType.Network]: '网络',
  [DeviceType.Projector]: '投影仪',
  [DeviceType.LED]: 'LED屏幕',
  [DeviceType.Microphone]: '麦克风',
};

export const PlaceCard: FC<PlaceCardProps> = ({
  place,
  onEdit,
  onDelete,
  selectable,
  selected,
  onSelect,
}) => {
  const handleCardClick = () => {
    if (selectable && onSelect) {
      onSelect(place);
    }
  };

  return (
    <Card
      className={`mb-3 ${selectable ? 'cursor-pointer' : ''} ${selected ? 'border-primary' : ''}`}
      onClick={handleCardClick}
    >
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div>
          <Badge bg="secondary" className="me-2">
            {placeTypeLabels[place.type]}
          </Badge>
          <strong>{place.name}</strong>
        </div>
        {!selectable && (
          <div>
            {onEdit && (
              <button
                className="btn btn-sm btn-outline-primary me-2"
                onClick={() => onEdit(place)}
              >
                编辑
              </button>
            )}
            {onDelete && (
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => onDelete(place)}
              >
                删除
              </button>
            )}
          </div>
        )}
      </Card.Header>
      <Card.Body>
        {place.address && (
          <div className="mb-2">
            <strong>位置：</strong> {place.address}
          </div>
        )}
        <div className="mb-2">
          <strong>容纳人数：</strong> {place.size} 人
        </div>
        {place.openTime && place.closeTime && (
          <div className="mb-2">
            <strong>开放时间：</strong> {place.openTime} - {place.closeTime}
          </div>
        )}
        {place.openWeekDays && place.openWeekDays.length > 0 && (
          <div className="mb-2">
            <strong>开放日期：</strong>{' '}
            {place.openWeekDays
              .map(day => ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][day])
              .join(', ')}
          </div>
        )}
        {place.devices && place.devices.length > 0 && (
          <div>
            <strong>设备：</strong>{' '}
            {place.devices.map(device => (
              <Badge key={device} bg="info" className="me-1">
                {deviceTypeLabels[device]}
              </Badge>
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};