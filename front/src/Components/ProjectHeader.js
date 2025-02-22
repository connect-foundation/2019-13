
import React, { useState, useContext, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { WorkspaceContext, SpritesContext, LoggedInContext } from '../context';
import { CREATE_AND_SAVE, LOAD_PROJECT, UPDATE_BLOCK, TOGGLE_LIKE, TOGGLE_AUTH } from '../apollo/queries/Project';
import Snackbar from './Snackbar';
import makeBlock from '../utils/makeBlock';
import workspaceList from '../core/blocks/workspace/workspaceList';
import Workspace from '../core/blocks/workspace/workspace';
import dataURLtoFile from '../utils/dataURLtoFile';
import checkError from '../errorCheck';
import useSnackbar from '../customHooks/useSnackbar';

const ProjectHeader = ({ props, setReady }) => {
  const { setLoggedIn } = useContext(LoggedInContext);
  const [projectId, setProjectId] = useState();
  const [projectName, setProjectName] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [canSave, setCanSave] = useState(true);
  const { sprites, spritesDispatch } = useContext(SpritesContext);
  const { workspaceDispatch } = useContext(WorkspaceContext);
  const [snackbar, setSnackbar] = useSnackbar();


  const [createAndSave] = useMutation(CREATE_AND_SAVE, {
    onCompleted(res) {
      if (!res || !res.createProjectAndBlocks) {
        setSnackbar({
          ...snackbar,
          color: 'alertColor',
          message: '다시 시도해주세요',
        });
        return;
      }
      const pid = res.createProjectAndBlocks;
      setProjectId(pid);
      if (pid !== 'false') {
        window.location.href = `/project/${pid}`;
      }
      setSnackbar({ ...snackbar, message: '저장 완료', open: true, color: 'motionColor' });
      setCanSave(true);
    },
    onError(error) {
      const errorMessage = checkError(error.networkError);
      setSnackbar({
        ...snackbar,
        message: errorMessage,
        open: true,
        color: 'alertColor',
      });
      setTimeout(() => {
        setLoggedIn(false);
      }, 2000);
    },
  });
  const [updateProject] = useMutation(UPDATE_BLOCK, {
    onCompleted(res) {
      if (!res || !res.updateProjectAndBlocks) {
        setSnackbar({
          ...snackbar,
          color: 'alertColor',
          message: '다시 시도해주세요',
        });
        return;
      }
      setCanSave(true);
      setSnackbar({ ...snackbar, message: '저장 완료', open: true, color: 'motionColor' });
    },
    onError(error) {
      const errorMessage = checkError(error.networkError);
      setSnackbar({
        ...snackbar,
        message: errorMessage,
        open: true,
        color: 'alertColor',
      });
      setTimeout(() => {
        setLoggedIn(false);
      }, 2000);
    },
  });
  const [toggleLike] = useMutation(TOGGLE_LIKE, {
    onCompleted(res) {
      if (!res || !res.toggleLike) return;
      setIsLiked(!isLiked);
    },
  });
  const [toggleAuth] = useMutation(TOGGLE_AUTH, {
    onCompleted(res) {
      if (!res || !res.toggleAuth) return;
      setIsPrivate(!isPrivate);
    },
  });
  const [loadProject] = useLazyQuery(LOAD_PROJECT,
    {
      onCompleted(res) {
        if (!res || !res.findProjectById) {
          props.history.goBack();
        } else {
          const projectData = res.findProjectById;
          setProjectName(projectData.title);
          setIsLiked(projectData.isLiked);
          setIsPrivate(projectData.private);
          const images = [];
          const render = workspaceList.workspaces[0].setRender;
          workspaceList.workspaces = [];
          workspaceList.images = [];
          workspaceList.dropdownItems.sprite = { wall: '벽' };
          projectData.workspaces.forEach((ws) => {
            const newWorkSpace = new Workspace(
              { setRender: render, id: ws.id, imageId: ws.images[0].id },
            );
            makeBlock(ws.blocks, newWorkSpace);
            workspaceList.workspaces.push(newWorkSpace);
            workspaceList.images.push(ws.images[0].id);
            workspaceList.dropdownItems.sprite[ws.images[0].id] = ws.images[0].name;
            images.push(ws.images[0]);
          });
          // eslint-disable-next-line
          workspaceList.currentImageId = workspaceList.images[0];
          spritesDispatch({ type: 'LOAD_PROJECT', images });
          workspaceDispatch({ type: 'CHANGE_WORKSPACE', id: workspaceList.currentImageId });
          setReady(true);
        }
      },
      onError(error) {
        const errorMessage = checkError(error.networkError);
        setSnackbar({
          ...snackbar,
          open: true,
          color: 'alertColor',
          message: errorMessage,
        });
      },
    });
  useEffect(() => {
    if (!props.match.params.name) return;
    setProjectId(props.match.params.name);
    loadProject({
      variables: { projectId: props.match.params.name },
    });
  // eslint-disable-next-line react/destructuring-assignment
  }, [setProjectId, loadProject, props.match.params.name]);

  const likeHandler = () => {
    if (projectId) {
      toggleLike({
        variables: { projectId },
      });
    }
  };

  const getProjectName = () => {
    if (projectName.length < 1) {
      setProjectName('임시이름');
      return '임시이름';
    }
    return projectName;
  };

  const projectNameHandler = useCallback((e) => {
    setProjectName(e.target.value);
  }, []);

  const authHandler = () => {
    if (projectId) {
      toggleAuth({
        variables: { projectId },
      });
    }
  };
  const saveHandler = () => {
    if (!localStorage.getItem('token')) {
      setSnackbar({ ...snackbar, message: '로그인이 필요합니다.', open: true, color: 'alertColor' });
      return;
    }
    if (!canSave) {
      return;
    }
    setCanSave(false);
    workspaceDispatch({ type: 'SCROLL_END' });
    const images = [];
    const workspacesInput = workspaceList.workspaces.reduce((prev, ws) => {
      const data = ws.extractCoreData();
      const image = sprites[data.imageId];
      image.workspaceId = ws.id;
      image.size = Number(image.size);
      images.push({ ...image, id: data.imageId });
      delete data.imageId;
      prev.push(data);
      return prev;
    }, []);
    if (projectId) {
      updateProject({
        variables: { projectId,
          projectTitle: getProjectName(),
          workspacesInput,
          images,
        },
      });
    } else {
      const canvas = document.querySelector('.konvajs-content').querySelector('canvas');
      const url = canvas.toDataURL();
      const canvasImage = dataURLtoFile(url, `${getProjectName()}.png`);
      createAndSave({
        variables: { projectTitle: getProjectName(), workspacesInput, images, canvasImage },
      });
    }
  };

  return (
    <ProjectHeaderContainer isLiked={isLiked}>
      <div className="project-info">
        <input className="project-title" value={projectName} onChange={projectNameHandler} maxLength={25} />
        <button type="button" onClick={likeHandler}>
          <FontAwesomeIcon icon={faStar} className="star-icon" />
        </button>

        <button type="button" onClick={authHandler}>
          {isPrivate ? '비공개' : '전체 공개'}
        </button>
        <button type="button"> 초대 </button>
        <button type="button" onClick={saveHandler}> 저장하기 </button>
      </div>
      <Snackbar snackbar={snackbar} setSnackbar={setSnackbar} />
    </ProjectHeaderContainer>
  );
};

const ProjectHeaderContainer = styled.div`
  width: fit-content;
  height: 50px;
  position: relative;
  padding: 12px 20px;
  .project-info {
    display: flex;
    align-items: center;
    & > * {
      margin-right: 12px;
    }
    button {
      background: white;
      border: 1px solid ${props => props.theme.mainBorderColor};
      border-radius: 5px;
      height: 30px;
      padding: 0px 8px;
      cursor: pointer;
    }
    .star-icon {
      color: ${props => (props.isLiked === true ? props.theme.likeColor : 'grey')};
    }
  }
  .project-title {
    font-size: 20px;
    min-width: 50px;
    max-width: 200px;
    border: none;
    background: transparent;
    &:focus {
      background: white;
    }
  }
`;


ProjectHeader.propTypes = {
  props: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  setReady: PropTypes.func.isRequired,
};

export default ProjectHeader;
