import { Place } from '../../types/temp';
import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';
import { Button, Modal } from 'react-bootstrap';

import placeStore from '../../models/Place';
import { i18n, I18nContext } from '../../models/Translation';
import { PlaceManager } from './Manager';

export interface PlaceSelectorProps {
  value?: Place;
  onChange: (place: Place | null) => void;
  placeholder?: string;
}

@observer
export class PlaceSelector extends ObservedComponent<PlaceSelectorProps, typeof i18n> {
  static contextType = I18nContext;

  state = {
    showModal: false,
  };

  componentDidMount() {
    if (placeStore.allItems.length === 0) {
      placeStore.getList();
    }
  }

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handlePlaceSelect = (place: Place) => {
    const { onChange } = this.props;
    onChange(place);
    this.handleCloseModal();
  };

  handleClearSelection = () => {
    const { onChange } = this.props;
    onChange(null);
  };

  render() {
    const { t } = this.observedContext;
    const { value, placeholder } = this.props;
    const { showModal } = this.state;

    return (
      <>
        <div className="d-flex align-items-center">
          <Button
            variant="outline-secondary"
            className="me-2"
            onClick={this.handleOpenModal}
          >
            {value ? value.name : placeholder || t('select_room')}
          </Button>
          {value && (
            <Button
              variant="outline-danger"
              size="sm"
              onClick={this.handleClearSelection}
            >
              清除
            </Button>
          )}
        </div>

        <Modal show={showModal} size="xl" onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{t('select_room')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PlaceManager
              selectable
              onPlaceSelect={this.handlePlaceSelect}
            />
          </Modal.Body>
        </Modal>
      </>
    );
  }
}