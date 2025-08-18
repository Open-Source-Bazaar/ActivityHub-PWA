import { FileModel } from 'mobx-restful-table';
import { toggle } from 'mobx-restful';
import { blobOf } from 'web-utility';

import { upload } from './Base';

export class S3FileModel extends FileModel {
  @toggle('uploading')
  async upload(file: string | Blob) {
    if (typeof file === 'string') {
      file = await blobOf(file);
    }
    
    const fileURL = await upload(file);
    return super.upload(fileURL);
  }

  @toggle('uploading')
  async delete(link: string) {
    // For now, we don't have a delete API, so just remove from the files array
    await super.delete(link);
  }
}

export default new S3FileModel();