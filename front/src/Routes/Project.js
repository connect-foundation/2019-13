import React, { useReducer } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import Blockspace from '../Components/Block/index';
import Workspace from '../Components/Block/workspace';
import { WorkspaceContext } from '../Context/index';
import { workspaceReducer } from '../reducer';

const dummyProject = {
  projectName: '첫번째 프로젝트',
  star: true,
  isPublic: true,
};

const Project = () => {
  const [workspace, workspaceDispatch] = useReducer(
    workspaceReducer,
    new Workspace(),
  );
  return (
    <WorkspaceContext.Provider value={{ workspace, workspaceDispatch }}>
      <Wrapper>
        ...
        <Contents>
          <Blockspace />
          ...
        </Contents>
      </Wrapper>
    </WorkspaceContext.Provider>
  );
};
export default Project;