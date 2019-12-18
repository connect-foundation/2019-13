import React, { useState } from 'react';
import PropType from 'prop-types';
import { Select, MenuItem } from '@material-ui/core';
import dropdownItems from '../../utils/key';
import CONSTANTS from '../Block/constants';

const Dropdown = ({ block, index }) => {
  const [value, setValue] = useState(block.value || CONSTANTS.DROPDOWN_INIT_VALUE);
  return (
    <foreignObject style={{ width: block.inputWidth[index] }}>
      <Select
        value={value}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={block.changeDropdownWidth(setValue).bind(block)}
        MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
      >
        {dropdownItems.map(item => (
          <MenuItem
            value={Object.values(item)[0]}
            key={Object.keys(item)[0]}
          >
            {Object.keys(item)[0]}
          </MenuItem>
        ))}
      </Select>
    </foreignObject>
  );
};

Dropdown.propTypes = {
  block: PropType.object.isRequired,
  index: PropType.number.isRequired,
};

export default Dropdown;
