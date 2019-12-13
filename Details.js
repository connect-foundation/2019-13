import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faSignInAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { LOAD_PROJECT, TOGGLE_LIKE, ME, ADD_VIEW } from '../Apollo/queries/Project';
import Comments from '../Components/Comment/Comments';
import { setLocalStorageItem } from '../utils/storage';
import DetailCanvas from '../Components/detailCanvas';


const VIEW_DELAY = 3600000;

export default ({ match, history }) => {
  const [user, setUser] = useState();
  const [project, setProject] = useState();
  const [isLiked, setIsLiked] = useState();
  const [addView] = useMutation(ADD_VIEW);
  const [likeCount, setLikeCount] = useState();
  const [ready, setReady] = useState(false);
  const [me] = useLazyQuery(ME, {
    onCompleted(res) {
      if (res.me) {
        setUser(res.me);
      }
    },
  });

  const [loadProject] = useLazyQuery(LOAD_PROJECT, {
    onCompleted(res) {
      if (!res.findProjectById) {
        history.goBack();
      } else {
        setProject(res.findProjectById);
        setIsLiked(res.findProjectById.isLiked);
        setLikeCount(res.findProjectById.likeCount);
        setReady(true);
      }
    },
  });
  const [toggleLike] = useMutation(TOGGLE_LIKE, {
    onCompleted(res) {
      if (res.toggleLike) {
        isLiked ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1);
        setIsLiked(!isLiked);
      }
    },
  });

  useEffect(() => {
    if (match.params.name) {
      const projectId = match.params.name;
      me();
      loadProject({
        variables: { projectId },
      });

      const old = localStorage.getItem(projectId);
      const now = new Date().getTime();

      if (!old || old + VIEW_DELAY < now) {
        addView({
          variables: { projectId },
        });
        setLocalStorageItem([
          { key: projectId, value: now },
        ]);
      }
    }
  }, []);


  const likeHandler = () => {
    if (localStorage.getItem('token')) {
      toggleLike({
        variables: { projectId: project.id },
      });
    }
  };

  if (!ready) return <span>loading...</span>;

  return (
    <Wrapper>
      <ProjectWrapper project={project} isLiked={isLiked}>
        <div className="canvas">
          {/* 캔버스 부분은 안보셔도 됩니다. */}
          <DetailCanvas blocks={project.blocks} />
        </div>
        <div className="projectInfo">
          <div>
            <div id="userImg" />
            <div id="textInfo">
              <h2>{project.title}</h2>
              <h5>
                {`by ${project.owner.email}`}
              </h5>
            </div>
          </div>
          <div>
            <div>
              <Link to={`/project/${match.params.name}`}>
                <button type="button">
                  <FontAwesomeIcon icon={faSignInAlt} />
                  <span>코드 보기</span>
                </button>
              </Link>
              <div id="projectCount">
                <button type="button" id="views">
                  <FontAwesomeIcon icon={faEye} className="faEye-icon" />
                  <span>{project.views}</span>
                </button>
                <button type="button" onClick={likeHandler}>
                  <FontAwesomeIcon icon={faStar} className="star-icon" />
                  <span>{likeCount}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>{project.description}</div>
      </ProjectWrapper>
      <Comments project={project} user={user} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
    /* css코드는 삭제하였습니다. */
`;

const ProjectWrapper = styled.div`
    /* css코드는 삭제하였습니다. */
`;
