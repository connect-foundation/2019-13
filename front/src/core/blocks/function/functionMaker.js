import Move from '../../canvas/move';
import Rotate from '../../canvas/rotate';
import Collision from '../../canvas/collision';

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

  eventBlock: (args) => {
    const data = { input: [1], firstChild: args };
    return FunctionList.control_for(data);
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

  motion_move_forward: (args, imgId) => {
    const value = args.input[0];
    return { func: { next: () => Move({ movement: { moving: value }, spritekey: imgId }) } };
  },

  motion_change_x: (args, imgId) => {
    const value = args.input[0];
    return { func: { next: () => Move({ movement: { x: value }, spritekey: imgId }, 'x') } };
  },

  motion_change_y: (args, imgId) => {
    const value = args.input[0];
    return { func: { next: () => Move({ movement: { y: value }, spritekey: imgId }, 'y') } };
  },

  motion_move_xy: (args, imgId) => {
    const values = args.input;
    return { func: { next: () => Move({ movement: { x: values[0], y: values[1] }, spritekey: imgId }, 'xy') } };
  },

  motion_rotate_clock: (args, imgId) => {
    const value = args.input[0];
    return { func: { next: () => Rotate({ movement: value, spritekey: imgId }, 'clock') } };
  },

  motion_rotate_anti_clock: (args, imgId) => {
    const value = args.input[0];
    return { func: { next: () => Rotate({ movement: value, spritekey: imgId }, 'anticlock') } };
  },

  isCollision: (value, imgId) => () => Collision([value], imgId),

  control_if: (args) => {
    const value = args.input[0];
    const childArgs = { ...args, ...{ input: [1] } };
    let isPlayed = false;
    if (Number.isNaN(Number(value)) && value) {
      const next = () => {
        if (value() || isPlayed) {
          isPlayed = true;
          const functionWapper = FunctionList.control_for(childArgs);
          const res = functionWapper.func.next();
          if (res.value >= functionWapper.limit) isPlayed = false;
          return res;
        }
      };
      return { func: { next },
        limit: 1 };
    }
    return value ? FunctionList.control_for(childArgs) : { func: { next: () => {} } };
  },
};

export default FunctionList;
