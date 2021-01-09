import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IComments } from 'app/shared/model/comments.model';
import { getEntities as getComments } from 'app/entities/comments/comments.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './trail.reducer';
import { ITrail } from 'app/shared/model/trail.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITrailUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ITrailUpdateState {
  isNew: boolean;
  idstag: any[];
}

export class TrailUpdate extends React.Component<ITrailUpdateProps, ITrailUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idstag: [],
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (!this.state.isNew) {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getComments();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    values.date = convertDateTimeToServer(values.date);

    if (errors.length === 0) {
      const { trailEntity } = this.props;
      const entity = {
        ...trailEntity,
        ...values,
        tags: mapIdList(values.tags)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/trail');
  };

  render() {
    const { trailEntity, comments, loading, updating } = this.props;
    const { isNew } = this.state;

    const { content } = trailEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="blogApp.trail.home.createOrEditLabel">
              <Translate contentKey="blogApp.trail.home.createOrEditLabel">Create or edit a Trail</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : trailEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="trail-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="trail-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="trail-title">
                    <Translate contentKey="blogApp.trail.title">Title</Translate>
                  </Label>
                  <AvField
                    id="trail-title"
                    type="text"
                    name="title"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="urlLabel" for="trail-url">
                    <Translate contentKey="blogApp.trail.url">Url</Translate>
                  </Label>
                  <AvField
                    id="trail-url"
                    type="text"
                    name="url"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="contentLabel" for="trail-content">
                    <Translate contentKey="blogApp.trail.content">Content</Translate>
                  </Label>
                  <AvInput
                    id="trail-content"
                    type="textarea"
                    name="content"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="dateLabel" for="trail-date">
                    <Translate contentKey="blogApp.trail.date">Date</Translate>
                  </Label>
                  <AvInput
                    id="trail-date"
                    type="datetime-local"
                    className="form-control"
                    name="date"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.trailEntity.date)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="trail-tag">
                    <Translate contentKey="blogApp.trail.tag">Tag</Translate>
                  </Label>
                  <AvInput
                    id="trail-tag"
                    type="select"
                    multiple
                    className="form-control"
                    name="tags"
                    value={trailEntity.tags && trailEntity.tags.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {comments
                      ? comments.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/trail" replace color="info">
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
  comments: storeState.comments.entities,
  trailEntity: storeState.trail.entity,
  loading: storeState.trail.loading,
  updating: storeState.trail.updating,
  updateSuccess: storeState.trail.updateSuccess
});

const mapDispatchToProps = {
  getComments,
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
)(TrailUpdate);
