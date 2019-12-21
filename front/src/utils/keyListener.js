import React, { useEffect } from 'react';
import { start, getIsPlay } from './playBlocks';
import workspaceList from '../core/blocks/workspace/workspaceList';


const KeyListener = () => {
  const handleKeyPress = (e) => {
    if (!workspaceList.keyDown[e.keyCode]) { workspaceList.setKeyDown(e.keyCode, true); }
    if (!getIsPlay()) start(false);
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
