/* workspace class의 내부 함수입니다. */
dragEnd() {
    // dragging.dragEnd함수가 리턴하는 블록은 드래그 하고 있던 블록중 가장 위 블록입니다.
    const block = this.dragging.dragEnd();
    // 드래그가 끝난상태일 때, 부모 또는 위 블록이 있는지 확인하는 부분입니다.
    if (block.parentElement || block.previousElement) {
        this.removeTopblock(block);
    }
    // topblocks는 나와 있는 블록들 중 위에 있는 블록만 따로 저장한 배열입니다.
    this.topblocks.forEach((topblock) => {
        if (topblock !== block) { topblock.setAllBlockPosition(); }
    });
}

/* block class의 내부 함수입니다. */
setAllBlockPosition = () => {
    this.setNextElementPosition();
}

setNextElementPosition = () => {
    // firstchildElement는 블록의 가운데에 들어간 블록 중 가장 위 블록입니다.
    if (this.firstchildElement) {
        this.setFirstChildPosition();
        this.firstchildHeight = this.firstchildElement.node.getBoundingClientRect().height
            - CONSTANTS.PIXEL;
    }
    // nextElement는 블록의 밑부분에 붙은 블록입니다.
    if (this.nextElement) {
        this.nextElement.y = this.y + this.height - CONSTANTS.PIXEL;
        this.nextElement.x = this.x;
        this.nextElement.setNextElementPosition();
    }
    // setArgs는 크기를 잡아주고 재 렌더링해주는 함수입니다
    this.setArgs();
};

setFirstChildPosition = () => {
    this.firstchildElement.y = this.y + CONSTANTS.BLOCK_HEAD_HEIGHT;
    this.firstchildElement.x = this.x + CONSTANTS.PREVIOUS_NEXT_POS_X;
    this.firstchildElement.setNextElementPosition();
}