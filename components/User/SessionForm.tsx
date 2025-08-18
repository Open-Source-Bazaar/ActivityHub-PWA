import { SignInData, SignUpData } from '@open-source-bazaar/activityhub-service';
import { Icon } from 'idea-react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { FormField } from 'mobx-restful-table';
import { Component, FormEvent, MouseEvent } from 'react';
import { Button, Nav, NavLink } from 'react-bootstrap';
import { formToJSON } from 'web-utility';

import userStore from '../../models/User';

export interface SessionFormProps {
  onSignIn: (data?: SignInData) => any;
}

interface SignUpInput extends SignUpData {
  repeat_password: string;
}

@observer
export class SessionForm extends Component<SessionFormProps> {
  @observable
  accessor signType: 'up' | 'in' = 'in';

  handleOTP = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const { email } = formToJSON<SignInData>(event.currentTarget.form!);

    await userStore.sendOTP(email);

    alert('Check your email for the one-time password');
  };

  handleWebAuthn = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const { email, password } = formToJSON<SignInData>(event.currentTarget.form!);

    if (this.signType === 'up') {
      if (!email) throw new Error('Email is required for WebAuthn sign-up');

      await userStore.signUpWebAuthn(email);
    } else await userStore.signInWebAuthn();

    this.props.onSignIn?.({ email, password });
  };

  handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const { email, password, repeat_password } = formToJSON<SignUpInput>(event.currentTarget);

    if (this.signType === 'up') {
      if (password !== repeat_password) throw new Error('Passwords do not match');

      await userStore.signUp(email, password);

      this.signType = 'in';
    } else {
      await userStore.signIn(email, password);

      this.props.onSignIn({ email, password });
    }
  };

  renderPasswordField = (signType = this.signType, loading = false) => (
    <div className="d-flex flex-column justify-content-center gap-2">
      <FormField
        as="input"
        type="password"
        name="password"
        required
        autoFocus
        placeholder="Password"
        label="Password"
      />
      {signType === 'up' ? (
        <FormField
          as="input"
          type="password"
          name="repeat_password"
          required
          autoFocus
          placeholder="Repeat Password"
          label="Repeat Password"
        />
      ) : (
        <Button type="button" variant="secondary" disabled={loading} onClick={this.handleOTP}>
          Send One-Time Password
        </Button>
      )}
    </div>
  );

  render() {
    const { signType } = this,
      loading = userStore.uploading > 0;

    return (
      <form
        className="d-flex flex-column justify-content-center gap-2"
        onSubmit={this.handleSubmit}
      >
        <Nav className="nav-pills nav-justified">
          <NavLink active={signType === 'up'} onClick={() => (this.signType = 'up')}>
            Sign up
          </NavLink>
          <NavLink active={signType === 'in'} onClick={() => (this.signType = 'in')}>
            Sign in
          </NavLink>
        </Nav>
        <FormField
          as="input"
          type="email"
          name="email"
          required
          autoFocus
          placeholder="Email address"
          label="Email address"
        />
        <div className="d-flex align-items-center gap-2">
          {this.renderPasswordField(signType, loading)}

          <Button
            type="button"
            variant="secondary"
            disabled={loading}
            onClick={this.handleWebAuthn}
          >
            <Icon name="fingerprint" size={3} />
          </Button>
        </div>
        <Button
          type="submit"
          variant="primary"
          className="d-block w-100"
          size="lg"
          disabled={loading}
        >
          Sign {signType}
        </Button>
      </form>
    );
  }
}
