import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './post.reducer';
import { IPost } from 'app/shared/model/post.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPostDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PostDetail extends React.Component<IPostDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { postEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="blogApp.post.detail.title">Post</Translate> [<b>{postEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">
                <Translate contentKey="blogApp.post.title">Title</Translate>
              </span>
            </dt>
            <dd>{postEntity.title}</dd>
            <dt>
              <span id="content">
                <Translate contentKey="blogApp.post.content">Content</Translate>
              </span>
            </dt>
            <dd>{postEntity.content}</dd>
            <dt>
              <span id="date">
                <Translate contentKey="blogApp.post.date">Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={postEntity.date} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="blogApp.post.blog">Blog</Translate>
            </dt>
            <dd>{postEntity.blog ? postEntity.blog.name : ''}</dd>
            <dt>
              <Translate contentKey="blogApp.post.tag">Tag</Translate>
            </dt>
            <dd>
              {postEntity.tags
                ? postEntity.tags.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.name}</a>
                      {i === postEntity.tags.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/post" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/post/${postEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ post }: IRootState) => ({
  postEntity: post.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail);
