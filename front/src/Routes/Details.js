import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { WorkspaceContext } from '../Context';
import { LOAD_PROJECT, TOGGLE_LIKE } from '../Apollo/queries/Project';

export default ({ match, history }) => {
  const [project, setProject] = useState();
  const [isLiked, setIsLiked] = useState();
  const [likeCount, setLikeCount] = useState();
  const [ready, setReady] = useState(false);
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
  const [toggleLike] = useMutation(TOGGLE_LIKE);
  useEffect(() => {
    if (match.params.name) {
      loadProject({
        variables: { projectId: match.params.name },
      });
    }
  }, []);

  const likeHandler = () => {

  };

  if (!ready) return <span>loading...</span>;

  return (
    <Wrapper>
      <ProjectWrapper project={project} isLiked={isLiked}>
        <div className="canvas">canvas</div>
        <div className="controller">controll</div>
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
      <CommentWrapper>
        <div>댓글 0개</div>
      </CommentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
    padding-top: 30px;
    width: 850px;
    margin: auto;
`;

const ProjectWrapper = styled.div`
    border-top: ${props => props.theme.mainBorder};
    border-left: ${props => props.theme.mainBorder};
    border-right: ${props => props.theme.mainBorder};
    background: white;
    &>div {
        border-bottom: ${props => props.theme.mainBorder};
    }
    .canvas {
        height:478px;
    }
    .controller {
        height: 30px;
    }
    .projectInfo{
      padding: 20px;
      height: fit-content;
      display: flex;
      justify-content:space-between;
      align-items: center;
      & > div {
        display: flex;
      }
      #userImg {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-image: url(${props => props.project.owner.picture});
        background-size: cover;
      }
      #textInfo {
        margin-left: 25px;
        display: flex;
        flex-direction: column;
        & > * {
          margin-bottom:10px;
        }
        h2 {
          font-weight: bold;
          font-size: 20px;
        }
      }
      button {
          cursor: pointer;
          border: none;
          span {
            margin-left: 10px;
          }
      }
      a {
        button {
          background: #5fa0ff;
          color: white;
          font-weight: bold;
          padding: 10px;
          border-radius: 5px;
        }
        
      }
      #projectCount {
        margin-top: 10px;
        button {
          background: none;
        }
      }
    }
`;

const CommentWrapper = styled.div`
  margin-top: 50px;
`;
