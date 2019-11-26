const mouseHandler = ({ set, block, setMoved }) => {
  const mousedown = (eventDown) => {
    setMoved(true);
    if (eventDown.target.tagName !== 'path') {
      return;
    }
    eventDown.preventDefault();
    eventDown.stopPropagation();

    const startRealPosition = { x: 0, y: 0 };
    startRealPosition.x = eventDown.target.getBoundingClientRect().x
    - eventDown.target.ownerSVGElement.getBoundingClientRect().x;
    startRealPosition.y = eventDown.target.getBoundingClientRect().y
    - eventDown.target.ownerSVGElement.getBoundingClientRect().y;

    const startPosition = { x: 0, y: 0 };
    const { node } = block;
    startPosition.x = node.getBoundingClientRect().left
    - node.parentNode.getBoundingClientRect().left;
    startPosition.y = node.parentNode.getBoundingClientRect().height
    - node.getBoundingClientRect().height;

    set({ x: startPosition.x, y: startPosition.y });

    const clickedRealPosition = { x: 0, y: 0 };
    clickedRealPosition.x = eventDown.clientX - startRealPosition.x;
    clickedRealPosition.y = eventDown.clientY - startRealPosition.y;
    const clickedPosition = { x: 0, y: 0 };
    clickedPosition.x = eventDown.clientX - startPosition.x;
    clickedPosition.y = eventDown.clientY - startPosition.y;

    block.dragStart(clickedRealPosition.x, clickedRealPosition.y);

    const currentRealPosition = { x: startRealPosition.x, y: startRealPosition.y };
    const currentPosition = { x: startPosition.x, y: startPosition.y };

    const mousemove = (eventMove) => {
      eventMove.preventDefault();
      eventMove.stopPropagation();
      currentRealPosition.x = eventMove.clientX - clickedRealPosition.x;
      currentRealPosition.y = eventMove.clientY - clickedRealPosition.y;
      currentPosition.x = eventMove.clientX - clickedPosition.x;
      currentPosition.y = eventMove.clientY - clickedPosition.y;
      set({ x: currentPosition.x, y: currentPosition.y });
      block.dragUpdate(currentRealPosition.x, currentRealPosition.y);
    };

    const mouseup = () => {
      document.removeEventListener('mousemove', mousemove);
      document.removeEventListener('mouseup', mouseup);
      if (startRealPosition.x === currentRealPosition.x
        && startRealPosition.y === currentRealPosition.y) {
        block.workspace.dragging.reset();
        return;
      }
      block.dragEnd(currentRealPosition.x, currentRealPosition.y);
    };

    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);
  };
  return mousedown;
};
export default mouseHandler;
