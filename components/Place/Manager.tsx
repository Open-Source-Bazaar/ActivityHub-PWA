import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';
import { Button, Col,Modal, Row } from 'react-bootstrap';

import placeStore from '../../models/Place';
import { i18n, I18nContext } from '../../models/Translation';
import { Place } from '../../types/temp';
import { PlaceCard } from './Card';
import { PlaceEditor } from './Editor';

export interface PlaceManagerProps {
  activityId?: number;
  onPlaceSelect?: (place: Place) => void;
  selectable?: boolean;
}

@observer
export class PlaceManager extends ObservedComponent<PlaceManagerProps, typeof i18n> {
  static contextType = I18nContext;

  state = {
    showEditor: false,
    editingPlace: null as Place | null,
  };

  componentDidMount() {
    this.loadPlaces();
  }

  loadPlaces = async () => {
    await placeStore.getList();
  };

  handleAddPlace = () => {
    this.setState({ showEditor: true, editingPlace: null });
  };

  handleEditPlace = (place: Place) => {
    this.setState({ showEditor: true, editingPlace: place });
  };

  handleDeletePlace = async (place: Place) => {
    const { t } = this.observedContext;
    
    if (confirm(`确定要删除房间 "${place.name}" 吗？`)) {
      try {
        await placeStore.deleteOne(place.id!);
        alert(t('room_deleted_successfully'));
        this.loadPlaces();
      } catch {
        alert('删除失败，请稍后重试');
      }
    }
  };

  handleCloseEditor = () => {
    this.setState({ showEditor: false, editingPlace: null });
  };

  handlePlaceSubmit = () => {
    this.handleCloseEditor();
    this.loadPlaces();
  };

  render() {
    const { t } = this.observedContext;
    const { onPlaceSelect, selectable } = this.props;
    const { showEditor, editingPlace } = this.state;
    const { allItems: places } = placeStore;

    return (
      <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>{t('room_management')}</h3>
          {!selectable && (
            <Button variant="primary" onClick={this.handleAddPlace}>
              {t('add_room')}
            </Button>
          )}
        </div>

        {places.length === 0 ? (
          <div className="text-center text-muted py-5">
            <p>{t('no_rooms_available')}</p>
          </div>
        ) : (
          <Row>
            {places.map(place => (
              <Col key={place.id} md={6} lg={4}>
                <PlaceCard
                  place={place}
                  selectable={selectable}
                  onEdit={selectable ? undefined : this.handleEditPlace}
                  onDelete={selectable ? undefined : this.handleDeletePlace}
                  onSelect={onPlaceSelect}
                />
              </Col>
            ))}
          </Row>
        )}

        <Modal show={showEditor} size="lg" onHide={this.handleCloseEditor}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingPlace ? t('edit_room') : t('add_room')}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PlaceEditor
              place={editingPlace || undefined}
              id={editingPlace?.id}
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}