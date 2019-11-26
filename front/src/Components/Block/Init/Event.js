import color from '../../../Styles/Theme';

export default [
  {
    type: 'event_start',
    args: [
      {
        type: 'text',
        value: '시작버튼이 클릭되었을 때',
      },
    ],
    style: 'event',
    nextConnection: true,
    color: color.eventsColor,
    stroke_color: color.eventsStrokeColor,
  },
];
