import color from '../../../Styles/Theme';

export default [
  {
    type: 'control_for',
    args: [
      {
        type: 'input',
        value: 10,
      },
      {
        type: 'text',
        value: '번 반복하기',
      },
    ],
    style: 'double',
    nextConnection: true,
    previousConnection: true,
    firstchildConnection: true,
    color: color.controlColor,
    stroke_color: color.controlStrokeColor,
  },
];
