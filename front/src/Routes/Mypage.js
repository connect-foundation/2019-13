import React,{useState} from 'react';
import styled from 'styled-components';
import InstaCard from '../Components/InstaCard/index.js'
import Spinkit from '../Components/Spinkit/index.js'


const getDocumentHeight=()=>{
  const body=document.body;
  const html=document.documentElement;

  return Math.max(
    body.scrollHeight,body.offsetHeight,
    html.offsetHeight,html.clientHeight,html.scrollHeight
  )
}

const getScrollTop=()=>{
  return (window.pageYOffset!==undefined)?window.pageYOffset:(document.documentElement||document.body.parentNode||document.body).scrollTop;
}


export default () => {
  const [selected, setSelected]=useState(0);
  const [loading,setLoading]=useState(false);
  const Wrapper = styled.div`
  `;

  const handleScroll=(e)=>{
    if(loading)return;
    if(getScrollTop()<getDocumentHeight()-window.innerHeight)return;
    console.log(111)
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

  return (
  <Wrapper>
    <SwitchContainer>
      <LeftToggle id="0" onClick={handleToggle}>나의 프로젝트</LeftToggle>
      <RightToggle id="1" onClick={handleToggle}>공유 프로젝트</RightToggle>
    </SwitchContainer>
    <CardContainer>
      <InstaCard/>
      <InstaCard/>
      <InstaCard/>
      <InstaCard/>
      <InstaCard/>
      <InstaCard/>
    </CardContainer>
    <Spinkit isLoading={loading}/>
  </Wrapper>
  );
}
