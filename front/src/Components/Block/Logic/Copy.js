import init from '../Init';

export default ({ workspaceDispatch, allIdx, styleIdx }) => {
  const onMouseEnter = (event) => {
    if (event.target.tagName !== 'path') {
      return;
    }
    event.preventDefault();
    event.stopPropagation();

    const blockParams = init[allIdx][styleIdx];
    blockParams.x = event.target.getBoundingClientRect().x
    - event.target.ownerSVGElement.getBoundingClientRect().x;
    blockParams.y = event.target.getBoundingClientRect().y
    - event.target.ownerSVGElement.getBoundingClientRect().y;

    workspaceDispatch({
      type: 'ADD_BLOCK',
      blockParams,
    });
  };
  return onMouseEnter;
};
