import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITrail } from 'app/shared/model/trail.model';
import { getEntities as getTrails } from 'app/entities/trail/trail.reducer';
import { getEntity, updateEntity, createEntity, reset } from './comments.reducer';
import { IComments } from 'app/shared/model/comments.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICommentsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICommentsUpdateState {
  isNew: boolean;
  entryId: string;
}

export class CommentsUpdate extends React.Component<ICommentsUpdateProps, ICommentsUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      entryId: '0',
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

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { commentsEntity } = this.props;
      const entity = {
        ...commentsEntity,
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
    this.props.history.push('/entity/comments');
  };

  render() {
    const { commentsEntity, trails, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="blogApp.comments.home.createOrEditLabel">
              <Translate contentKey="blogApp.comments.home.createOrEditLabel">Create or edit a Comments</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : commentsEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="comments-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="comments-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="authorLabel" for="comments-author">
                    <Translate contentKey="blogApp.comments.author">Author</Translate>
                  </Label>
                  <AvField id="comments-author" type="text" name="author" />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="comments-description">
                    <Translate contentKey="blogApp.comments.description">Description</Translate>
                  </Label>
                  <AvField
                    id="comments-description"
                    type="text"
                    name="description"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      minLength: { value: 2, errorMessage: translate('entity.validation.minlength', { min: 2 }) }
                    }}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/comments" replace color="info">
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
  commentsEntity: storeState.comments.entity,
  loading: storeState.comments.loading,
  updating: storeState.comments.updating,
  updateSuccess: storeState.comments.updateSuccess
});

const mapDispatchToProps = {
  getTrails,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsUpdate);
