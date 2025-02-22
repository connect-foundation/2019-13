import moment from 'moment-timezone';

let sprite;

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
    const i = arr.indexOf(obj);
    if (i === -1) {
      return false;
    }
    arr.splice(i, 1);
    return true;
  },
  parseInt10: value => parseInt(value, 10),
  checkRange: (value, min, max) => {
    if (value < min) return Math.round(min);
    if (value > max) return Math.round(max);
    return Math.round(value);
  },
  straightSprite: ({ position, movement }) => {
    const value = {
      x:
        Utils.parseInt10(position.x)
        + Utils.parseInt10(
          movement.moving
            * Math.cos((Math.PI / 180) * (position.direction - 90)).toFixed(4),
        ),
      y:
        Utils.parseInt10(position.y)
        + Utils.parseInt10(
          movement.moving
            * Math.sin((Math.PI / 180) * (position.direction - 90)).toFixed(4),
        ),
    };
    return value;
  },
  setSprite: (func) => {
    sprite = func;
  },
  getSprite: () => sprite(),
  getSeoulTime: worldTime => moment.tz(worldTime, 'Asia/Seoul').format('YYYY 년 MM 월 DD 일 HH:mm'),
  radian: degree => Math.PI * degree / 180,
  checkImageSize: ({ width, height }) => {
    const result = Utils.parseInt10(15000
    / Math.sqrt(width * width + height * height)) || 0;
    return result < 100 ? result : 100;
  },
  reduceText: (str, length) => (str.length > length ? `${str.substring(0, length - 1)}...` : str),
};


export default Utils;
