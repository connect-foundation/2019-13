import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import Card from './Card';
import { GET_PROJECTS_BY_VIEWS } from '../Apollo/queries/Project';
import checkError from '../checkError';

export default () => {
  const { loading, error, data } = useQuery(GET_PROJECTS_BY_VIEWS);
  if (loading) return <></>;
  if (error) {
    const errorMessage = checkError(error.networkError);
    if (error.networkError.name === 'ServerError') {
      // eslint-disable-next-line no-alert
      window.alert(errorMessage);
      window.location.href = '/';
      return <></>;
    }
    if (errorMessage) {
      return (
        <ErrorContainer>
          <p>{errorMessage}</p>
          <button
            type="button"
            onClick={() => {
              window.location.href = '/';
            }}
          >
            새로고침
          </button>
        </ErrorContainer>
      );
    }
  }
  return (
    <>
      {!!data && (
        <RecommendContainer>
          <h2>이런것도 추천한다구</h2>
          <CardContainer>
            {data.projects
              && data.projects.map(project => (
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

const ErrorContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    font-size: 2rem;
  }
  button {
    cursor: pointer;
    margin-top: 30px;
    font-size: 15px;
    padding: 10px 18px;
    border-radius: 5px;
    border: none;
    font-weight: bold;
    color: white;
    background-color: ${props => props.theme.alertColor};
  }
`;
