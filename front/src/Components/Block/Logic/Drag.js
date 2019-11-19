const mouseHandler = (set) => {
  const mousedown = (eventDown) => {
    if (eventDown.target.tagName !== 'path') { return; }
    eventDown.preventDefault();

    const currentPoint = { x: 0, y: 0 };
    currentPoint.x = eventDown.target.getBoundingClientRect().x
     - eventDown.target.ownerSVGElement.getBoundingClientRect().x;
    currentPoint.y = eventDown.target.getBoundingClientRect().y
     - eventDown.target.ownerSVGElement.getBoundingClientRect().y;

    set({
      x: currentPoint.x,
      y: currentPoint.y,
    });

    const startPoint = { x: 0, y: 0 };
    startPoint.x = eventDown.clientX - currentPoint.x;
    startPoint.y = eventDown.clientY - currentPoint.y;

    const mousemove = (eventMove) => {
      eventMove.preventDefault();
      set({
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
export default mouseHandler;
