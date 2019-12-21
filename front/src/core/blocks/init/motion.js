import color from '../../../Styles/Theme';

export default [
  {
    type: 'motion_move_forward',
    args: [
      {
        type: 'input',
        value: 10,
      },
      {
        type: 'text',
        value: '만큼 움직이기',
      },
    ],
    style: 'single',
    nextConnection: true,
    previousConnection: true,
    inputConnection: true,
    color: color.motionColor,
    stroke_color: color.motionStrokeColor,
  },
  {
    type: 'motion_change_x',
    args: [
      {
        type: 'text',
        value: 'x 좌표를',
      },
      {
        type: 'input',
        value: 10,
      },
      {
        type: 'text',
        value: '만큼 바꾸기',
      },
    ],
    style: 'single',
    nextConnection: true,
    previousConnection: true,
    inputConnection: true,
    color: color.motionColor,
    stroke_color: color.motionStrokeColor,
  },
  {
    type: 'motion_change_y',
    args: [
      {
        type: 'text',
        value: 'y 좌표를',
      },
      {
        type: 'input',
        value: 10,
      },
      {
        type: 'text',
        value: '만큼 바꾸기',
      },
    ],
    style: 'single',
    nextConnection: true,
    previousConnection: true,
    inputConnection: true,
    color: color.motionColor,
    stroke_color: color.motionStrokeColor,
  },
  {
    type: 'motion_move_xy',
    args: [
      {
        type: 'text',
        value: 'x :',
      },
      {
        type: 'input',
        value: 10,
      },
      {
        type: 'text',
        value: '　y :',
      },
      {
        type: 'input',
        value: 10,
      },
      {
        type: 'text',
        value: '으로 이동하기',
      },
    ],
    style: 'single',
    nextConnection: true,
    previousConnection: true,
    inputConnection: true,
    color: color.motionColor,
    stroke_color: color.motionStrokeColor,
  },
  {
    type: 'motion_rotate_clock',
    args: [
      {
        type: 'text',
        value: '시계 방향으로',
      },
      {
        type: 'input',
        value: 10,
      },
      {
        type: 'text',
        value: '° 회전하기',
      },
    ],
    style: 'single',
    nextConnection: true,
    previousConnection: true,
    inputConnection: true,
    color: color.motionColor,
    stroke_color: color.motionStrokeColor,
  },
  {
    type: 'motion_rotate_anti_clock',
    args: [
      {
        type: 'text',
        value: '반시계 방향으로',
      },
      {
        type: 'input',
        value: 10,
      },
      {
        type: 'text',
        value: '° 회전하기',
      },
    ],
    style: 'single',
    nextConnection: true,
    previousConnection: true,
    inputConnection: true,
    color: color.motionColor,
    stroke_color: color.motionStrokeColor,
  },
];
