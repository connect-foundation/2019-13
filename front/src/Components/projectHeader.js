import React, { useState, useContext, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { WorkspaceContext, SpritesContext } from '../Context';
import { CREATE_AND_SAVE, LOAD_PROJECT, UPDATE_BLOCK, TOGGLE_LIKE, TOGGLE_AUTH } from '../Apollo/queries/Project';
import init from './Block/Init';
import Snackbar from './Snackbar';

export default ({ props, setReady }) => {
  const [projectId, setPorjectId] = useState();
  const [projectName, setProjectName] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [canSave, setCanSave] = useState(true);
  const { sprites, spritesDispatch } = useContext(SpritesContext);
  const { workspace } = useContext(WorkspaceContext);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const connectBlock = (connected, position, connect) => {
    const reverse = {
      nextElement: 'previousElement',
      firstchildElement: 'parentElement',
      secondchildElement: 'parentElement',
    };
    connected[position] = connect;
    connect[reverse[position]] = connected;
  };

  const makeBlock = (Blocks) => {
    const blockTypes = {};
    init.forEach((data) => {
      data.forEach((datum) => { blockTypes[datum.type] = datum; });
    });
    Blocks.forEach((blockData) => {
      const block = workspace.addBlock(blockData.id);
      const dataJSON = blockTypes[blockData.type];
      dataJSON.x = blockData.positionX;
      dataJSON.y = blockData.positionY;
      block.x = blockData.positionX;
      block.y = blockData.positionY;
      block.makeFromJSON(dataJSON);
    });
    Blocks.forEach((blockData) => {
      const block = workspace.getBlockById(blockData.id);
      if (blockData.nextElementId) {
        connectBlock(block, 'nextElement', workspace.getBlockById(blockData.nextElementId));
      }
      if (blockData.firstChildElementId) {
        connectBlock(block, 'firstchildElement', workspace.getBlockById(blockData.firstChildElementId));
      }
      if (blockData.secondChildElementId) {
        connectBlock(block, 'secondchildElement', workspace.getBlockById(blockData.secondChildElementId));
      }
      if (blockData.inputElementId) {
        block.inputElement = blockData.inputElementId.map(v => ({ type: 'input', value: v }));
      }
    });
    Blocks.forEach((blockData) => {
      const block = workspace.getBlockById(blockData.id);
      if (!block.parentElement && !block.previousElement) {
        workspace.addTopblock(block);
      }
    });
    // workspace.topblocks.forEach(block => block.setAllBlockPosition());
  };
  const [createAndSave] = useMutation(CREATE_AND_SAVE,
    {
      onCompleted(res) {
        const projectId = res.createProjectAndBlocks;
        if (projectId !== 'false') {
          props.history.push(`/project/${projectId}`);
        }
        setCanSave(true);
      },
    });
  const [updateProject] = useMutation(UPDATE_BLOCK, {
    onCompleted(res) {
      const result = res.updateProjectAndBlocks;
      setCanSave(true);
      if (!canSave) {
        setSnackbar({ ...snackbar, message: '저장 완료', open: true, color: 'motionColor' });
      }
    },
  });
  const [toggleLike] = useMutation(TOGGLE_LIKE, {
    onCompleted(res) {
      if (res.toggleLike) {
        setIsLiked(!isLiked);
      }
    },
  });
  const [toggleAuth] = useMutation(TOGGLE_AUTH, {
    onCompleted(res) {
      if (res.toggleAuth) setIsPrivate(!isPrivate);
    },
  });
  const [loadProject] = useLazyQuery(LOAD_PROJECT,
    {
      onCompleted(res) {
        if (!res.findProjectById) {
          props.history.goBack();
        } else {
          spritesDispatch({ type: 'LOAD_PROJECT', images: res.findProjectById.images });
          setProjectName(res.findProjectById.title);
          setIsLiked(res.findProjectById.isLiked);
          setIsPrivate(res.findProjectById.private);
          makeBlock(res.findProjectById.blocks);
          setReady(true);
        }
      },
    });

  useEffect(() => {
    if (props.match.params.name) {
      setPorjectId(props.match.params.name);
      loadProject({
        variables: { projectId: props.match.params.name },
      });
    }
  }, []);

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
    if (projectId) {
      updateProject({
        variables: { projectId,
          projectTitle: getProjectName(),
          input: workspace.extractCoreData(),
          images: Object.entries(sprites).map(sprite => ({ ...sprite[1], positionX: sprite[1].x, positionY: sprite[1].y, id: sprite[0] })) },
      });
    } else {
      createAndSave({
        variables: { projectTitle: getProjectName(), input: workspace.extractCoreData(), images: Object.values(sprites) },
      });
    }
  };

  return (
    <ProjectHeader isLiked={isLiked}>
      <div className="project-info">
        <input className="project-title" value={projectName} onChange={projectNameHandler} />
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
    </ProjectHeader>
  );
};

const ProjectHeader = styled.div`
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
      color: ${props => (props.isLiked === true ? props.theme.eventsColor : 'grey')};
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
