import FunctionMaker from './functionMaker';

export default class {
  workspaceToCode(blocks, isEvent = false, imgId) {
    if (isEvent) return FunctionMaker.eventBlock(this.blockToCode(blocks, imgId));
    return blocks.map(block => FunctionMaker.topblock(this.blockToCode(block, imgId)));
  }

  blockToCode(block, imgId) {
    const code = [];
    const values = {};
    if (block.inputElement) {
      values.input = block.inputElement.map(input => input.value);
    }
    if (block.firstchildElement) {
      const firstChild = this.blockToCode(block.firstchildElement, imgId);
      values.firstChild = firstChild;
    }
    if (block.secondchildElement) {
      const secondChild = this.blockToCode(block.secondchildElement, imgId);
      values.secondChild = secondChild;
    }
    code.push(FunctionMaker[block.type](values, imgId));
    if (block.nextElement) {
      code.push(...this.blockToCode(block.nextElement, imgId));
    }
    return code;
  }
}
