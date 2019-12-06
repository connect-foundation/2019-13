import React, { useReducer, useState, useCallback, useEffect } from 'react';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Snackbar from '../Components/Snackbar';
import Blockspace from '../Components/Block/index';
import Workspace from '../Components/Block/workspace';
import { WorkspaceContext, SpritesContext } from '../Context/index';
import { workspaceReducer, spritesReducer } from '../reducer';
import { CREATE_AND_SAVE, LOAD_PROJECT, UPDATE_BLOCK } from '../Apollo/queries/Project';
import init from '../Components/Block/Init';

let canSave = true;

const Project = ({ match, history }) => {
  const [projectId, setPorjectId] = useState();
  const [projectName, setProjectName] = useState('');
  const [ready, setReady] = useState(false);
  const [workspace, workspaceDispatch] = useReducer(
    workspaceReducer,
    new Workspace(),
  );
  const makeBlock = (Blocks) => {
    const blockTypes = {};
    init.reduce((pre, cur) => [...pre, ...cur], []).forEach((data) => {
      blockTypes[data.type] = data;
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
        const nextBlock = workspace.getBlockById(blockData.nextElementId);
        block.nextElement = nextBlock;
        nextBlock.previousElement = block;
      }
      if (blockData.firstChildElementId) {
        const firstChildBlock = workspace.getBlockById(blockData.firstChildElementId);
        block.firstchildElement = firstChildBlock;
        firstChildBlock.parentElement = block;
      }
      if (blockData.secondChildElementId) {
        const secondChildElement = workspace.getBlockById(blockData.firstChildElementId);
        block.secondchildElement = secondChildElement;
        secondChildElement.parentElement = block;
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
  };
  const [createAndSave] = useMutation(CREATE_AND_SAVE,
    {
      onCompleted(createAndSave) {
        const projectId = createAndSave.createProjectAndBlocks;
        if (projectId) {
          history.push(`/project/${projectId}`);
        }
      },
    });
  const [updateProject] = useMutation(UPDATE_BLOCK, {
    onCompleted(updateProject) {
      const result = updateProject.updateProjectAndBlocks;
      canSave = true;
    },
  });
  const [loadProject] = useLazyQuery(LOAD_PROJECT,
    {
      onCompleted(loadProject) {
        setProjectName(loadProject.findProjectById.title);
        makeBlock(loadProject.findProjectById.blocks);
        setReady(true);
      },
    });

  const [snackbar, setSnackbar] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: '로그인이 필요합니다.',
    color: 'alertColor',
  });

  useEffect(() => {
    if (match.params.name) {
      setPorjectId(match.params.name);
      loadProject({
        variables: { projectId: match.params.name },
      });
    }
  }, []);

  const getProjectName = () => {
    if (projectName.length < 1) {
      setProjectName('임시이름');
    }
    return projectName;
  };

  const projectNameHandler = useCallback((e) => {
    setProjectName(e.target.value);
  }, []);

  const saveHandler = () => {
    if (!localStorage.getItem('token')) {
      setSnackbar({ ...snackbar, open: true });
      return;
    }
    canSave = false;
    if (projectId) {
      updateProject({
        variables: { projectId,
          projectTitle: getProjectName(),
          input: workspace.extractCoreData() },
      });
    } else {
      createAndSave({
        variables: { projectTitle: getProjectName(), input: workspace.extractCoreData() },
      });
    }
  };

  return (
    <WorkspaceContext.Provider value={{ workspace, workspaceDispatch }}>
      <SpritesContext.Provider value={{ sprites, spritesDispatch }}>
        <Wrapper>
          <ProjectHeader isStared={dummyProject.star.toString()}>
            <div className="project-info">
              <input className="project-title" value={projectName} onChange={projectNameHandler} />
              <button type="button">
                <FontAwesomeIcon icon={faStar} className="star-icon" />
              </button>

              <button type="button">
                {dummyProject.isPublic ? '전체 공개' : '비공개'}
              </button>
              <button type="button"> 초대 </button>
              <button type="button" onClick={saveHandler}> 저장하기 </button>
            </div>
          </ProjectHeader>
          <Contents>
            <Blockspace />
          </Contents>
          <Snackbar snackbar={snackbar} setSnackbar={setSnackbar} />
        </Wrapper>
      </SpritesContext.Provider>
    </WorkspaceContext.Provider>
  );
};

export default Project;
