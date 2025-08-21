import { Place, PlaceType } from '@open-source-bazaar/activityhub-service';
import { Loading } from 'idea-react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';
import { Field, RestForm } from 'mobx-restful-table';

import { OrganizationModel } from '../../models/Organization';
import placeStore from '../../models/Place';
import { i18n, I18nContext } from '../../models/Translation';
import { renderTagInput } from '../Tag';
import { WeekDayMap } from './Card';

export interface PlaceEditorProps {
  place?: Place;
}

const placeTypeOptions = ({ t }: typeof i18n) => [
  { value: PlaceType.Room, title: t('meeting_room') },
  { value: PlaceType.Hall, title: t('lecture_hall') },
  { value: PlaceType.Cafe, title: t('reception_hall') },
  { value: PlaceType.Restaurant, title: t('lounge') },
];

const equipmentOptions = ({ t }: typeof i18n) => [
  { value: 'network', title: t('network') },
  { value: 'projector', title: t('projector') },
  { value: 'led_screen', title: t('led_screen') },
  { value: 'microphone', title: t('microphone') },
];

@observer
export class PlaceEditor extends ObservedComponent<PlaceEditorProps, typeof i18n> {
  static contextType = I18nContext;

  organizationStore = new OrganizationModel();

  componentDidMount() {
    const { place } = this.props;

    if (place) placeStore.currentOne = place;
  }

  submitHandler = ({ id }: Place) => {
    const { t } = this.observedContext,
      { place } = this.props;

    alert(place ? t('room_updated_successfully') : t('room_created_successfully'));

    window.location.href = `/place/${id}`;
  };

  @computed
  get fields(): Field<Place>[] {
    const i18n = this.observedContext;
    const { t } = i18n;

    return [
      {
        key: 'organization',
        renderLabel: '主办方',
        renderInput: renderTagInput(this.organizationStore),
      },
      {
        key: 'name',
        renderLabel: t('name'),
        required: true,
        invalidMessage: t('field_required'),
      },
      {
        key: 'type',
        renderLabel: t('type'),
        type: 'select',
        options: placeTypeOptions(i18n).map(({ value, title }) => ({ value: value + '', title })),
        required: true,
      },
      {
        key: 'address',
        renderLabel: t('address'),
      },
      {
        key: 'size',
        renderLabel: t('capacity'),
        type: 'number',
        min: 1,
        required: true,
        invalidMessage: t('field_required'),
      },
      {
        key: 'devices',
        renderLabel: t('devices'),
        type: 'select',
        multiple: true,
        options: equipmentOptions(i18n).map(({ value, title }) => ({ value: value + '', title })),
      },
      {
        key: 'openWeekDays',
        renderLabel: t('open_weekdays'),
        type: 'select',
        multiple: true,
        options: Object.entries(WeekDayMap(i18n)).map(([value, title]) => ({ value, title })),
      },
      {
        key: 'openTime',
        renderLabel: t('open_time'),
        type: 'time',
      },
      {
        key: 'closeTime',
        renderLabel: t('close_time'),
        type: 'time',
      },
    ];
  }

  render() {
    const { downloading, uploading } = placeStore;

    const loading = downloading > 0 || uploading > 0;

    return (
      <>
        <RestForm
          className="container-fluid"
          translator={this.observedContext}
          store={placeStore}
          fields={this.fields}
          onSubmit={this.submitHandler}
        />
        {loading && <Loading />}
      </>
    );
  }
}
