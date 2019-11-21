import Motion from '../Init/Motion';

export default ({ workspaceDispatch, motionIndex }) => {
  const onMouseEnter = (event) => {
    if (event.target.tagName !== 'path') {
      return;
    }
    event.preventDefault();

    const blockParams = Motion[motionIndex];
    blockParams.x = event.target.getBoundingClientRect().x
    - event.target.ownerSVGElement.getBoundingClientRect().x;
    blockParams.y = event.target.getBoundingClientRect().y
    - event.target.ownerSVGElement.getBoundingClientRect().y;
    event.preventDefault();
    workspaceDispatch({
      type: 'ADD_BLOCK',
      blockParams,
    });
  };
  return onMouseEnter;
};
