import { gql } from 'apollo-boost';

export const GET_PROJECTS = gql`
  query findProjectsByUserId {
    findProjectsByUserId {
      id,
      title,
      isLiked,
      likeCount,
      description,
      owner {
        email,
        picture,
      },
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation deleteProjectAndBlocks($projectId: String!) {
    deleteProjectAndBlocks(projectId: $projectId)
  }
`;

export const CREATE_AND_SAVE = gql`
  mutation createProjectAndBlocks($projectTitle: String!, $input: [createBlockInput]! ) {
    createProjectAndBlocks(projectTitle: $projectTitle, input: $input)
  }
`;

export const UPDATE_BLOCK = gql`
  mutation updateProjectAndBlocks($projectId: String!, $projectTitle:String!, $input: [createBlockInput]!) {
    updateProjectAndBlocks(projectId: $projectId, projectTitle: $projectTitle, input: $input)
  }
`;

export const LOAD_PROJECT = gql`
  query findProjectById($projectId: String!) {
    findProjectById(projectId: $projectId) {
      id,
      title,
      description,
      isLiked,
      private,
      blocks{
        id,
        type,
        nextElementId,
        firstChildElementId,
        secondChildElementId,
        positionX,
        positionY,
      },
    }
  }
`;

export const TOGGLE_LIKE = gql`
  mutation toggleLike($projectId: String!) {
    toggleLike(projectId: $projectId) 
  }
`;

export const TOGGLE_AUTH = gql`
  mutation toggleAuth($projectId: String!) {
    toggleAuth(projectId: $projectId) 
  }
`;
