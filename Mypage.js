import React, { useState } from 'react';
import styled from 'styled-components';
import Card from '../Components/Card';
import Spinkit from '../Components/Spinkit';
import { getDocumentHeight, getScrollTop } from '../utils/endScroll';

let projects = [
  /**
   * INITIAL DUMMY DATA
   */
]


export default () => {
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false);
  const Wrapper = styled.div`
  `;
  const addProject = () => {
    const appendedProject = [
      /**
       * APPEND DUMMY DATA
       */
    ];
    projects = projects.concat(appendedProject);
  };

  /**
   * @description 스크롤이 맨 밑까지 내려왔을 때,
   *              projects 배열에 concat시켜 Infinity carousel 효과를 내는 함수
   */
  const handleScroll = () => {
    if (loading) return;
    if (getScrollTop() + 1 < getDocumentHeight() - window.innerHeight) return;
    setLoading(true);
  };

  window.addEventListener('scroll', handleScroll);

  const SwitchContainer = styled.div`
    padding: 60px;
    display:flex;
    justify-content:center;
  `;
  const LeftToggle = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width:300px;
    height:60px;
    background-color:${!selected ? props => props.theme.duckOrangeColor : props => props.theme.unactivedColor};
    color: ${props => props.theme.whiteColor};
    border-radius: 8px 0px 0px 8px;
  `;

  const RightToggle = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width:300px;
    height:60px;
    border-radius: 0px 8px 8px 0px;
    color:${props => props.theme.whiteColor};
    background-color:${selected ? props => props.theme.duckOrangeColor : props => props.theme.unactivedColor};
  `;

  const CardContainer = styled.div`
    display:flex;
    justify-content:center;
    flex-wrap:wrap;
  `;

  const handleToggle = e => setSelected(parseInt(e.target.id, 10));

  const renderProject = projectArray => (
    <CardContainer>
      {projectArray.map(project => (
        <Card project={project} key={project.id} />
      ))}
    </CardContainer>
  );
  if (loading) {
    addProject();
    setLoading(false);
  }
  return (

    <Wrapper>
      <SwitchContainer>
        <LeftToggle id="0" onClick={handleToggle}>나의 프로젝트</LeftToggle>
        <RightToggle id="1" onClick={handleToggle}>공유 프로젝트</RightToggle>
      </SwitchContainer>
      {renderProject(projects)}
      <Spinkit isLoading={loading} />
    </Wrapper>
  );
};
