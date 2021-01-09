import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './saved-trails.reducer';
import { ISavedTrails } from 'app/shared/model/saved-trails.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISavedTrailsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class SavedTrailsDetail extends React.Component<ISavedTrailsDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { savedTrailsEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="blogApp.savedTrails.detail.title">SavedTrails</Translate> [<b>{savedTrailsEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">
                <Translate contentKey="blogApp.savedTrails.title">Title</Translate>
              </span>
            </dt>
            <dd>{savedTrailsEntity.title}</dd>
            <dt>
              <Translate contentKey="blogApp.savedTrails.user">User</Translate>
            </dt>
            <dd>{savedTrailsEntity.user ? savedTrailsEntity.user.login : ''}</dd>
            <dt>
              <Translate contentKey="blogApp.savedTrails.trail">Trail</Translate>
            </dt>
            <dd>{savedTrailsEntity.trail ? savedTrailsEntity.trail.name : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/saved-trails" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/saved-trails/${savedTrailsEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ savedTrails }: IRootState) => ({
  savedTrailsEntity: savedTrails.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SavedTrailsDetail);
