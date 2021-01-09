import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { byteSize, Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './review.reducer';
import { IReview } from 'app/shared/model/review.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IReviewProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Review extends React.Component<IReviewProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { reviewList, match } = this.props;
    return (
      <div>
        <h2 id="review-heading">
          <Translate contentKey="blogApp.review.home.title">Reviews</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="blogApp.review.home.createLabel">Create new Review</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {reviewList && reviewList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="blogApp.review.title">Title</Translate>
                  </th>
                  <th>
                    <Translate contentKey="blogApp.review.content">Content</Translate>
                  </th>
                  <th>
                    <Translate contentKey="blogApp.review.rating">Rating</Translate>
                  </th>
                  <th>
                    <Translate contentKey="blogApp.review.trail">Trail</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {reviewList.map((review, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${review.id}`} color="link" size="sm">
                        {review.id}
                      </Button>
                    </td>
                    <td>{review.title}</td>
                    <td>{review.content}</td>
                    <td>{review.rating}</td>
                    <td>{review.trail ? <Link to={`trail/${review.trail.id}`}>{review.trail.id}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${review.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${review.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${review.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="blogApp.review.home.notFound">No Reviews found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ review }: IRootState) => ({
  reviewList: review.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Review);
