import childDrag from './childDrag';

const mouseHandler = ({ set, block, x, setMoved, workspaceDispatch }) => {
  if (block.parentElement || block.previousElement) {
    const mousedownChild = childDrag({ set, block, setMoved });
    return mousedownChild;
  }
  const mousedown = (eventDown) => {
    setMoved(true);
    if (eventDown.target.tagName !== 'path') {
      return;
    }
    eventDown.preventDefault();
    eventDown.stopPropagation();

    const startPosition = { x: 0, y: 0 };
    startPosition.x = eventDown.target.getBoundingClientRect().x
    - eventDown.target.ownerSVGElement.getBoundingClientRect().x;
    startPosition.y = eventDown.target.getBoundingClientRect().y
    - eventDown.target.ownerSVGElement.getBoundingClientRect().y;

    set({
      x: startPosition.x,
      y: startPosition.y,
    });

    const clickedPosition = { x: 0, y: 0 };
    clickedPosition.x = eventDown.clientX - startPosition.x;
    clickedPosition.y = eventDown.clientY - startPosition.y;

    block.dragStart(clickedPosition.x, clickedPosition.y);

    const currentPosition = { x: startPosition.x, y: startPosition.y };

    const mousemove = (eventMove) => {
      eventMove.preventDefault();
      eventMove.stopPropagation();
      currentPosition.x = eventMove.clientX - clickedPosition.x;
      currentPosition.y = eventMove.clientY - clickedPosition.y;
      set({ x: currentPosition.x, y: currentPosition.y });
      block.dragUpdate(currentPosition.x, currentPosition.y);
    };

    const mouseup = (eventUp) => {
      if (eventUp.clientX < x) {
        workspaceDispatch({
          type: 'DELETE_BLOCK',
          id: block.id,
        });
      }
      document.removeEventListener('mousemove', mousemove);
      document.removeEventListener('mouseup', mouseup);
      if (startPosition.x === currentPosition.x && startPosition.y === currentPosition.y) {
        block.workspace.dragging.reset();
        return;
      }
      block.dragEnd(currentPosition.x, currentPosition.y);
    };

    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);
  };
  return mousedown;
};
export default mouseHandler;
