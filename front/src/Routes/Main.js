import React from 'react';
import styled from 'styled-components';
import Example from '../Components/Carousel';
import Card from '../Components/Card';

const Wrapper = styled.div`
`;

const RecommendComtainer = styled.div`
  padding:40px;
`;

const CardContainer = styled.div`
  display:flex;
  justify-content:space-between;
  padding:40px 0px;
`;
const projects = [
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
];

const main = () => (
  <Wrapper>
    <Example />
    <RecommendComtainer>
      <h3>이런것도 추천한다구</h3>
      <CardContainer>
        {projects.map(project => (
          <Card project={project} key={project.id} />
        ))}
      </CardContainer>
    </RecommendComtainer>


  </Wrapper>

);

export default main;
