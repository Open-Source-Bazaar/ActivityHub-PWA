import { FC } from 'react';
import { Card, Col, Image, Row } from 'react-bootstrap';

import { UserRank } from '../pages/api/home';

interface UserRankViewProps {
  title: string;
  rank: UserRank[];
  linkOf?: (user: { id: string }) => string;
}

export const UserRankView: FC<UserRankViewProps> = ({
  title,
  rank,
  linkOf,
}) => (
  <div>
    <h3 className="my-4 text-center">{title}</h3>
    <Row className="g-4" xs={1} sm={2} md={3} lg={5}>
      {rank.map(({ userId, user: { name, avatar, email }, score }) => (
        <Col key={userId}>
          <Card className="h-100 text-center border-0">
            <Card.Body>
              <div className="mb-3">
                <Image
                  src={avatar}
                  alt={name}
                  roundedCircle
                  width={80}
                  height={80}
                  className="mx-auto d-block"
                />
              </div>
              <Card.Title as="h4" className="fs-6 mb-2">
                {linkOf ? (
                  <a
                    href={linkOf({ id: userId })}
                    className="text-decoration-none"
                  >
                    {name}
                  </a>
                ) : (
                  name
                )}
              </Card.Title>
              <Card.Text className="text-muted small mb-2">{email}</Card.Text>
              <Card.Text className="fw-bold text-primary">
                {score} pts
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </div>
);
