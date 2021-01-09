import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './trail.reducer';
import { ITrail } from 'app/shared/model/trail.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITrailDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TrailDetail extends React.Component<ITrailDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { trailEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="blogApp.trail.detail.title">Trail</Translate> [<b>{trailEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">
                <Translate contentKey="blogApp.trail.title">Title</Translate>
              </span>
            </dt>
            <dd>{trailEntity.title}</dd>
            <dt>
              <span id="url">
                <Translate contentKey="blogApp.trail.url">Url</Translate>
              </span>
            </dt>
            <dd>{trailEntity.url}</dd>
            <dt>
              <span id="content">
                <Translate contentKey="blogApp.trail.content">Content</Translate>
              </span>
            </dt>
            <dd>{trailEntity.content}</dd>
            <dt>
              <span id="date">
                <Translate contentKey="blogApp.trail.date">Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={trailEntity.date} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="blogApp.trail.tag">Tag</Translate>
            </dt>
            <dd>
              {trailEntity.tags
                ? trailEntity.tags.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.name}</a>
                      {i === trailEntity.tags.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/trail" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/trail/${trailEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ trail }: IRootState) => ({
  trailEntity: trail.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrailDetail);
