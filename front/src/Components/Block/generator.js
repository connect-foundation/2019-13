import FunctionMaker from './functionMaker';

export default class {
  workspaceToCode(blocks) {
    return blocks.map(block => FunctionMaker.topblock(this.blockToCode(block)));
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
    code.push(FunctionMaker[block.type](values));
    if (block.nextElement) {
      code.push(...this.blockToCode(block.nextElement));
    }
    return code;
  }
}
