import React,{useState} from 'react';
import styled from 'styled-components';
import InstaCard from '../Components/InstaCard/index.js'
import Spinkit from '../Components/Spinkit/index.js'
import {getDocumentHeight,getScrollTop} from '../utils/endScroll.js'

const projects=[
  {
    title:'Project1',
    description:'it is an apple.',
    user:'youngjun',
    userImg:'https://lh4.googleusercontent.com/-3Yn5JggL7kM/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reRrjZD6DtgOvM1Aq2jxUrpe6kkrg/photo.jpg',
    image:'https://salonproacademy.com/wp-content/uploads/sites/391/2018/10/instagram-background-768x461.jpg',
    likes:1000,
    pushLike:true
  },
  {
    title:'Project1',
    description:'it is an apple.',
    user:'youngjun',
    userImg:'https://lh4.googleusercontent.com/-3Yn5JggL7kM/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reRrjZD6DtgOvM1Aq2jxUrpe6kkrg/photo.jpg',
    image:'https://salonproacademy.com/wp-content/uploads/sites/391/2018/10/instagram-background-768x461.jpg',
    likes:1000,
    pushLike:true
  },
  {
    title:'Project1',
    description:'it is an apple.',
    user:'youngjun',
    userImg:'https://lh4.googleusercontent.com/-3Yn5JggL7kM/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reRrjZD6DtgOvM1Aq2jxUrpe6kkrg/photo.jpg',
    image:'https://salonproacademy.com/wp-content/uploads/sites/391/2018/10/instagram-background-768x461.jpg',
    likes:1000,
    pushLike:true
  },
  {
    title:'Project1',
    description:'it is an apple.',
    user:'youngjun',
    userImg:'https://lh4.googleusercontent.com/-3Yn5JggL7kM/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reRrjZD6DtgOvM1Aq2jxUrpe6kkrg/photo.jpg',
    image:'https://salonproacademy.com/wp-content/uploads/sites/391/2018/10/instagram-background-768x461.jpg',
    likes:1000,
    pushLike:true
  },
  {
    title:'Project1',
    description:'it is an apple.',
    user:'youngjun',
    userImg:'https://lh4.googleusercontent.com/-3Yn5JggL7kM/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reRrjZD6DtgOvM1Aq2jxUrpe6kkrg/photo.jpg',
    image:'https://salonproacademy.com/wp-content/uploads/sites/391/2018/10/instagram-background-768x461.jpg',
    likes:1000,
    pushLike:true
  },
  {
    title:'Project1',
    description:'it is an apple.',
    user:'youngjun',
    userImg:'https://lh4.googleusercontent.com/-3Yn5JggL7kM/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reRrjZD6DtgOvM1Aq2jxUrpe6kkrg/photo.jpg',
    image:'https://salonproacademy.com/wp-content/uploads/sites/391/2018/10/instagram-background-768x461.jpg',
    likes:1000,
    pushLike:true
  }
]


export default () => {
  const [selected, setSelected]=useState(0);
  const [loading,setLoading]=useState(false);
  const Wrapper = styled.div`
  `;

  const handleScroll=(e)=>{
    if(loading)return;
    if(getScrollTop()<getDocumentHeight()-window.innerHeight)return;
    setLoading(true);
  }

  window.addEventListener('scroll', handleScroll)
  
  const SwitchContainer=styled.div`
    padding: 60px;
    display:flex;
    justify-content:center;
  `
  const LeftToggle=styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width:300px;
    height:60px;
    background-color:${!selected?"#fa8000":"gray"};
    color:white;
    border-radius: 8px 0px 0px 8px;
  `

  const RightToggle=styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width:300px;
    height:60px;
    border-radius: 0px 8px 8px 0px;
    color:white;
    background-color:${selected?"#fa8000":"gray"};
  `

  const CardContainer=styled.div`
    display:flex;
    padding:80px;
    justify-content:space-between;
    flex-wrap:wrap;
  `

  const handleToggle=(e)=>setSelected(parseInt(e.target.id));

  const renderProject=(projects)=>{
    return (
      <CardContainer>
        {projects.map(project=>(
          <InstaCard project={project} key={project.title}/>
        ))}
      </CardContainer>
    );
  }

  return (
  <Wrapper>
    <SwitchContainer>
      <LeftToggle id="0" onClick={handleToggle}>나의 프로젝트</LeftToggle>
      <RightToggle id="1" onClick={handleToggle}>공유 프로젝트</RightToggle>
    </SwitchContainer>
    {renderProject(projects)}
    <Spinkit isLoading={loading}/>
  </Wrapper>
  );
}
