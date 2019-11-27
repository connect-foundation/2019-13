import React, { useReducer, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Slider from '@material-ui/core/Slider';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Blockspace from '../Components/Block/index';
import Workspace from '../Components/Block/workspace';
import { WorkspaceContext, SpritesContext } from '../Context/index';
import { workspaceReducer, spritesReducer } from '../reducer';
import Utils from '../utils/utils';
import DrawSection from '../Components/DrawSection';
import Theme from '../Styles/Theme';


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
};

const PrettoSlider = withStyles({
  root: {
    color: Theme.duckOrangeColor,
  },
})(Slider);

const Project = () => {
  const [degree, setDegree] = useState(100);
  const [workspace, workspaceDispatch] = useReducer(
    workspaceReducer,
    new Workspace(),
  );

  const [sprites, spritesDispatch] = useReducer(
    spritesReducer,
    defaultSprite,
  );

  const handlScrollChange = (event, value) => {
    setDegree(value);
  };


  return (
    <WorkspaceContext.Provider value={{ workspace, workspaceDispatch }}>
      <SpritesContext.Provider value={{ sprites, spritesDispatch }}>
        <Wrapper>
          <ProjectHeader isStared={dummyProject.star.toString()}>
            <div className="project-info">
              <span className="project-title">{dummyProject.projectName}</span>
              <button type="button">
                <FontAwesomeIcon icon={faStar} className="star-icon" />
              </button>

              <button type="button">
                {dummyProject.isPublic ? '전체 공개' : '비공개'}
              </button>
              <button type="button"> 초대 </button>
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
            <div className="Contents__Column block-lists">
              <PrettoSlider
                orientation="vertical"
                defaultValue={degree}
                onChange={handlScrollChange}
              />
            </div>

            <div className="Contents__Column block-space">
              <div>블록 코딩</div>
            </div>
            <DrawSection />
          </Contents>
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
  width: 100%;
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
    padding:20px 0px;
    min-width: 300px;
    height:800px;
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
      color: green;
    }
    .stop-button {
      margin-left: 15px;
      color: red;
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
