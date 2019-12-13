import Move from '../DrawSection/function/move';
import Rotate from '../DrawSection/function/rotate';

const FunctionList = {
  topblock: (args) => {
    const codes = args;
    let isChildEnd = false;
    let i = 0;
    let j = 0;
    function* once() {
      while (i < 1 && codes) {
        while (j < codes.length) {
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
    return { func: once() };
  },
  control_for: (args) => {
    const limit = args.input[0];
    let isChildEnd = false;
    let i = 0;
    let j = 0;
    const codes = args.firstChild;
    function* FOR_LOOP() {
      while (codes) {
        if (limit <= 0) yield i += 1;
        else {
          if (i >= limit) i = 0;
          if (j === codes.length) j = 0;
          while (j < codes.length) {
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
    }
    return { func: FOR_LOOP(), limit };
  },

  motion_move_forward: (args) => {
    const value = args.input[0];
    return { func: { next: () => Move({ moving: value }) } };
  },

  motion_change_x: (args) => {
    const value = args.input[0];
    return { func: { next: () => Move({ x: value }, 'x') } };
  },

  motion_change_y: (args) => {
    const value = args.input[0];
    return { func: { next: () => Move({ y: value }, 'y') } };
  },

  motion_rotate_clock: (args) => {
    const value = args.input[0];
    return { func: { next: () => Rotate(value, 'clock') } };
  },

  motion_rotate_anti_clock: (args) => {
    const value = args.input[0];
    return { func: { next: () => Rotate(value, 'anticlock') } };
  },

  control_if: (args) => {
    const value = args.input[0];
    args.input[0] = 1;
    return value ? FunctionList.control_for(args) : { func: { next: () => {} } };
  },
};

export default FunctionList;
