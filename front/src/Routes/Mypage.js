import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLazyQuery } from '@apollo/react-hooks';
import Card from '../Components/Card';
import Spinkit from '../Components/Spinkit';
import { getDocumentHeight, getScrollTop } from '../utils/endScroll';
import { GET_PROJECTS } from '../Apollo/queries/Project';

const projects = [];

export default () => {
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [getProjects] = useLazyQuery(GET_PROJECTS, {
    onCompleted(getProjects) {
      setProjects(getProjects.findProjectsByUserId);
    },
  });

  const Wrapper = styled.div`
  `;
  const addProject = () => {
    // projects = projects.concat(appendedProject);
  };

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
  const removeProjects = (project) => {
    setProjects(projects.filter(p => p.id !== project.id));
  };
  const CardContainer = styled.div`
    display:flex;
    justify-content:center;
    flex-wrap:wrap;
  `;

  const handleToggle = e => setSelected(parseInt(e.target.id, 10));

  const renderProject = projectArray => (
    <CardContainer>
      {projectArray.map(project => (
        <Card project={project} key={project.id} removeProjects={removeProjects} />
      ))}
    </CardContainer>
  );

  useEffect(() => {
    getProjects();
  }, []);
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
