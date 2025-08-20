import { DeviceType, Place, PlaceType } from '../../types/temp';
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
  id?: number;
  place?: Place;
}

const placeTypeOptions = [
  { value: PlaceType.Room, label: 'meeting_room' },
  { value: PlaceType.Hall, label: 'lecture_hall' },
  { value: PlaceType.Cafe, label: 'reception_hall' },
  { value: PlaceType.Restaurant, label: 'lounge' },
];

const deviceTypeOptions = [
  { value: DeviceType.Network, label: 'network' },
  { value: DeviceType.Projector, label: 'projector' },
  { value: DeviceType.LED, label: 'led_screen' },
  { value: DeviceType.Microphone, label: 'microphone' },
];

const weekDayOptions = [
  { value: '0', title: '周日' },
  { value: '1', title: '周一' },
  { value: '2', title: '周二' },
  { value: '3', title: '周三' },
  { value: '4', title: '周四' },
  { value: '5', title: '周五' },
  { value: '6', title: '周六' },
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
        renderLabel: '所属组织',
        renderInput: renderTagInput(this.organizationStore),
      },
      {
        key: 'name',
        renderLabel: t('room_name'),
        required: true,
        invalidMessage: t('room_name_required'),
      },
      {
        key: 'type',
        renderLabel: t('room_type'),
        type: 'select',
        options: placeTypeOptions.map(({ value, label }) => ({
          value: value.toString(),
          title: t(label as any),
        })),
        required: true,
      },
      {
        key: 'address',
        renderLabel: t('room_address'),
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
        options: deviceTypeOptions.map(({ value, label }) => ({
          value: value.toString(),
          title: t(label as any),
        })),
      },
      {
        key: 'openWeekDays',
        renderLabel: t('open_weekdays'),
        type: 'select',
        multiple: true,
        options: weekDayOptions,
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