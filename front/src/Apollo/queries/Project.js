import { gql } from 'apollo-boost';

export const CREATE_AND_SAVE = gql`
  mutation createProjectAndBlocks($projectTitle: String!, $input: [createBlockInput]! ) {
    createProjectAndBlocks(projectTitle: $projectTitle, input: $input)
  }
`;

export const UPDATE_BLOCK = gql`
  mutation updateProjectAndBlocks($projectId: String!, $projectTitle:String, $input: [createBlockInput]!) {
    updateProjectAndBlocks(projectId: $projectId, projectTitle: $projectTitle, input: $input)
  }
`;

export const LOAD_PROJECT = gql`
  query findProjectById($projectId: String!) {
    findProjectById(projectId: $projectId) {
      id,
      title,
      description,
      like,
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
