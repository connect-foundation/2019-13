import styled from 'styled-components';
import React,{useState} from 'react';
import Velocity from 'velocity-react'
export default ()=>{
    
    const [hover,setHover]=useState(0)

    const CardContainer=styled.div`
        position:relative;
        border : 2px solid #DADADA;
        border-radius:6px;
        width: 400px;
        height:300px;
        
    `
    const UserName=styled.div`
        padding: 10px 5px;
        font-weight:bold;
    `
    const ProjectImage=styled.div`
        width:100%;
        height:80%;
        border-radius: 4px 4px 0px 0px;
        background-image:url("https://salonproacademy.com/wp-content/uploads/sites/391/2018/10/instagram-background-768x461.jpg");
    `
    const InfoContainer=styled.div`
        display:flex;
        padding : 10px 10px;
        width:100%;
        justify-content:space-between;
        align-items:center;
    `

    const StarWrapper=styled.div`
        display:flex;
        background-color:#3897f5
        border-radius:5px;
        height:30px;
        align-items:center;
    `

    const StarSVG=styled.svg`
        width:22px;
        height:24px;
        margin:0px 4px;
    `

    const StarPath=styled.polygon`
        fill: white;
    `

    const StarText=styled.div`
        margin-right:10px;
        color:white;
    `

    const UserImage=styled.div`
        width:20px;
        height:20px;
        background-image:url("https://lh4.googleusercontent.com/-3Yn5JggL7kM/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reRrjZD6DtgOvM1Aq2jxUrpe6kkrg/photo.jpg");
        background-size:20px;
        border-radius:4px;
    `

    const ProfileWrapper=styled.div`
        display:flex;
        align-items:center;
    `

    const points=`9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78`

    const DetailContainer=styled.div`
        display:flex;
        flex-direction:column;
        justify-content:space-between;
        position:absolute;
        width:100%;
        height:80%;
        background-color:rgba(0,0,0,0.5);
        border-radius:4px;
        padding:20px;
        transition: 1s all;
    `

    const ProjectTitle=styled.div`
        font-size:30px;
        color:white;
    `
    const ProjectDescription=styled.div`
        font-size:20px;
        color:white;
    `

    const showDescription=(e)=>{
        setHover(1)
    }

    const hideDescription=(e)=>{
        setHover(0)
    }

    return (
        <CardContainer 
            onMouseOver={showDescription}
            onMouseLeave={hideDescription}
        >
            <Velocity.VelocityComponent animation={{opacity:hover}} duration={500}>
                <DetailContainer>
                    <ProjectTitle>Project1</ProjectTitle>
                    <ProjectDescription>김영준의 프론트-엔드 아트워크. 비핸스를 모티브로 제작하였다.(2019)</ProjectDescription>
                </DetailContainer>
            </Velocity.VelocityComponent>
            
            <ProjectImage></ProjectImage>
            <InfoContainer>
                <ProfileWrapper>
                    <UserImage></UserImage>
                    <UserName>Kimjouny</UserName>
                </ProfileWrapper>
                
                <StarWrapper>
                    <StarSVG><StarPath points={points}/></StarSVG>
                    <StarText>5 stars</StarText>   
                </StarWrapper>
            </InfoContainer>
        </CardContainer>
    )
}