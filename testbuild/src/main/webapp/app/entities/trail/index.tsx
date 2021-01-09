import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Trail from './trail';
import TrailDetail from './trail-detail';
import TrailUpdate from './trail-update';
import TrailDeleteDialog from './trail-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TrailUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TrailUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TrailDetail} />
      <ErrorBoundaryRoute path={match.url} component={Trail} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TrailDeleteDialog} />
  </>
);

export default Routes;
