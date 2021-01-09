import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SavedTrails from './saved-trails';
import SavedTrailsDetail from './saved-trails-detail';
import SavedTrailsUpdate from './saved-trails-update';
import SavedTrailsDeleteDialog from './saved-trails-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SavedTrailsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SavedTrailsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SavedTrailsDetail} />
      <ErrorBoundaryRoute path={match.url} component={SavedTrails} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={SavedTrailsDeleteDialog} />
  </>
);

export default Routes;
