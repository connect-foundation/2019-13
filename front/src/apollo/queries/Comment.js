import gql from 'graphql-tag';

export const CREATE_COMMENT = gql`
  mutation createComment($projectId: String!, $text: String!) {
    createComment(projectId: $projectId, text: $text) {
        id,
        createdAt
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation updateComment($commentId: String!, $text: String!) {
    updateComment(commentId: $commentId, text: $text)
  }
`;

export const REMOVE_COMMENT = gql`
  mutation removeComment($commentId: String!) {
    removeComment(commentId: $commentId)
  }
`;

export const LOAD_COMMENT = gql`
  query findProjectById($projectId: String!) {
    findProjectById(projectId: $projectId) {
      id,
      comments {
        id,
        user {
           email,
           picture,
        }
        createdAt,
        text,
      },
      commentCount
    }
  }
`;
