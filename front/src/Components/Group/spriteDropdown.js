import React, { useState, useRef } from 'react';
import PropType from 'prop-types';
import { Select, MenuItem } from '@material-ui/core';
import styled from 'styled-components';
import workspaceList from '../Block/workspaceList';
import CONSTANTS from '../Block/constants';

const SpriteDropdown = ({ block, index }) => {
  const [value, setValue] = useState(block.value || CONSTANTS.DROPDOWN_SPRITE_INIT_VALUE);
  const foreignObjectRef = useRef();
  return (
    <foreignObject ref={foreignObjectRef} style={{ width: `${block.inputWidth[index]}px` }}>
      <Select
        value={value}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={block.changeDropdownWidth({ set: setValue, index, items: workspaceList.dropdownItems.sprite, foreignObject: foreignObjectRef.current }).bind(block)}
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
      <HiddenArea />
    </foreignObject>
  );
};

SpriteDropdown.propTypes = {
  block: PropType.object.isRequired,
  index: PropType.number.isRequired,
};

const HiddenArea = styled.div`
  position: absolute;
  visibility: hidden;
  font-size: 1rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
`;

export default SpriteDropdown;
