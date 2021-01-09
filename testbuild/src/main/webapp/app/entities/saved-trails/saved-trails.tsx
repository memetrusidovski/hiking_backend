import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './saved-trails.reducer';
import { ISavedTrails } from 'app/shared/model/saved-trails.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISavedTrailsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class SavedTrails extends React.Component<ISavedTrailsProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { savedTrailsList, match } = this.props;
    return (
      <div>
        <h2 id="saved-trails-heading">
          <Translate contentKey="blogApp.savedTrails.home.title">Saved Trails</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="blogApp.savedTrails.home.createLabel">Create new Saved Trails</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {savedTrailsList && savedTrailsList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="blogApp.savedTrails.title">Title</Translate>
                  </th>
                  <th>
                    <Translate contentKey="blogApp.savedTrails.user">User</Translate>
                  </th>
                  <th>
                    <Translate contentKey="blogApp.savedTrails.trail">Trail</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {savedTrailsList.map((savedTrails, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${savedTrails.id}`} color="link" size="sm">
                        {savedTrails.id}
                      </Button>
                    </td>
                    <td>{savedTrails.title}</td>
                    <td>{savedTrails.user ? savedTrails.user.login : ''}</td>
                    <td>{savedTrails.trail ? <Link to={`trail/${savedTrails.trail.id}`}>{savedTrails.trail.name}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${savedTrails.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${savedTrails.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${savedTrails.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="blogApp.savedTrails.home.notFound">No Saved Trails found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ savedTrails }: IRootState) => ({
  savedTrailsList: savedTrails.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SavedTrails);
