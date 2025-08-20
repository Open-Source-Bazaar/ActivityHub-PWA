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

export interface PlaceEditorProps {
  place?: Place;
}

const placeTypeOptions = ({ t }: typeof i18n) => [
  { value: PlaceType.Room, label: t('meeting_room') },
  { value: PlaceType.Hall, label: t('lecture_hall') },
  { value: PlaceType.Cafe, label: t('reception_hall') },
  { value: PlaceType.Restaurant, label: t('lounge') },
];

const equipmentOptions = [
  { value: 'network', label: 'network' },
  { value: 'projector', label: 'projector' },
  { value: 'led_screen', label: 'led_screen' },
  { value: 'microphone', label: 'microphone' },
];

const weekDayOptions = ({ t }: typeof i18n) => [
  { value: '0', title: t('sunday') },
  { value: '1', title: t('monday') },
  { value: '2', title: t('tuesday') },
  { value: '3', title: t('wednesday') },
  { value: '4', title: t('thursday') },
  { value: '5', title: t('friday') },
  { value: '6', title: t('saturday') },
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
    const { t } = this.observedContext;

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
        invalidMessage: t('room_name_required'),
      },
      {
        key: 'type',
        renderLabel: t('type'),
        type: 'select',
        options: placeTypeOptions(this.observedContext).map(({ value, label }) => ({
          value: value.toString(),
          title: label,
        })),
        required: true,
      },
      {
        key: 'address',
        renderLabel: t('activity_address'),
      },
      {
        key: 'size',
        renderLabel: t('room_capacity'),
        type: 'number',
        min: 1,
        required: true,
        invalidMessage: t('room_capacity_required'),
      },
      {
        key: 'devices',
        renderLabel: t('devices'),
        type: 'select',
        multiple: true,
        options: equipmentOptions.map(({ value, label }) => ({
          value: value + '',
          title: t(label as keyof typeof i18n.currentMap),
        })),
      },
      {
        key: 'openWeekDays',
        renderLabel: t('open_weekdays'),
        type: 'select',
        multiple: true,
        options: weekDayOptions(this.observedContext),
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