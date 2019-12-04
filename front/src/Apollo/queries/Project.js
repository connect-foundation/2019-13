import { gql } from 'apollo-boost';

export const CREATE_AND_SAVE = gql`
  mutation createProjectAndBlocks($projectTitle: String!, $input: [createBlockInput]! ) {
    createProjectAndBlocks(projectTitle: $projectTitle, input: $input)
  }
`;
