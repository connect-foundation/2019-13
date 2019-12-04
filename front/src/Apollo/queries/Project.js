import { gql } from 'apollo-boost';

export const CREATE_AND_SAVE = gql`
  mutation createProjectAndBlocks($project_name: String!, $input: [createBlockInput]! ) {
    createProjectAndBlocks(project_name: $project_name, input: $input)
  }
`;
