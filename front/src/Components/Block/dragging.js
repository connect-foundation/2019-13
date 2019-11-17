const Dragging = function() {
  this.isDragging = false;
  this.dragginBlock = undefined;
  this.orginalX = 0;
  this.orginalY = 0;
  this.currentX = 0;
  this.currentY = 0;
};

Dragging.prototype.dragStart = function(sourceBlock, x, y) {
  this.isDragging = true;
  this.orginalX = x;
  this.orginalY = y;
  this.dragginBlock = sourceBlock;
};

Dragging.prototype.updateDrag = function(x, y) {
  this.currentX = x;
  this.currentY = y;
};

Dragging.prototype.getCurrentBlockX = function() {
  return this.currentX - this.orginalX + this.dragginBlock.X;
};

Dragging.prototype.getCurrentBlockY = function() {
  return this.currentY - this.orginalY + this.dragginBlock.Y;
};

export default Dragging;
