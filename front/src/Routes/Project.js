import React, { useReducer, useState, useEffect } from 'react';
import styled from 'styled-components';
import Blockspace from '../Components/Block/index';
import Workspace from '../Components/Block/workspace';
import ProjectHeader from '../Components/projectHeader';
import { WorkspaceContext, SpritesContext } from '../Context/index';
import { workspaceReducer, spritesReducer } from '../reducer';
import Utils from '../utils/utils';
import DrawSection from '../Components/DrawSection';
import KeyListener from '../utils/keyListener';
import workspaceList from '../Components/Block/workspaceList';

const defaultSprite = {};
const defaultKey = Utils.uid();
defaultSprite[defaultKey] = {
  name: 'logo.png',
  url: '/logo.png',
  size: 100,
  direction: 90,
  x: 0,
  y: 0,
  width: 245,
  height: 246,
  reversal: false,
  realName: '/logo.png',
};


const nWorkspace = new Workspace({ imageId: defaultKey });
workspaceList.workspaces.push(nWorkspace);
workspaceList.images.push(defaultKey);
// eslint-disable-next-line prefer-destructuring
workspaceList.currentImageId = workspaceList.images[0];
workspaceList.dropdownItems.sprite[defaultKey] = 'logo.png';

const Project = (props) => {
  const [workspace, workspaceDispatch] = useReducer(
    workspaceReducer, workspaceList.workspaces[0],
  );
  const [isReady, setReady] = useState(false);
  const [sprites, spritesDispatch] = useReducer(
    spritesReducer,
    defaultSprite,
  );
  const [clickedButton, setClickedButton] = useState(0);
  useEffect(() => {
    if (isReady) {
      workspace.renderTopblocks();
    }
  });
  return (
    <WorkspaceContext.Provider value={{ workspace, workspaceDispatch }}>
      <SpritesContext.Provider value={{ sprites, spritesDispatch }}>
        <Wrapper>
          <ProjectHeader props={props} setReady={setReady} />
          <Contents>
            <Blockspace clickedButton={clickedButton} />
            <div className="Contents__Column block-types">
              <TypesButton className="block-types__button" btype="motion" onClick={() => { setClickedButton(0 + Math.random()); }}>
                <div />
                <span> 동작 </span>
              </TypesButton>
              <TypesButton className="block-types__button" btype="events" onClick={() => { setClickedButton(1 + Math.random()); }}>
                <div />
                <span> 이벤트 </span>
              </TypesButton>
              <TypesButton className="block-types__button" btype="control" onClick={() => { setClickedButton(2 + Math.random()); }}>
                <div />
                <span> 제어 </span>
              </TypesButton>
              <TypesButton className="block-types__button" btype="operators" onClick={() => { setClickedButton(3 + Math.random()); }}>
                <div />
                <span> 연산 </span>
              </TypesButton>
              <TypesButton className="block-types__button" btype="sensing" onClick={() => { setClickedButton(4 + Math.random()); }}>
                <div />
                <span> 감지 </span>
              </TypesButton>
              <TypesButton className="block-types__button" btype="variables" onClick={() => { }}>
                <div />
                <span> 변수 </span>
              </TypesButton>
              <TypesButton className="block-types__button" btype="myblocks" onClick={() => { }}>
                <div />
                <span> 나의 블록 </span>
              </TypesButton>
            </div>
            <div className="Contents__Column block-lists" />
            <div className="Contents__Column block-space" />
            <DrawSection />
          </Contents>
          <KeyListener />
        </Wrapper>
      </SpritesContext.Provider>
    </WorkspaceContext.Provider>
  );
};

const Wrapper = styled.div`
  background: ${props => props.theme.projectBgColor};
  height: 89vh;
  overflow: x;
`;

const Contents = styled.div`
  display: flex;
  .block-types {
    display: flex;
    flex-direction: column;
    padding: 0px 5px;
    /* width: ; */
    background-color: white;
    border-top: 1px solid ${props => props.theme.mainBorderColor};
    border-bottom: 1px solid ${props => props.theme.mainBorderColor};
    height: 86vh;
  }
  .block-lists {
    display:flex;
    flex-direction:row-reverse;
    min-width: 300px;
    overflow:hidden;
    padding:10px;
    border: 1px solid ${props => props.theme.mainBorderColor};
    background-color: ${props => props.theme.lightGreyColor};
    height:86vh;
  }
  .block-space {
    min-width: 500px;
    border: 1px solid ${props => props.theme.mainBorderColor};
    border-left: none;
    border-radius: 0px 5px 5px 0px;
    margin-right: 10px;
    background-color: white;
    width: 48vw;
    height : 86vh;
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
