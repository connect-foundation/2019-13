export default async ({ url, method, body = {}, headers = {} }) => {
  if (!url) throw new SyntaxError('not found url');
  const result = await fetch(process.env.REACT_APP_AUTH_GOOGLE, {
    method,
    body,
    mode: 'cors',
    cache: 'default',
    headers,
  });
  const data = await result.json();
  return data;
};
