import React from 'react';
import styled from 'styled-components';
import Spinner from 'react-spinkit';
import Theme from '../../Styles/Theme';

export default ({ isLoading }) => {
  if (!isLoading) return null;
  const SpinnerWrapper = styled.div`
        display:flex;
        justify-content:center;
        padding-bottom:50px;
    `;

  return (
    <SpinnerWrapper>
      <Spinner name="line-scale" color={Theme.duckOrangeColor} />
    </SpinnerWrapper>
  );
};
