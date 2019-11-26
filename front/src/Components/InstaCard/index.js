import styled from 'styled-components';
import React,{useState} from 'react';
export default ({project})=>{
    const CardContainer=styled.div`
        position:relative;
        border : 2px solid #DADADA;
        border-radius:6px;
        width: 400px;
        height:300px;
        margin-bottom:40px;
    `
    const UserName=styled.div`
        padding: 10px 5px;
        font-weight:bold;
    `
    const ProjectImage=styled.div`
        width:100%;
        height:80%;
        border-radius: 4px 4px 0px 0px;
        background-image:url("${project.image}");
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
        fill: ${project.pushLike?'yellow':'white'};
    `

    const StarText=styled.div`
        margin-right:10px;
        color:white;
    `

    const UserImage=styled.div`
        width:20px;
        height:20px;
        background-image:url("${project.userImg}");
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
        transition: 0.5s all;
        opacity:0;
        &:hover{
            opacity:1;
        }
    `

    const ProjectTitle=styled.div`
        font-size:30px;
        color:white;
    `
    const ProjectDescription=styled.div`
        font-size:20px;
        color:white;
    `
    return (
        <CardContainer >
            <DetailContainer>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
            </DetailContainer>
            <ProjectImage></ProjectImage>
            <InfoContainer>
                <ProfileWrapper>
                    <UserImage></UserImage>
                    <UserName>{project.user}</UserName>
                </ProfileWrapper>
                
                <StarWrapper>
                    <StarSVG><StarPath points={points}/></StarSVG>
                    <StarText>{project.likes} stars</StarText>   
                </StarWrapper>
            </InfoContainer>
        </CardContainer>
    )
}