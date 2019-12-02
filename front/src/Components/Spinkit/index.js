import React from 'react';
import styled from 'styled-components';
import Spinner from 'react-spinkit';
import PropType from 'prop-types';
import Theme from '../../Styles/Theme';

const Spinkit = ({ isLoading }) => {
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

Spinkit.propTypes = {
  isLoading: PropType.bool.isRequired,
};

export default Spinkit;
