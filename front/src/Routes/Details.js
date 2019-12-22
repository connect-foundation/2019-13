import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faSignInAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { LOAD_PROJECT, TOGGLE_LIKE, ME, ADD_VIEW } from '../apollo/queries/Project';
import Comments from '../Components/Comment/Comments';
import { setLocalStorageItem } from '../utils/storage';
import DetailCanvas from '../Components/DetailCanvas';
import workspaceList from '../core/blocks/workspace/workspaceList';
import Workspace from '../core/blocks/workspace/workspace';
import makeBlock from '../utils/makeBlock';
import Footer from '../Components/Footer';
import Loading from '../Components/Loading';
import { stop } from '../utils/playBlocks';

const VIEW_DELAY = 3600000;
let images = [];

const Detail = ({ match, history }) => {
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
        const projectData = res.findProjectById;
        setProject(res.findProjectById);
        setIsLiked(res.findProjectById.isLiked);
        setLikeCount(res.findProjectById.likeCount);
        images = [];
        const render = workspaceList.workspaces[0].setRender;
        workspaceList.workspaces = [];
        workspaceList.images = [];
        workspaceList.dropdownItems.sprite = { wall: '벽' };
        projectData.workspaces.forEach((ws) => {
          const newWorkSpace = new Workspace({
            setRender: render, id: ws.id, imageId: ws.images[0].id,
          });
          makeBlock(ws.blocks, newWorkSpace);
          workspaceList.workspaces.push(newWorkSpace);
          workspaceList.images.push(ws.images[0].id);
          workspaceList.dropdownItems.sprite[ws.images[0].id] = ws.images[0].name;
          images.push(ws.images[0]);
        });
        // eslint-disable-next-line
          workspaceList.currentImageId = workspaceList.images[0];
        setReady(true);
      }
    },
  });
  const [toggleLike] = useMutation(TOGGLE_LIKE, {
    onCompleted(res) {
      if (res.toggleLike) {
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
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
  }, [addView, loadProject, match.params.name, me]);


  const likeHandler = () => {
    if (localStorage.getItem('token')) {
      toggleLike({
        variables: { projectId: project.id },
      });
    }
  };

  if (!ready) return <Loading />;

  return (
    <Wrapper>
      <BodyWrapper>
        <ProjectWrapper project={project} isLiked={isLiked}>
          <div className="canvas">
            <DetailCanvas blocks={project.blocks} images={images} />
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
                  <button type="button" onClick={stop}>
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
      </BodyWrapper>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
    min-height: ${props => props.theme.footerPageMinHeight};
`;

const BodyWrapper = styled.div`
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
        height:fit-content;
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
        .star-icon{
          color: ${props => (props.isLiked === true ? props.theme.likeColor : 'grey')};
        }
        display: flex;
        #views{
          cursor: default;
        }
      }
    }
`;

export default Detail;

Detail.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
