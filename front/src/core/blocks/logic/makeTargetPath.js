export default (target) => {
  let path = target;
  while (path.tagName !== 'g') {
    if (path.tagName === 'BODY' || path.tagName === 'LI' || path.tagName === 'UL') { return null; }
    path = path.parentNode;
  }
  path = path.firstChild;
  return path;
};
