import color from '../../../Styles/Theme';

export default [
  {
    type: 'sense_collision',
    args: [
      {
        type: 'dropdown',
        value: 'wall',
      },
      {
        type: 'text',
        value: '에 닿았는가?',
      },
    ],
    style: 'condition',
    outputConnection: true,
    color: color.sensingColor,
    stroke_color: color.sensingStrokeColor,
  },
];
