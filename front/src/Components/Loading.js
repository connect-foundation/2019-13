import React from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';

export default () => (
  <LoadingWrapper>
    <CircularProgress />
  </LoadingWrapper>
);

const LoadingWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
