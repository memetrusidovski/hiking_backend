import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { ITrail } from 'app/shared/model/trail.model';
import { getEntities as getTrails } from 'app/entities/trail/trail.reducer';
import { getEntity, updateEntity, createEntity, reset } from './saved-trails.reducer';
import { ISavedTrails } from 'app/shared/model/saved-trails.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISavedTrailsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ISavedTrailsUpdateState {
  isNew: boolean;
  userId: string;
  trailId: string;
}

export class SavedTrailsUpdate extends React.Component<ISavedTrailsUpdateProps, ISavedTrailsUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      userId: '0',
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

    this.props.getUsers();
    this.props.getTrails();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { savedTrailsEntity } = this.props;
      const entity = {
        ...savedTrailsEntity,
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
    this.props.history.push('/entity/saved-trails');
  };

  render() {
    const { savedTrailsEntity, users, trails, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="blogApp.savedTrails.home.createOrEditLabel">
              <Translate contentKey="blogApp.savedTrails.home.createOrEditLabel">Create or edit a SavedTrails</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : savedTrailsEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="saved-trails-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="saved-trails-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="saved-trails-title">
                    <Translate contentKey="blogApp.savedTrails.title">Title</Translate>
                  </Label>
                  <AvField
                    id="saved-trails-title"
                    type="text"
                    name="title"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      minLength: { value: 2, errorMessage: translate('entity.validation.minlength', { min: 2 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="saved-trails-user">
                    <Translate contentKey="blogApp.savedTrails.user">User</Translate>
                  </Label>
                  <AvInput id="saved-trails-user" type="select" className="form-control" name="user.id">
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.login}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="saved-trails-trail">
                    <Translate contentKey="blogApp.savedTrails.trail">Trail</Translate>
                  </Label>
                  <AvInput id="saved-trails-trail" type="select" className="form-control" name="trail.id">
                    <option value="" key="0" />
                    {trails
                      ? trails.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/saved-trails" replace color="info">
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
  users: storeState.userManagement.users,
  trails: storeState.trail.entities,
  savedTrailsEntity: storeState.savedTrails.entity,
  loading: storeState.savedTrails.loading,
  updating: storeState.savedTrails.updating,
  updateSuccess: storeState.savedTrails.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
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
)(SavedTrailsUpdate);
