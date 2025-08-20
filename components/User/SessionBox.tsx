import { User } from '@open-source-bazaar/activityhub-service';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { JWTProps } from 'next-ssr-middleware';
import { Component, HTMLAttributes, JSX } from 'react';
import { Modal, Nav } from 'react-bootstrap';

import { PageHead } from '../PageHead';
import { SessionForm } from './SessionForm';

export type MenuItem = Pick<JSX.IntrinsicElements['a'], 'href' | 'title'>;

export interface SessionBoxProps extends HTMLAttributes<HTMLDivElement>, JWTProps<User> {
  path?: string;
  menu?: MenuItem[];
}

@observer
export class SessionBox extends Component<SessionBoxProps> {
  @observable
  accessor modalShown = false;

  componentDidMount() {
    this.modalShown = !this.props.jwtPayload;
  }

  render() {
    const { className = '', title, children, path, menu = [], jwtPayload, ...props } = this.props;

    return (
      <div className={`d-flex ${className}`} {...props}>
        <div>
          <Nav variant="pills" className="flex-column px-3 sticky-top" style={{ top: '5rem' }}>
            {menu.map(({ href, title }) => (
              <Nav.Item key={href}>
                <Nav.Link href={href} active={path?.split('?')[0].startsWith(href!)}>
                  {title}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <main className="flex-fill pb-3">
          <PageHead title={title} />

          <h1>{title}</h1>

          {children}

          <Modal show={this.modalShown}>
            <Modal.Body>
              <SessionForm onSignIn={() => window.location.reload()} />
            </Modal.Body>
          </Modal>
        </main>
      </div>
    );
  }
}
