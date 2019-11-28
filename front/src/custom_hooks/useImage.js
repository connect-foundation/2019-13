import { useState, useEffect } from 'react';

export default ({ url, x, y, size = 100, direction = 0 }) => {
  const [image, setImage] = useState(undefined);

  useEffect(() => {
    if (!url) return;
    const img = new Image();
    img.src = url;
    const onLoad = () => {
      img.width = img.width ? img.width * (size / 100) : 100 * (size / 100);
      img.height = img.height ? img.height * (size / 100) : 100 * (size / 100);
      setImage(img);
    };
    img.addEventListener('load', onLoad);
  }, [url, x, y, size, direction]);

  return [image, setImage];
};
