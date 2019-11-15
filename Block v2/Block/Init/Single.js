export default [
  {
    type: "motion_move",
    args0: [
      {
        message: "",
        type: "input",
        check: "Double"
      }
    ],
    args1: [
      {
        message: "만큼 이동하기",
        type: "text"
      }
    ],
    style: "single_block"
  },
  {
    type: "motion_change_x",
    args0: [
      {
        message: "x 좌표를",
        type: "text"
      }
    ],
    args1: [
      {
        message: "",
        type: "input",
        check: "Double"
      }
    ],
    args2: [
      {
        message: "만큼 바꾸기",
        type: "text"
      }
    ],
    style: "single_block"
  },
]