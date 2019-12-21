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
  {
    type: 'event_key_pressed',
    args: [
      {
        type: 'dropdown',
        value: 38,
      },
      {
        type: 'text',
        value: '키가 입력되었을 때',
      },
    ],
    style: 'event',
    nextConnection: true,
    color: color.eventsColor,
    stroke_color: color.eventsStrokeColor,
  },
];
