import React, { useState } from 'react';
import styled from 'styled-components';
import Card from '../Components/Card';
import Spinkit from '../Components/Spinkit';
import { getDocumentHeight, getScrollTop } from '../utils/endScroll';

let projects = [
  {
    id: 1,
    title: 'Project1',
    description: 'it is an apple.',
    user: 'youngjun',
    userImg: 'https://lh4.googleusercontent.com/-3Yn5JggL7kM/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reRrjZD6DtgOvM1Aq2jxUrpe6kkrg/photo.jpg',
    image: 'https://salonproacademy.com/wp-content/uploads/sites/391/2018/10/instagram-background-768x461.jpg',
    likes: 10,
    pushLike: true,
  },
  {
    id: 2,
    title: 'Project1',
    description: 'it is an apple.',
    user: 'youngjun',
    userImg: 'https://lh4.googleusercontent.com/-3Yn5JggL7kM/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reRrjZD6DtgOvM1Aq2jxUrpe6kkrg/photo.jpg',
    image: 'https://salonproacademy.com/wp-content/uploads/sites/391/2018/10/instagram-background-768x461.jpg',
    likes: 777,
    pushLike: true,
  },
  {
    id: 3,
    title: 'Project1',
    description: 'it is an apple.',
    user: 'youngjun',
    userImg: 'https://lh4.googleusercontent.com/-3Yn5JggL7kM/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reRrjZD6DtgOvM1Aq2jxUrpe6kkrg/photo.jpg',
    image: 'https://salonproacademy.com/wp-content/uploads/sites/391/2018/10/instagram-background-768x461.jpg',
    likes: 1000,
    pushLike: false,
  },
  {
    id: 4,
    title: 'Project1',
    description: 'it is an apple.',
    user: 'youngjun',
    userImg: 'https://lh4.googleusercontent.com/-3Yn5JggL7kM/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reRrjZD6DtgOvM1Aq2jxUrpe6kkrg/photo.jpg',
    image: 'https://salonproacademy.com/wp-content/uploads/sites/391/2018/10/instagram-background-768x461.jpg',
    likes: 1000,
    pushLike: true,
  },
  {
    id: 5,
    title: 'Project1',
    description: 'it is an apple.',
    user: 'youngjun',
    userImg: 'https://lh4.googleusercontent.com/-3Yn5JggL7kM/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reRrjZD6DtgOvM1Aq2jxUrpe6kkrg/photo.jpg',
    image: 'https://salonproacademy.com/wp-content/uploads/sites/391/2018/10/instagram-background-768x461.jpg',
    likes: 1,
    pushLike: false,
  },
  {
    id: 6,
    title: 'Project1',
    description: 'it is an apple.',
    user: 'youngjun',
    userImg: 'https://lh4.googleusercontent.com/-3Yn5JggL7kM/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reRrjZD6DtgOvM1Aq2jxUrpe6kkrg/photo.jpg',
    image: 'https://salonproacademy.com/wp-content/uploads/sites/391/2018/10/instagram-background-768x461.jpg',
    likes: 1000,
    pushLike: true,
  },
];


export default () => {
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false);
  const Wrapper = styled.div`
  `;
  const addProject = () => {
    const appendedProject = [
      {
        id: 7,
        title: 'Project1',
        description: 'it is an apple.',
        user: 'youngjun',
        userImg: 'https://lh4.googleusercontent.com/-3Yn5JggL7kM/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reRrjZD6DtgOvM1Aq2jxUrpe6kkrg/photo.jpg',
        image: 'https://salonproacademy.com/wp-content/uploads/sites/391/2018/10/instagram-background-768x461.jpg',
        likes: 10,
        pushLike: true,
      },
      {
        id: 8,
        title: 'Project1',
        description: 'it is an apple.',
        user: 'youngjun',
        userImg: 'https://lh4.googleusercontent.com/-3Yn5JggL7kM/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reRrjZD6DtgOvM1Aq2jxUrpe6kkrg/photo.jpg',
        image: 'https://salonproacademy.com/wp-content/uploads/sites/391/2018/10/instagram-background-768x461.jpg',
        likes: 777,
        pushLike: true,
      },
      {
        id: 9,
        title: 'Project1',
        description: 'it is an apple.',
        user: 'youngjun',
        userImg: 'https://lh4.googleusercontent.com/-3Yn5JggL7kM/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reRrjZD6DtgOvM1Aq2jxUrpe6kkrg/photo.jpg',
        image: 'https://salonproacademy.com/wp-content/uploads/sites/391/2018/10/instagram-background-768x461.jpg',
        likes: 1000,
        pushLike: false,
      },
    ];
    projects = projects.concat(appendedProject);
  };
  const handleScroll = () => {
    if (loading) return;
    if (getScrollTop() < getDocumentHeight() - window.innerHeight) return;

    setLoading(true);
    setTimeout(() => {
      addProject();
      setLoading(false);
    }, 2000);
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
