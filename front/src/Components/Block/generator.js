import FuctionMaker from './functionMaker';


const dummyBlocks = [{
  type: 'control_for',
  inputElement: {
    type: 'input',
    value: 10,
  },
  firstchildElement: {
    type: 'motion_move_forward',
    inputElement: {
      type: 'input',
      value: 2,
    },
    nextElement: {
      type: 'motion_move_forward',
      inputElement: {
        type: 'input',
        value: 3,
      },
      nextElement: null,
    },
  },
  nextElement: {
    type: 'motion_move_forward',
    inputElement: {
      type: 'input',
      value: 4,
    },
    nextElement: null,
  },
}];


export default class {
  workspaceToCode(blocks = dummyBlocks) {
    const allCodes = [];

    if (blocks.length < 1) {
      return allCodes;
    }
    blocks.forEach((block) => {
      allCodes.push(this.blockToCode(block));
    });

    return allCodes;
  }


  blockToCode(block) {
    const code = [];
    const values = {};
    if (block.inputElement) {
      const input = block.inputElement.value;
      values.input = input;
    }
    if (block.firstchildElement) {
      const firstChild = this.blockToCode(block.firstchildElement);
      values.firstChild = firstChild;
    }
    if (block.secondchildElement) {
      const secondChild = this.blockToCode(block.secondchildElement);
      values.secondChild = secondChild;
    }
    code.push(FuctionMaker[block.type](values));
    if (block.nextElement) {
      code.push(...this.blockToCode(block.nextElement));
    }
    return code;
  }
}
