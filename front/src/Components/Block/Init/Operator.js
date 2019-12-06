import color from '../../../Styles/Theme';

export default [
  {
    type: 'operator_plus',
    args: [
      {
        type: 'input',
        value: '0',
      },
      {
        type: 'text',
        value: '+',
      },
      {
        type: 'input',
        value: '0',
      },
    ],
    style: 'variable',
    inputConnection: true,
    outputConnection: true,
    color: color.operatorsColor,
    stroke_color: color.operatorsStrokeColor,
  }, {
    type: 'operator_minus',
    args: [
      {
        type: 'input',
        value: '0',
      },
      {
        type: 'text',
        value: '-',
      },
      {
        type: 'input',
        value: '0',
      },
    ],
    style: 'variable',
    inputConnection: true,
    outputConnection: true,
    color: color.operatorsColor,
    stroke_color: color.operatorsStrokeColor,
  }, {
    type: 'operator_multiply',
    args: [
      {
        type: 'input',
        value: '0',
      },
      {
        type: 'text',
        value: '*',
      },
      {
        type: 'input',
        value: '0',
      },
    ],
    style: 'variable',
    inputConnection: true,
    outputConnection: true,
    color: color.operatorsColor,
    stroke_color: color.operatorsStrokeColor,
  },
];
