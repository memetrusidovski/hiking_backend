import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Blog from './blog';
import Post from './post';
import Tag from './tag';
import SavedTrails from './saved-trails';
import Trail from './trail';
import Review from './review';
import Comments from './comments';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/blog`} component={Blog} />
      <ErrorBoundaryRoute path={`${match.url}/post`} component={Post} />
      <ErrorBoundaryRoute path={`${match.url}/tag`} component={Tag} />
      <ErrorBoundaryRoute path={`${match.url}/saved-trails`} component={SavedTrails} />
      <ErrorBoundaryRoute path={`${match.url}/trail`} component={Trail} />
      <ErrorBoundaryRoute path={`${match.url}/review`} component={Review} />
      <ErrorBoundaryRoute path={`${match.url}/comments`} component={Comments} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
