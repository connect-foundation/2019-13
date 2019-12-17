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
    firstChildConnection: true,
    inputConnection: true,
    color: color.controlColor,
    stroke_color: color.controlStrokeColor,
  },
  {
    type: 'control_if',
    args: [
      {
        type: 'text',
        value: '만약',
      },
      {
        type: 'input',
        value: '1',
      },
      {
        type: 'text',
        value: '(이)라면',
      },
    ],
    style: 'double',
    nextConnection: true,
    previousConnection: true,
    firstChildConnection: true,
    inputConnection: true,
    color: color.controlColor,
    stroke_color: color.controlStrokeColor,
  },
];
