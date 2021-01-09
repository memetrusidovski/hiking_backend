import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITrail } from 'app/shared/model/trail.model';
import { getEntities as getTrails } from 'app/entities/trail/trail.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './review.reducer';
import { IReview } from 'app/shared/model/review.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IReviewUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IReviewUpdateState {
  isNew: boolean;
  trailId: string;
}

export class ReviewUpdate extends React.Component<IReviewUpdateProps, IReviewUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      trailId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getTrails();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { reviewEntity } = this.props;
      const entity = {
        ...reviewEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/review');
  };

  render() {
    const { reviewEntity, trails, loading, updating } = this.props;
    const { isNew } = this.state;

    const { content } = reviewEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="blogApp.review.home.createOrEditLabel">
              <Translate contentKey="blogApp.review.home.createOrEditLabel">Create or edit a Review</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : reviewEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="review-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="review-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="review-title">
                    <Translate contentKey="blogApp.review.title">Title</Translate>
                  </Label>
                  <AvField
                    id="review-title"
                    type="text"
                    name="title"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="contentLabel" for="review-content">
                    <Translate contentKey="blogApp.review.content">Content</Translate>
                  </Label>
                  <AvInput
                    id="review-content"
                    type="textarea"
                    name="content"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="ratingLabel" for="review-rating">
                    <Translate contentKey="blogApp.review.rating">Rating</Translate>
                  </Label>
                  <AvField
                    id="review-rating"
                    type="string"
                    className="form-control"
                    name="rating"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="review-trail">
                    <Translate contentKey="blogApp.review.trail">Trail</Translate>
                  </Label>
                  <AvInput id="review-trail" type="select" className="form-control" name="trail.id">
                    <option value="" key="0" />
                    {trails
                      ? trails.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/review" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  trails: storeState.trail.entities,
  reviewEntity: storeState.review.entity,
  loading: storeState.review.loading,
  updating: storeState.review.updating,
  updateSuccess: storeState.review.updateSuccess
});

const mapDispatchToProps = {
  getTrails,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewUpdate);
