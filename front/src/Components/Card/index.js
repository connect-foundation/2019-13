import styled from 'styled-components';
import React from 'react';
import Proptype from 'prop-types';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_PROJECT } from '../../Apollo/queries/Project';


const Card = ({ project, removeProjects }) => {
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    onCompleted(deleteProject) {
      removeProjects(project);
      console.log(deleteProject);
    },
  });
  const deleteHandler = () => {
    deleteProject({
      variables: { projectId: project.id },
    });
  };
  const points = '9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78';
  return (
    <CardContainer>
      <Link to={`/project/${project.id}`}>
        <DetailContainer>
          <ProjectTitle>{project.title}</ProjectTitle>
          <ProjectDescription>{project.description}</ProjectDescription>
        </DetailContainer>
      </Link>
      <ProjectImage project={project} />
      <InfoContainer>
        <ProfileWrapper>
          <UserImage project={project} />
          <UserName>{project.owner ? project.owner.email : 'test'}</UserName>
        </ProfileWrapper>
        <div>
          <StarWrapper project={project}>
            <StarSVG>
              <StarPath points={points} project={project} />
            </StarSVG>
            <StarText project={project}>
              {project.like}
            </StarText>
          </StarWrapper>
          <button type="button" onClick={deleteHandler}> 삭제 </button>
        </div>
      </InfoContainer>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  position: relative;
  border: 2px solid ${props => props.theme.cardBorderColor};
  border-radius: 6px;
  width: 400px;
  height: 300px;
  margin: 30px;
`;
const UserName = styled.div`
  padding: 10px 5px;
  font-weight: bold;
`;
const ProjectImage = styled.div`
  width:100%;
  height:80%;
  border-radius: 4px 4px 0px 0px;
  background:${props => (props.project.image ? `url(${props.project.image})` : 'url(https://salonproacademy.com/wp-content/uploads/sites/391/2018/10/instagram-background-768x461.jpg)')};
`;
const InfoContainer = styled.div`
  & > div {
    display: flex;
    align-items: center;
    & button {
      cursor: pointer;
      color: white;
      border: 1px;
      width: 50px;
      height: 30px;
      margin-left: 5px;
      border-radius: 5px;
      background: grey;
      &:hover {
        background: ${props => props.theme.alertColor};
      }
    }
  }
  display: flex;
  padding: 10px 10px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const StarWrapper = styled.div`
  display: flex;
  background-color: ${props => (props.project.pushLike
    ? props.theme.activeButtonColor
    : props.theme.unactivedColor)};
  border-radius: 5px;
  height: 30px;
  align-items: center;
`;

const StarSVG = styled.svg`
  width: 22px;
  height: 24px;
  margin: 0px 4px;
`;

const StarPath = styled.polygon`
  fill: ${props => (props.project.pushLike
    ? props.theme.activeStarColor
    : props.theme.whiteColor)};
`;

const StarText = styled.div`
  margin-right: 10px;
  color: ${props => props.theme.whiteColor};
`;

const UserImage = styled.div`
  width:20px;
  height:20px;
  background: ${props => (props.project.owner ? `url(${props.project.owner.picture})` : 'black')};
  background-size:20px;
  border-radius:4px;
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  width: 100%;
  height: 80%;
  background-color: ${props => props.theme.cardBackgroundColor};
  border-radius: 4px;
  padding: 20px;
  transition: 0.5s all;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const ProjectTitle = styled.div`
  font-size: 30px;
  color: ${props => props.theme.whiteColor};
`;
const ProjectDescription = styled.div`
  font-size: 20px;
  color: ${props => props.theme.whiteColor};
`;

Card.propTypes = {
  project: Proptype.object.isRequired,
};
export default Card;
