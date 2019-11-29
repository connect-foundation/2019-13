export const getDocumentHeight = () => {
  const { body } = document;
  const html = document.documentElement;

  return Math.max(
    body.scrollHeight, body.offsetHeight,
    html.offsetHeight, html.clientHeight, html.scrollHeight,
  );
};


export const getScrollTop = () => ((window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop);
