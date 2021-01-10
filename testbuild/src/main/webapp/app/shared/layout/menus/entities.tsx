import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <MenuItem icon="asterisk" to="/entity/blog">
      <Translate contentKey="global.menu.entities.blog" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/post">
      <Translate contentKey="global.menu.entities.post" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/tag">
      <Translate contentKey="global.menu.entities.tag" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/saved-trails">
      <Translate contentKey="global.menu.entities.savedTrails" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/trail">
      <Translate contentKey="global.menu.entities.trail" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/review">
      <Translate contentKey="global.menu.entities.review" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/comments">
      <Translate contentKey="global.menu.entities.comments" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
