import React, { useReducer, useState, useCallback, useEffect } from 'react';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Snackbar from '../Components/Snackbar';
import Blockspace from '../Components/Block/index';
import Workspace from '../Components/Block/workspace';
import { WorkspaceContext, SpritesContext } from '../Context/index';
import { workspaceReducer, spritesReducer } from '../reducer';
import Utils from '../utils/utils';
import DrawSection from '../Components/DrawSection';
import { CREATE_AND_SAVE, LOAD_PROJECT, UPDATE_BLOCK } from '../Apollo/queries/Project';
import init from '../Components/Block/Init';

const getScrollHeight = () => `${init}.reduce((acc, block) => acc + block.length, 0) * 100}px`;

const dummyProject = {
  projectName: '첫번째 프로젝트',
  star: true,
  isPublic: true,
};

const defaultSprite = {};
defaultSprite[Utils.uid()] = {
  url: '/logo.png',
  size: 100,
  direction: 90,
  x: 0,
  y: 0,
  reversal: false,
};

let canSave = true;

const Project = ({ match, history }) => {
  const [projectId, setPorjectId] = useState();
  const [projectName, setProjectName] = useState(dummyProject.projectName);
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
    // const blocksData = Object.values(Blocks);
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
    // workspace.topblocks.forEach(block => block.setAllBlockPosition());
  };
  const [createAndSave] = useMutation(CREATE_AND_SAVE,
    {
      onCompleted(createAndSave) {
        const projectId = createAndSave.createProjectAndBlocks;
        history.push(`/project/${projectId}`);
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
  const [sprites, spritesDispatch] = useReducer(
    spritesReducer,
    defaultSprite,
  );

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
            <div className="Contents__Column block-types">
              <TypesButton className="block-types__button" btype="motion">
                <div />
                <span> 동작 </span>
              </TypesButton>
              <TypesButton className="block-types__button" btype="events">
                <div />
                <span> 이벤트 </span>
              </TypesButton>
              <TypesButton className="block-types__button" btype="control">
                <div />
                <span> 제어 </span>
              </TypesButton>
              <TypesButton className="block-types__button" btype="sensing">
                <div />
                <span> 감지 </span>
              </TypesButton>
              <TypesButton className="block-types__button" btype="operators">
                <div />
                <span> 연산 </span>
              </TypesButton>
              <TypesButton className="block-types__button" btype="variables">
                <div />
                <span> 변수 </span>
              </TypesButton>
              <TypesButton className="block-types__button" btype="myblocks">
                <div />
                <span> 나만의 블록 </span>
              </TypesButton>
            </div>
            <div className="Contents__Column block-lists" />
            <div className="Contents__Column block-space">
              <div>블록 코딩</div>
            </div>
            <DrawSection />
          </Contents>
          <Snackbar snackbar={snackbar} setSnackbar={setSnackbar} />
        </Wrapper>
      </SpritesContext.Provider>
    </WorkspaceContext.Provider>
  );
};

const Wrapper = styled.div`
  background: ${props => props.theme.projectBgColor};
  height: 89vh;
  overflow: hidden;
`;

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
    }
    .star-icon {
      color: ${props => (props.isStared === 'true' ? props.theme.eventsColor : 'grey')};
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

const Contents = styled.div`
  display: flex;
  .block-types {
    display: flex;
    flex-direction: column;
    padding: 0px 5px;
    width: fit-content;
    background-color: white;
    border-top: 1px solid ${props => props.theme.mainBorderColor};
    border-bottom: 1px solid ${props => props.theme.mainBorderColor};
    height: 85vh;
  }
  .block-lists {
    display:flex;
    flex-direction:row-reverse;
    min-width: 300px;
    overflow:hidden;
    height:800px;
    padding:10px;
    border: 1px solid ${props => props.theme.mainBorderColor};
    background-color: ${props => props.theme.lightGreyColor};
  }
  .block-space {
    min-width: 500px;
    border: 1px solid ${props => props.theme.mainBorderColor};
    border-left: none;
    border-radius: 0px 5px 5px 0px;
    margin-right: 10px;
    background-color: white;
    width: 70vw;
  }

  .controller {
    display: flex;
    align-items: center;
    height: 50px;
    margin-top: -50px;
    .play-button {
      color: ${props => props.theme.operatorsColor};
      &:hover {
        color: ${props => props.theme.motionColor}
      }
    }
    .stop-button {
      margin-left: 15px;
      color: grey;
      &:hover {
        color : red;
      }
    }
  }
  .setting {
    padding: 20px;
    margin-top: 5px;
  }
  .setting__row {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 10px;
    div {
      width: 50px;
      text-align: center;
    }
    input {
      width: 60px;
      padding: 5px;
      border-radius: 15px;
      text-align: center;
      border: 1px solid black;
    }
  }
`;

const TypesButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50px;
  div {
    margin-top: 6px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: ${props => props.theme[`${props.btype}Color`]};
  }
  span {
    margin-top: 4px;
    font-size: 10px;
  }
  &:hover {
    cursor: pointer;
  }
  &:hover span {
    color: ${props => props.theme.typeHoverColor};
  }
`;

export default Project;
