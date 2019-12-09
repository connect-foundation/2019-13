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
  {
    type: 'operator_division',
    args: [
      {
        type: 'input',
        value: '0',
      },
      {
        type: 'text',
        value: '÷',
      },
      {
        type: 'input',
        value: '1',
      },
    ],
    style: 'variable',
    inputConnection: true,
    outputConnection: true,
    color: color.operatorsColor,
    stroke_color: color.operatorsStrokeColor,
  },
  {
    type: 'operator_gt',
    args: [
      {
        type: 'input',
        value: '1',
      },
      {
        type: 'text',
        value: '>',
      },
      {
        type: 'input',
        value: '0',
      },
    ],
    style: 'condition',
    inputConnection: true,
    outputConnection: true,
    color: color.operatorsColor,
    stroke_color: color.operatorsStrokeColor,
  },
  {
    type: 'operator_lt',
    args: [
      {
        type: 'input',
        value: '0',
      },
      {
        type: 'text',
        value: '<',
      },
      {
        type: 'input',
        value: '1',
      },
    ],
    style: 'condition',
    inputConnection: true,
    outputConnection: true,
    color: color.operatorsColor,
    stroke_color: color.operatorsStrokeColor,
  },
  {
    type: 'operator_eq',
    args: [
      {
        type: 'input',
        value: '0',
      },
      {
        type: 'text',
        value: '=',
      },
      {
        type: 'input',
        value: '0',
      },
    ],
    style: 'condition',
    inputConnection: true,
    outputConnection: true,
    color: color.operatorsColor,
    stroke_color: color.operatorsStrokeColor,
  },
  {
    type: 'operator_ne',
    args: [
      {
        type: 'input',
        value: '1',
      },
      {
        type: 'text',
        value: '≠',
      },
      {
        type: 'input',
        value: '0',
      },
    ],
    style: 'condition',
    inputConnection: true,
    outputConnection: true,
    color: color.operatorsColor,
    stroke_color: color.operatorsStrokeColor,
  },
];
