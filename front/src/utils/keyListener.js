import React, { useState, useEffect } from 'react';

const KeyListener = () => {
  const [key, setKey] = useState(-1);
  const handleKeyPress = (e) => {
    setKey(e.keyCode);
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
