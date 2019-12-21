import React from 'react';
import { Select, MenuItem } from '@material-ui/core';

const SpriteDropdown = () => {
  const item = '벽';
  return (
    <foreignObject style={{ width: 60 }}>
      <Select value={0} style={{ color: 'white' }}>
        <MenuItem value={0} key={item}>{item}</MenuItem>
      </Select>
    </foreignObject>
  );
};

export default SpriteDropdown;
