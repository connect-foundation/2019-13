import CONSTANTS from '../constants';
import makeTargetPath from './makeTargetPath';

const mouseHandler = ({ set, block, workspaceDispatch }) => {
  const mousedown = (eventDown) => {
    if (eventDown.button !== 0) {
      return;
    }
    let { target } = eventDown;
    if (target.tagName === 'INPUT') {
      target.select();
    }
    target = makeTargetPath(target);
    eventDown.preventDefault();
    eventDown.stopPropagation();
    if (target === null) return;
    const { ownerSVGElement } = target;

    const startRealPosition = { x: 0, y: 0 };
    startRealPosition.x = target.getBoundingClientRect().x
    - ownerSVGElement.getBoundingClientRect().x;
    startRealPosition.y = target.getBoundingClientRect().y
    - ownerSVGElement.getBoundingClientRect().y;

    const startPosition = { x: 0, y: 0 };
    const { node } = block;
    startPosition.x = node.getBoundingClientRect().left
    - node.parentNode.getBoundingClientRect().left;
    startPosition.y = node.parentNode.getBoundingClientRect().height
    - node.getBoundingClientRect().height;
    if (block.parentElement) {
      startPosition.y = node.parentNode.firstChild.getBoundingClientRect().height
      - node.getBoundingClientRect().height - CONSTANTS.BLOCK_TAIL_HEIGHT;
    } else if (block.outputElement) {
      if (block.outputElement.style === 'double' || block.outputElement.style === 'triple') {
        startPosition.y = CONSTANTS.PIXEL + 1;
      }
    }

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

    const mouseup = (eventUp) => {
      document.removeEventListener('mousemove', mousemove);
      document.removeEventListener('mouseup', mouseup);
      if (currentRealPosition.x < CONSTANTS.DELETE_AREA_X + 1) {
        currentRealPosition.x = CONSTANTS.DELETE_AREA_X + 1;
      } else if (target.getBoundingClientRect().right
      > ownerSVGElement.getBoundingClientRect().right) {
        currentRealPosition.x = startRealPosition.x;
        currentRealPosition.y = startRealPosition.y;
        set({ x: currentRealPosition.x, y: currentRealPosition.y });
      }
      block.dragUpdate(currentRealPosition.x, currentRealPosition.y);
      block.dragEnd(currentRealPosition.x, currentRealPosition.y);
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
