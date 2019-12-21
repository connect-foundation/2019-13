import childDrag from './childDrag';
import CONSTANTS from '../constants';
import makeTargetPath from './makeTargetPath';

const mouseHandler = ({ set, block, workspaceDispatch }) => {
  if (block.parentElement || block.previousElement || block.outputElement) {
    const mousedownChild = childDrag({ set, block, workspaceDispatch });
    return mousedownChild;
  }
  const mousedown = (eventDown) => {
    if (eventDown.button !== 0) {
      return;
    }
    let { target } = eventDown;
    target = makeTargetPath(target);
    eventDown.preventDefault();
    eventDown.stopPropagation();
    if (target === null) return;

    const startPosition = { x: 0, y: 0 };
    startPosition.x = target.getBoundingClientRect().x
    - target.ownerSVGElement.getBoundingClientRect().x;
    startPosition.y = target.getBoundingClientRect().y
    - target.ownerSVGElement.getBoundingClientRect().y;

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
      document.removeEventListener('mousemove', mousemove);
      document.removeEventListener('mouseup', mouseup);
      if (startPosition.x === currentPosition.x && startPosition.y === currentPosition.y) {
        block.workspace.dragging.reset();
        if (eventUp.target.tagName === 'INPUT') {
          eventUp.target.select();
        }
        return;
      }
      if (currentPosition.x < CONSTANTS.DELETE_AREA_X + 1) {
        currentPosition.x = CONSTANTS.DELETE_AREA_X + 1;
        set({ x: currentPosition.x, y: currentPosition.y });
      } else if (target.getBoundingClientRect().right
      > target.ownerSVGElement.getBoundingClientRect().right) {
        currentPosition.x = startPosition.x;
        currentPosition.y = startPosition.y;
        set({ x: currentPosition.x, y: currentPosition.y });
        block.dragUpdate(currentPosition.x, currentPosition.y);
      }
      block.dragEnd(currentPosition.x, currentPosition.y);
      if (eventUp.clientX < CONSTANTS.DELETE_AREA_X + CONSTANTS.BUTTON_AREA_WIDTH) {
        workspaceDispatch({
          type: 'DELETE_BLOCK',
          id: block.id,
        });
      }
    };

    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);
  };
  return mousedown;
};
export default mouseHandler;
