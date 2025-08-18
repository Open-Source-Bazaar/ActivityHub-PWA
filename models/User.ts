import { User, WebAuthnChallenge } from '@open-source-bazaar/activityhub-service';
import { client } from '@passwordless-id/webauthn';
import { clear } from 'idb-keyval';
import { HTTPClient } from 'koajax';
import { observable } from 'mobx';
import { persist, restore, toggle } from 'mobx-restful';

import { TableModel } from './Base';
import { API_HOST } from './configuration';

export class UserModel extends TableModel<User> {
  baseURI = 'user';

  @persist()
  @observable
  accessor session: User | undefined;

  restored = restore(this, 'User');

  client = new HTTPClient({ baseURI: API_HOST, responseType: 'json' }).use(({ request }, next) => {
    const isSameDomain = API_HOST.startsWith(new URL(request.path, API_HOST).origin);

    if (isSameDomain && this.session)
      request.headers = {
        ...request.headers,
        Authorization: `Bearer ${this.session.token}`,
      };

    return next();
  });

  @toggle('uploading')
  async sendOTP(address: string) {
    await this.client.post(`user/session/email/${address}/OTP`);
  }

  @toggle('uploading')
  async signUp(email: string, password: string) {
    const { body } = await this.client.post<User>('user', { email, password });

    return body;
  }

  @toggle('uploading')
  async signIn(email: string, password: string) {
    const { body } = await this.client.post<User>('user/session', { email, password });

    return (this.session = body);
  }

  @toggle('uploading')
  async createChallenge() {
    const { body } = await this.client.post<WebAuthnChallenge>('user/WebAuthn/challenge');

    return body!.string;
  }

  @toggle('uploading')
  async signUpWebAuthn(email: string) {
    const challenge = await this.createChallenge();

    const registration = await client.register({ user: email, challenge });

    const { body } = await this.client.post<User>('user/WebAuthn/registration', {
      ...registration,
      challenge,
    });

    return (this.session = body);
  }

  @toggle('uploading')
  async signInWebAuthn() {
    const challenge = await this.createChallenge();

    const authentication = await client.authenticate({ challenge });

    const { body } = await this.client.post<User>('user/WebAuthn/authentication', {
      ...authentication,
      challenge,
    });

    return (this.session = body);
  }

  @toggle('uploading')
  async signOut() {
    await clear();

    location.hash = '';
  }
}

export default new UserModel();
