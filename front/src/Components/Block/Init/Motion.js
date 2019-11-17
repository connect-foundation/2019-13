import color from './Color'

export default [{
  type: "motion_move_forward",
  args0: [{
    type: "input",
    value: 10
  }],
  args1: [{
    type: "text",
    value: "만큼 움직이기"
  }],
  style: "single",
  color: color.motion_color,
  stroke_color: color.motion_stroke_color
}, {
  type: "motion_change_x",
  args0: [{
    type: "text",
    value: "x 좌표를"
  }],
  args1: [{
    type: "input",
    value: 10
  }],
  args2: [{
    type: "text",
    value: "만큼 바꾸기"
  }],
  style: "single",
  color: color.motion_color,
  stroke_color: color.motion_stroke_color
}, {
  type: "motion_change_y",
  args0: [{
    type: "text",
    value: "y 좌표를"
  }],
  args1: [{
    type: "input",
    value: 10
  }],
  args2: [{
    type: "text",
    value: "만큼 바꾸기"
  }],
  style: "single",
  color: color.motion_color,
  stroke_color: color.motion_stroke_color
},

]