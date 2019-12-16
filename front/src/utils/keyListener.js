import React, { useState, useEffect } from 'react';
import { start, getIsPlay } from './playBlocks';

const KeyListener = ({ workspace }) => {
  const handleKeyPress = (e) => {
    if (!workspace.keyDown[e.keyCode]) { workspace.setKeyDown(e.keyCode, true); }
    if (!getIsPlay()) start(workspace, false);
  };
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => { document.removeEventListener('keydown', handleKeyPress); };
  });
  return (
    <>
    </>
  );
};

export default KeyListener;
