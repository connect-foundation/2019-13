import React, { useState } from 'react';
import styled from 'styled-components';
import PropType from 'prop-types';

const Input = ({ block, index }) => {
  const [value, setValue] = useState(block.inputElement[index].value);
  return (
    <>
      <foreignObject style={{ width: block.inputWidth[index] }}>
        <input
          style={{ width: block.inputWidth[index] }}
          value={value}
          onChange={block.changeInputWidth(setValue, index).bind(block)}
        />
        <HiddenArea />
      </foreignObject>
    </>
  );
};

Input.propTypes = {
  block: PropType.object.isRequired,
  index: PropType.number.isRequired,
};

const HiddenArea = styled.div`
  position: absolute;
  visibility: hidden;
  font-size: 0.5rem;
`;

export default Input;
