import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

export default () => {
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, 100, 100);
  }, []);
  return (<CanvasContainer ref={canvasRef} width="600" height="400" />);
};
const CanvasContainer = styled.canvas`
    background-color : white;
`;
