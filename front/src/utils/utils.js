const Utils = {
  uid: () => {
    const soup = '!#$%()*+,-./:;=?@[]^_`{|}~'
        + 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 20;
    const soupLength = soup.length;
    const id = [];
    for (let i = 0; i < length; i += 1) {
      id[i] = soup.charAt(Math.random() * soupLength);
    }
    return id.join('');
  },
  arrayRemove: (arr, obj) => {
    const i = arr.indexOf(...obj);
    if (i === -1) {
      return false;
    }
    arr.splice(i, 1);
    return true;
  },
};


export default Utils;