export default async ({ url, method, body = {}, headers = {} }) => {
  if (!url) throw new SyntaxError('not found url');
  const token = localStorage.getItem('token');
  const result = await fetch(process.env.REACT_APP_AUTH_GOOGLE, {
    method,
    body,
    mode: 'cors',
    cache: 'default',
    headers:
      token ? { ...headers, authorization: `Bearer ${token}` } : { ...headers },
  });
  const data = await result.json();
  return data;
};
