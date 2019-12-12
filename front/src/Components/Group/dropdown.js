import React, { useState, useRef, useEffect } from 'react';
import PropType from 'prop-types';
import { Select, MenuItem } from '@material-ui/core';

const Dropdown = ({ block, index }) => {
  const [value, setValue] = useState(block.inputElement[index].value);
  const items = ['↑', '↓', '←', '→', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const selectRef = useRef();
  useEffect(() => {
    // eslint-disable-next-line no-param-reassign
    if (block.inputWidth[index] !== 40) block.inputWidth[index] = 40;
  }, []);
  return (
    <foreignObject style={{ width: block.inputWidth[index] }}>
      <Select
        ref={selectRef}
        value={value}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={block.changeDropdownWidth(setValue).bind(block)}
      >
        {items.map((item, idx) => <MenuItem value={idx} key={item}>{item}</MenuItem>)}
      </Select>
    </foreignObject>
  );
};

Dropdown.propTypes = {
  block: PropType.object.isRequired,
  index: PropType.number.isRequired,
};

export default Dropdown;
