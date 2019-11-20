import motion from '../Init/Motion';

export default ({ dispatch, motionIndex, setModel, setPosition }) => {
  const mousedown = (eventDown) => {
    setModel(false);
    const blockParams = motion[motionIndex];
    blockParams.x = eventDown.target.getBoundingClientRect().x;
    blockParams.y = eventDown.target.getBoundingClientRect().y - 72 - 50;
    blockParams.motionIndex = motionIndex;
    dispatch({ blockParams });

    const startPoint = { x: 0, y: 0 };
    startPoint.x = eventDown.clientX - blockParams.x;
    startPoint.y = eventDown.clientY - blockParams.y;
    const mousemove = (eventMove) => {
      eventMove.preventDefault();
      setPosition({
        x: eventMove.clientX - startPoint.x,
        y: eventMove.clientY - startPoint.y,
      });
    };
    const mouseup = () => {
      document.removeEventListener('mousemove', mousemove);
      document.removeEventListener('mouseup', mouseup);
    };


    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);
  };
  return mousedown;
};
