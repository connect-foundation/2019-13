import React, { useState } from 'react';
import PropType from 'prop-types';
import { Select, MenuItem } from '@material-ui/core';
import workspaceList from '../Block/workspaceList';
import CONSTANTS from '../Block/constants';

const SpriteDropdown = ({ block, index }) => {
  const [value, setValue] = useState(block.value || CONSTANTS.DROPDOWN_SPRITE_INIT_VALUE);
  return (
    <foreignObject style={{ width: `${block.inputWidth[index]}px` }}>
      <Select
        value={value}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={block.changeDropdownWidth({ set: setValue, index, items: workspaceList.dropdownItems.sprite }).bind(block)}
        MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
      >
        {Object.entries(workspaceList.dropdownItems.sprite).map((item) => {
          if (workspaceList.currentImageId !== item[0]) {
            return (
              <MenuItem
                value={item[0]}
                key={item[1]}
              >
                {item[1]}
              </MenuItem>
            );
          }
          return null;
        })}
      </Select>
    </foreignObject>
  );
};

SpriteDropdown.propTypes = {
  block: PropType.object.isRequired,
  index: PropType.number.isRequired,
};

export default SpriteDropdown;
