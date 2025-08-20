import 'core-js/full/array/from-async';

import { Base, ListChunk } from '@open-source-bazaar/activityhub-service';
import { HTTPClient } from 'koajax';
import { githubClient, RepositoryModel } from 'mobx-github';
import { Filter, IDType, ListModel, toggle } from 'mobx-restful';
import { buildURLData } from 'web-utility';

import { GITHUB_TOKEN, Own_API_Host } from './configuration';

export interface TagBase extends Base {
  name: string;
}

export const ownClient = new HTTPClient({
  baseURI: `${Own_API_Host}/api/`,
  responseType: 'json',
});

githubClient.use(({ request }, next) => {
  if (GITHUB_TOKEN)
    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    };

  return next();
});

export const repositoryStore = new RepositoryModel('open-source-bazaar');

type UploadedFile = Record<'originalname' | 'filename' | 'location', string>;
/**
 * @see {@link https://fakeapi.platzi.com/en/rest/files/}
 */
export async function upload(file: Blob) {
  const form = new FormData();
  form.append('file', file);

  const { body } = await ownClient.post<UploadedFile>(
    'https://api.escuelajs.co/api/v1/files/upload',
    form,
  );

  return body!.location;
}

export abstract class TableModel<D extends Base, F extends Filter<D> = Filter<D>> extends ListModel<
  D,
  F
> {
  @toggle('uploading')
  async updateOne(data: Filter<D>, id?: IDType) {
    const { body } = await (id
      ? this.client.put<D>(`${this.baseURI}/${id}`, data)
      : this.client.post<D>(this.baseURI, data));

    return (this.currentOne = body!);
  }

  async loadPage(pageIndex: number, pageSize: number, filter: F) {
    const { body } = await this.client.get<ListChunk<D>>(
      `${this.baseURI}?${buildURLData({ ...filter, pageIndex, pageSize })}`,
    );

    return { pageData: body!.list, totalCount: body!.count };
  }
}
