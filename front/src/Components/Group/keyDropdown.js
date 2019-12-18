import React, { useState } from 'react';
import PropType from 'prop-types';
import { Select, MenuItem } from '@material-ui/core';
import workspaceList from '../Block/workspaceList';
import CONSTANTS from '../Block/constants';

const KeyDropdown = ({ block, index }) => {
  const [value, setValue] = useState(block.value || CONSTANTS.DROPDOWN_KEY_INIT_VALUE);
  return (
    <foreignObject style={{ width: `${block.inputWidth[index]}px` }}>
      <Select
        value={value}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={block.changeDropdownWidth({ set: setValue, index, items: workspaceList.dropdownItems.key }).bind(block)}
        MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
      >
        {Object.entries(workspaceList.dropdownItems.key).map(item => (
          <MenuItem
            value={item[1]}
            key={item[0]}
          >
            {item[0]}
          </MenuItem>
        ))}
      </Select>
    </foreignObject>
  );
};

KeyDropdown.propTypes = {
  block: PropType.object.isRequired,
  index: PropType.number.isRequired,
};

export default KeyDropdown;
