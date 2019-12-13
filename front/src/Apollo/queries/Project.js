import gql from 'graphql-tag';

export const ME = gql`
  query me {
    me {
      email,
      picture,
    }
  }
`;

export const ADD_VIEW = gql`
  mutation addView($projectId: String!) {
   addView(projectId: $projectId)
  }
`;

export const GET_PROJECTS_BY_VIEWS = gql`
  query projects {
    projects {
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
  mutation createProjectAndBlocks($projectTitle: String!, $input: [createBlockInput]!, $images: [Upload]! ) {
    createProjectAndBlocks(projectTitle: $projectTitle, input: $input, images: $images)
  }
`;

export const UPDATE_BLOCK = gql`
  mutation updateProjectAndBlocks($projectId: String!, $projectTitle:String!, $input: [createBlockInput]! $images: [Upload]!) {
    updateProjectAndBlocks(projectId: $projectId, projectTitle: $projectTitle, input: $input, images: $images)
  }
`;

export const LOAD_PROJECT = gql`
  query findProjectById($projectId: String!) {
    findProjectById(projectId: $projectId) {
      id,
      title,
      description,
      likeCount,
      owner {
        email,
        picture,
      },
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
      images{
        id,
        name,
        url,
        positionX,
        positionY,
        size,
        direction,
        realName
      },
      views,
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
