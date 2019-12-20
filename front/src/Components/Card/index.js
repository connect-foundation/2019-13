import styled from 'styled-components';
import React, { useState } from 'react';
import Proptype from 'prop-types';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_PROJECT, TOGGLE_LIKE } from '../../Apollo/queries/Project';
import Utils from '../../utils/utils';

const Card = ({ project, removeProjects, history, me }) => {
  const [isLiked, setIsLiked] = useState(project.isLiked);
  const [likeCount, setLikeCount] = useState(project.likeCount);
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    onCompleted(deleteProject) {
      removeProjects(project);
    },
  });
  const [toggleLike] = useMutation(TOGGLE_LIKE, {
    onCompleted(toggleLike) {
      if (toggleLike.toggleLike) {
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
        setIsLiked(!isLiked);
      }
    },
  });
  const likeHandler = () => {
    toggleLike({
      variables: { projectId: project.id },
    });
  };
  const deleteHandler = () => {
    deleteProject({
      variables: { projectId: project.id },
    });
  };
  const editBlock = () => {
    history.push(`/project/${project.id}`);
  };
  const points = '9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78';
  return (
    <CardContainer>
      <Link to={`/details/${project.id}`}>
        <DetailContainer>
          <ProjectDescription>{project.description}</ProjectDescription>
        </DetailContainer>
      </Link>
      <ProjectImage project={project} />
      <InfoContainer>
        <ProfileWrapper>
          <UserImage project={project} />
          <UserInfoText>
            <ProjectTitle>{project ? Utils.reduceText(project.title, 8) : 'test'}</ProjectTitle>
            <UserName>{project.owner ? project.owner.email : 'test'}</UserName>
          </UserInfoText>
        </ProfileWrapper>
        <div>
          <StarWrapper project={project} isLiked={isLiked} onClick={likeHandler}>
            <StarSVG>
              <StarPath points={points} project={project} />
            </StarSVG>
            <StarText project={project}>
              {likeCount}
            </StarText>
          </StarWrapper>
          {me
            && (
              <>
                <button type="button" onClick={editBlock}> 변경 </button>
                <button type="button" onClick={deleteHandler}> 삭제 </button>
              </>
            )
          }
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

const ProjectTitle = styled.div`
  font-weight: bold;
`;

const UserName = styled.div`
  margin-top:5px;
  font-size: 14px;
`;
const ProjectImage = styled.div`
  width:100%;
  height:80%;
  border-radius: 4px 4px 0px 0px;
  background:${props => (props.project.canvasImage
    ? `url(${props.project.canvasImage})`
    : 'url(https://salonproacademy.com/wp-content/uploads/sites/391/2018/10/instagram-background-768x461.jpg)')};
  background-size: cover;
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

const UserInfoText = styled.div`
  padding: 5px;
`;

const StarWrapper = styled.div`
  display: flex;
  background-color: ${props => (props.isLiked
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
  width:40px;
  height:40px;
  background: ${props => (props.project.owner ? `url(${props.project.owner.picture})` : 'black')};
  background-size:40px;
  border-radius: 50%;
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
  .editBlock {
    width: fit-content;
  }
`;

const ProjectDescription = styled.div`
  font-size: 20px;
  color: ${props => props.theme.whiteColor};
`;

Card.propTypes = {
  project: Proptype.object.isRequired,
};
export default Card;
