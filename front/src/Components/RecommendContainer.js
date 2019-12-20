import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import Card from './Card';
import { GET_PROJECTS_BY_VIEWS } from '../Apollo/queries/Project';
import checkError from '../checkError';
import Snackbar from './Snackbar';
// import checkError from '../'

export default () => {
  const { loading, error, data } = useQuery(GET_PROJECTS_BY_VIEWS);
  if (loading) return <></>;
  if (error) {
    const errorMessage = checkError(error.message);
    if (errorMessage) {
      window.alert(errorMessage);
      window.location.href = '/';
    }
  }
  return (
    <>
      {!!data && (
        <RecommendContainer>
          <h2>이런것도 추천한다구</h2>
          <CardContainer>
            {data.projects && data.projects.map(project => (
              <Card project={project} key={project.id} me={false} />
            ))}
          </CardContainer>
        </RecommendContainer>
      )}
    </>
  );
};

const RecommendContainer = styled.div`
  max-width: 1500px;
  margin: auto;
  margin-top: 100px;
  h2 {
    font-size: 20px;
    margin-left: 40px;
  }
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;
