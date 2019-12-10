export default (target) => {
  let path = target;
  if (target.tagName === 'INPUT') {
    path = target.parentNode.parentNode.firstChild;
  } else if (target.tagName === 'foreignObject') {
    path = target.parentNode.firstChild;
  }
  return path;
};
