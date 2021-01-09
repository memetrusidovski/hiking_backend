import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './review.reducer';
import { IReview } from 'app/shared/model/review.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IReviewDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ReviewDetail extends React.Component<IReviewDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { reviewEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="blogApp.review.detail.title">Review</Translate> [<b>{reviewEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">
                <Translate contentKey="blogApp.review.title">Title</Translate>
              </span>
            </dt>
            <dd>{reviewEntity.title}</dd>
            <dt>
              <span id="content">
                <Translate contentKey="blogApp.review.content">Content</Translate>
              </span>
            </dt>
            <dd>{reviewEntity.content}</dd>
            <dt>
              <span id="rating">
                <Translate contentKey="blogApp.review.rating">Rating</Translate>
              </span>
            </dt>
            <dd>{reviewEntity.rating}</dd>
            <dt>
              <Translate contentKey="blogApp.review.trail">Trail</Translate>
            </dt>
            <dd>{reviewEntity.trail ? reviewEntity.trail.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/review" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/review/${reviewEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ review }: IRootState) => ({
  reviewEntity: review.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewDetail);
