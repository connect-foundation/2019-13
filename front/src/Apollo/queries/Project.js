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
      canvasImage,
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
      canvasImage,
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation deleteProjectAndBlocks($projectId: String!) {
    deleteProjectAndBlocks(projectId: $projectId)
  }
`;

export const CREATE_AND_SAVE = gql`
  mutation createProjectAndBlocks($projectTitle: String!, $workspacesInput: [workspaceInput], $images: [Upload]!, $canvasImage: Upload!) {
    createProjectAndBlocks(projectTitle: $projectTitle, workspacesInput: $workspacesInput, images: $images, canvasImage: $canvasImage)
  }
`;

export const UPDATE_BLOCK = gql`
  mutation updateProjectAndBlocks($projectId: String!, $projectTitle:String!, $workspacesInput: [workspaceInput],  $images: [Upload]!, $canvasImage: Upload!) {
    updateProjectAndBlocks(projectId: $projectId, projectTitle: $projectTitle, workspacesInput: $workspacesInput, images: $images, canvasImage: $canvasImage)
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
      workspaces {
        id,
        blocks {
          id,
          type,
          positionX,
          positionY,
          nextElementId,
          firstChildElementId,
          secondChildElementId,
          inputElementId
        },
        images {
          id,
          name,
          url,
          positionX,
          positionY,
          size,
          direction,
          realName
        }
      }
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
