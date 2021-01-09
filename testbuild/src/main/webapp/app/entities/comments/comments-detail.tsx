import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './comments.reducer';
import { IComments } from 'app/shared/model/comments.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICommentsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CommentsDetail extends React.Component<ICommentsDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { commentsEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="blogApp.comments.detail.title">Comments</Translate> [<b>{commentsEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="author">
                <Translate contentKey="blogApp.comments.author">Author</Translate>
              </span>
            </dt>
            <dd>{commentsEntity.author}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="blogApp.comments.description">Description</Translate>
              </span>
            </dt>
            <dd>{commentsEntity.description}</dd>
          </dl>
          <Button tag={Link} to="/entity/comments" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/comments/${commentsEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ comments }: IRootState) => ({
  commentsEntity: comments.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsDetail);
