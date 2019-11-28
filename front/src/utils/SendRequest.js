export default async ({ url, method, body = {}, headers = {} }) => {
  if (!url) throw new SyntaxError('not found url');
  const token = localStorage.getItem('token');
  const result = await fetch(url, {
    method,
    body,
    mode: 'cors',
    cache: 'default',
    headers:
      token && token !== 'undefined' ? { ...headers, authorization: `Bearer ${token}` } : { ...headers },
  });
  const data = await result.json();
  return data;
};
