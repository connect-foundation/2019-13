import React from 'react';
import { Select, MenuItem } from '@material-ui/core';

const KeyDropdown = () => {
  const item = '↑';
  return (
    <foreignObject style={{ width: 50 }}>
      <Select value={0} style={{ color: 'white' }}>
        <MenuItem value={0} key={item}>{item}</MenuItem>
      </Select>
    </foreignObject>
  );
};

export default KeyDropdown;
