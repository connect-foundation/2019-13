import init from '../init';
import makeTargetPath from './makeTargetPath';

export default ({ workspaceDispatch, allIdx, styleIdx }) => {
  const onMouseEnter = (event) => {
    let { target } = event;
    target = makeTargetPath(target);
    event.preventDefault();
    event.stopPropagation();

    const blockParams = init[allIdx][styleIdx];
    blockParams.x = target.getBoundingClientRect().x
    - target.ownerSVGElement.getBoundingClientRect().x;
    blockParams.y = target.getBoundingClientRect().y
    - target.ownerSVGElement.getBoundingClientRect().y;
    workspaceDispatch({
      type: 'ADD_BLOCK',
      blockParams,
    });
  };
  return onMouseEnter;
};
