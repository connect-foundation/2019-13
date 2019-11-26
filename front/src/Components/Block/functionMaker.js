export default {
  control_for: (args) => {
    const limit = args.input;
    const codes = args.firstChild;
    return () => {
      for (let i = 0; i < limit; i += 1) {
        codes.forEach(func => func());
      }
    };
  },

  motion_move_forward: (args) => {
    const value = args.input;
    return () => {
      // canvas 조작 함수가 들어와야함.
      // ex move(value)
    };
  },

  motion_change_x: (args) => {
    const value = args.input;
    return () => {
      // canvas 조작 함수가 들어와야함.
      // ex move(value, 'x')
    };
  },

  motion_change_y: (args) => {
    const value = args.input;
    return () => {
      // canvas 조작 함수가 들어와야함.
      // ex move(value, 'y')
    };
  },
};
