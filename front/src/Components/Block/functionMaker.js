import Move from '../DrawSection/function/move';
import Rotate from '../DrawSection/function/rotate';

const FunctionList = {
  topblock: (args) => {
    const codes = args;
    let isChildEnd = false;
    let i = 0;
    let j = 0;
    function* ONCE() {
      while (i < 1 && codes) {
        while (j < codes.length) {
          codes[j].isPlay = true;
          isChildEnd = true;
          const cur = codes[j].func.next();
          if (cur && cur.value < codes[j].limit) {
            isChildEnd = false;
            break;
          }
          j += 1;
        }
        yield i += isChildEnd ? 1 : 0;
      }
    }
    return { func: ONCE() };
  },
  control_for: (args) => {
    const limit = args.input;
    let isChildEnd = false;
    let i = 0;
    let j = 0;
    const codes = args.firstChild;
    function* FOR_LOOP() {
      while (true && codes) {
        if (i >= limit) i = 0;
        if (j === codes.length) j = 0;
        while (j < codes.length) {
          codes[j].func.isPlay = true;
          isChildEnd = true;
          const cur = codes[j].func.next();
          if (cur && cur.value < codes[j].limit) {
            isChildEnd = false;
            break;
          }
          j += 1;
        }
        yield i += isChildEnd ? 1 : 0;
      }
    }
    return { func: FOR_LOOP(), limit };
  },

  motion_move_forward: (args) => {
    const value = args.input;
    const func = { isPlay: true };
    func.next = () => {
      if (func.isPlay) Move({ moving: value });
      func.isPlay = false;
    };
    return { func };
  },

  motion_change_x: (args) => {
    const value = args.input;
    const func = { isPlay: true };
    func.next = () => {
      if (func.isPlay) Move({ x: value }, 'x');
      func.isPlay = false;
    };
    return { func };
  },

  motion_change_y: (args) => {
    const value = args.input;
    const func = { isPlay: true };
    func.next = () => {
      if (func.isPlay) Move({ y: value }, 'y');
      func.isPlay = false;
    };
    return { func };
  },

  motion_rotate_clock: (args) => {
    const value = args.input;
    const func = { isPlay: true };
    func.next = () => {
      if (func.isPlay) Rotate(value, 'clock');
      func.isPlay = false;
    };
    return { func };
  },

  motion_rotate_anti_clock: (args) => {
    const value = args.input;
    const func = { isPlay: true };
    func.next = () => {
      if (func.isPlay) Rotate(value, 'anticlock');
      func.isPlay = false;
    };
    return { func };
  },
};

export default FunctionList;
