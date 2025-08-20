import { Base, Tag } from '@open-source-bazaar/activityhub-service';
import { Filter, ListModel } from 'mobx-restful';
import { Field, RestForm, SearchableInput } from 'mobx-restful-table';
import { makeArray } from 'web-utility';

import { TagBase } from '../models/Base';
import { i18n } from '../models/Translation';

export const tagFields: Field<Tag>[] = [
  { key: 'name', renderLabel: '名称', required: true },
  {
    key: 'type',
    renderLabel: '类型',
    options: [
      { value: 'tag', text: '标签' },
      { value: 'cooperation', text: '赞助级别' },
    ],
  },
];

export const renderTagInput =
  <D extends Base, TD extends TagBase, TF extends Filter<TD> = Filter<TD>>(
    store: ListModel<TD, TF>,
    filter = {} as TF,
    fields?: Field<TD>[],
  ) =>
  (data: D, { key, renderLabel, multiple }: Field<D>) => (
    <RestForm.FieldBox name={key} renderLabel={renderLabel || key!.toString()}>
      <SearchableInput
        translator={i18n}
        {...{ store, fields, filter, multiple }}
        labelKey="name"
        valueKey="id"
        name={key as string}
        defaultValue={
          data[key!] &&
          makeArray(data[key!] as Tag).map(({ id, name }) => ({
            label: name,
            value: id + '',
          }))
        }
      />
    </RestForm.FieldBox>
  );
