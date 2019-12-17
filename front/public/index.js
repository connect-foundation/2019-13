window.onload = () => {
  const { userAgent } = window.navigator;
  const isChrome = userAgent.indexOf('Chrome');
  const isEdge = userAgent.indexOf('Edge');
  if (isChrome < 0 || isEdge > -1) {
    document.getElementById('root').classList.add('none');
    document.getElementById('error').classList.remove('none');
  }
};
