import React from 'react';
import Path from './Path';
import Utils from '../../utils/utils';
import Connection from './connection';
import CONSTANTS from './constants';

const create = React.createElement;
const Block = class {
  constructor(workspace, usedId) {
    this.id = usedId;
    this.type = '';
    this.style = '';
    this.workspace = workspace;
    this.firstchildConnection = null;
    this.secondchildConnection = null;
    this.firstchildElement = null;
    this.secondchildElement = null;
    this.x = 0;
    this.y = 0;
    this.args = [];
    this.color = '';
    this.strokeColor = '';
    this.previousConnection = null;
    this.nextConnection = null;
    this.previousElement = null;
    this.nextElement = null;
    this.path = null;
    this.node = null;
    this.render = null;
    this.allIdx = -1;
    this.styleIdx = -1;
    this.isDragged = false;
    this.parentElement = null;
    this.parentConnection = null;
    this.height = 0;
    this.firstchildHeight = 24;
    this.secondchildHeight = 24;
    this.inputElement = [];
    this.inputWidth = [];
  }

  setNode = (node) => {
    this.node = node;
    this.setArgs();
  };

  setArgs = () => {
    if (this.node) {
      let positionX = CONSTANTS.PIXEL;
      let lastChild;
      this.node.childNodes.forEach((node) => {
        if (node.tagName !== 'path' && node.tagName !== 'g') {
          this.setArgsPosition(node, positionX);
          positionX += node.getBoundingClientRect().width;
          lastChild = node;
        }
      });
      if (this.firstchildHeight < 24) { this.firstchildHeight = 24; }
      if (this.secondchildHeight < 24) { this.secondchildHeight = 24; }
      this.makeStyleFromJSON(
        (lastChild.getBoundingClientRect().right
        - this.node.firstChild.getBoundingClientRect().left
        - CONSTANTS.PIXEL * 5)
        / CONSTANTS.PIXEL,
        this.firstchildHeight / CONSTANTS.PIXEL - 2,
        this.secondchildHeight / CONSTANTS.PIXEL - 2,
      );
      this.render(Math.random());
      this.height = this.node.firstChild.getBoundingClientRect().height;
      this.setConnectionPosition();
    }
  };

  setArgsPosition = (node, positionX) => {
    if (node.tagName !== 'foreignObject') {
      node.setAttribute('transform', `translate(${positionX},23)`);
    } else {
      node.setAttribute('transform', `translate(${positionX + 3},8)`);
    }
  };

  setConnectionPosition = () => {
    if (this.previousConnection) {
      this.previousConnection = new Connection(
        CONSTANTS.PREVIOUS_CONNECTION,
        this, 'previousPosition',
      );
      this.previousConnection.setPositions();
    }

    if (this.nextConnection) {
      this.nextConnection = new Connection(
        CONSTANTS.NEXT_CONNECTION,
        this, 'nextPosition',
      );
      this.nextConnection.setPositions();
    }

    if (this.firstchildConnection) {
      this.firstchildConnection = new Connection(
        CONSTANTS.NEXT_CONNECTION,
        this, 'firstChildPosition',
      );
      this.firstchildConnection.setPositions();
    }
  }

  changeInputWidth = (set, index) => (event) => {
    const { target } = event;
    this.inputElement[index].value = Number(target.value.replace(/[^0-9-]/g, ''));
    if (Number.isNaN(this.inputElement[index].value)) this.inputElement[index].value = 0;
    if (this.inputElement[index].value > Number.MAX_SAFE_INTEGER) {
      this.inputElement[index].value = Number.MAX_SAFE_INTEGER;
    } else if (this.inputElement[index].value < Number.MIN_SAFE_INTEGER) {
      this.inputElement[index].value = Number.MIN_SAFE_INTEGER;
    }
    const { lastChild } = target.parentNode;
    lastChild.innerHTML = this.inputElement[index].value;
    this.inputWidth[index] = lastChild.clientWidth;
    if (this.inputElement[index].value > -10000 && this.inputElement[index].value < 100000) {
      this.inputWidth[index] = 30;
    }
    target.parentNode.style.width = `${this.inputWidth[index]}px`;
    target.style.width = `${this.inputWidth[index]}px`;
    if (set) { set(this.inputElement[index].value); }
    this.setArgs();
  };

  makeFromJSON = (json) => {
    this.type = json.type;
    this.color = json.color;
    this.strokeColor = json.stroke_color;
    this.x = json.x ? json.x : 0;
    this.y = json.y ? json.y : 0;
    this.allIdx = json.allIdx === 0 || Number(json.allIdx) ? json.allIdx : -1;
    this.styleIdx = json.styleIdx === 0 || Number(json.styleIdx) ? json.styleIdx : -1;


    if (!this.id) {
      this.id = Utils.uid();
    }

    json.args.forEach((arg) => {
      this.makeArgsFromJSON(arg);
    });

    this.style = json.style;
    this.makeStyleFromJSON();

    if (json.previousConnection) {
      this.previousConnection = true;
    }

    if (json.nextConnection) {
      this.nextConnection = true;
    }

    if (json.firstchildConnection) {
      this.firstchildConnection = true;
    }

    if (!this.workspace.getBlockById(this.id)) {
      this.workspace.blockDB[this.id] = this;
    }
  };

  makeArgsFromJSON = (json) => {
    if (json.type === 'text') {
      this.args.push(create(json.type, { key: json.value }, json.value));
    } else if (json.type === 'input') {
      this.inputElement.push({ type: json.type, value: json.value });
      this.args.push('input');
    }
  };

  makeStyleFromJSON = (width, height, secondHeight) => {
    switch (this.style) {
      case 'single':
        this.path = create(
          'path',
          {
            d: Path.single(width),
            fill: this.color,
            stroke: this.strokeColor,
            strokeWidth: 1,
            key: 'single',
          },
          null,
        );
        break;
      case 'double':
        this.path = create(
          'path',
          {
            d: Path.double(width, height),
            fill: this.color,
            stroke: this.strokeColor,
            strokeWidth: 1,
            key: 'double',
          },
          null,
        );
        break;
      case 'triple':
        this.path = create(
          'path',
          {
            d: Path.triple(width, height, secondHeight),
            fill: this.color,
            stroke: this.strokeColor,
            strokeWidth: 1,
            key: 'triple',
          },
          null,
        );
        break;
      case 'variable':
        this.path = create(
          'path',
          {
            d: Path.variable(width),
            fill: this.color,
            stroke: this.strokeColor,
            strokeWidth: 1,
            key: 'variable',
          },
          null,
        );
        break;
      case 'event':
        this.path = create(
          'path',
          {
            d: Path.event(width),
            fill: this.color,
            stroke: this.strokeColor,
            strokeWidth: 1,
            key: 'event',
          },
          null,
        );
        break;
      case 'condition':
        this.path = create(
          'path',
          {
            d: Path.condition(width),
            fill: this.color,
            stroke: this.strokeColor,
            strokeWidth: 1,
            key: 'condition',
          },
          null,
        );
        break;
      default:
        throw new Error("It's not a defined style!!");
    }
  };

  dragStart = (x, y) => {
    this.setDrag(true);
    this.workspace.dragStart(this, x, y);
  };

  dragUpdate = (x, y) => {
    this.workspace.dragUpdate(x, y);
  };

  dragEnd = (x, y) => {
    this.x = x;
    this.y = y;
    this.setDrag(false);
    this.workspace.dragEnd();
  };

  getLastBlock = (goEndPoint = false) => {
    if (this.nextElement && goEndPoint) {
      return this.nextElement.getLastBlock(goEndPoint);
    }

    return this;
  };

  setDrag = (isDragged) => {
    this.isDragged = isDragged;
    if (this.nextElement) {
      this.nextElement.setDrag(isDragged);
    }

    if (this.firstchildElement) {
      this.firstchildElement.setDrag(isDragged);
    }

    if (this.secondchildElement) {
      this.secondchildElement.setDrag(isDragged);
    }
  };

  getAvailableConnection = (isDragged = false) => {
    const availableConnection = [];

    if (this.previousConnection && this.parentElement === null) {
      availableConnection.push(this.previousConnection);
    }

    if (this.nextConnection) {
      const nextConn = this.getLastBlock(isDragged).nextConnection;
      if (nextConn) availableConnection.push(nextConn);
    }

    if (this.firstchildConnection) {
      availableConnection.push(this.firstchildConnection);
    }

    return availableConnection;
  };

  setNextElementPosition = () => {
    if (this.firstchildElement) {
      this.setFirstChildPosition();
      this.firstchildHeight = this.firstchildElement.node.getBoundingClientRect().height
      - CONSTANTS.PIXEL;
    }
    if (this.nextElement) {
      this.nextElement.y = this.y + this.height - CONSTANTS.PIXEL;
      this.nextElement.x = this.x;
      this.nextElement.setNextElementPosition();
    }
    this.setArgs();
  };

  setFirstChildPosition = () => {
    this.firstchildElement.y = this.y + CONSTANTS.BLOCK_HEAD_HEIGHT;
    this.firstchildElement.x = this.x + CONSTANTS.PREVIOUS_NEXT_POS_X;
    this.firstchildElement.setNextElementPosition();
  }

  setpreviousElement = (previousElement) => {
    this.previousElement = previousElement;
  };

  setNextElement = (nextElement) => {
    this.nextElement = nextElement;
  };

  setParentElement = (parentElement) => {
    this.parentElement = parentElement;
  }

  setFirstChildElement = (firstchildElement) => {
    this.firstchildElement = firstchildElement;
  }

  setSecondChildElement = (secondchildElement) => {
    this.secondchildElement = secondchildElement;
  }

  connectBlock = (type, conn) => {
    switch (type) {
      case 'nextPosition':
        Utils.arrayRemove(this.workspace.topblocks, conn.source);
        if (this.nextElement) {
          const lastBlock = conn.source.getLastBlock(true);
          lastBlock.setNextElement(this.nextElement);
          this.nextElement.setpreviousElement(lastBlock);
        }
        if (conn.source.previousElement) {
          conn.source.previousElement.setNextElement(null);
        }
        conn.source.setpreviousElement(this);
        this.setNextElement(conn.source);
        break;
      case 'previousPosition':
        if (conn.positiontype === 'nextPosition') {
          if (conn.source.nextElement) {
            const lastBlock = this.getLastBlock(true);
            conn.source.nextElement.setpreviousElement(lastBlock);
            lastBlock.setNextElement(conn.source.nextElement);
          }
          this.previousElement = conn.source;
          conn.source.setNextElement(this);
        } else if (conn.positiontype === 'firstChildPosition') {
          if (conn.source.firstchildElement) {
            const lastBlock = this.getLastBlock(true);
            conn.source.firstchildElement.setpreviousElement(lastBlock);
            conn.source.firstchildElement.parentElement = null;
            lastBlock.setNextElement(conn.source.firstchildElement);
          }
          this.parentElement = conn.source;
          conn.source.setFirstChildElement(this);
        }
        break;
      case 'outputPosition':
        break;
      case 'inputPosition':
        break;
      case 'firstChildPosition':
        break;
      case 'secondChildPosition':
        break;
      default:
        throw new Error('잘못된 커넥션 타입입니다.');
    }
  };

  disconnectBlock = () => {
    if (this.previousElement) {
      this.previousElement.nextElement = null;
      this.previousElement = null;
    }
    if (this.parentElement) {
      if (this.parentElement.firstchildElement === this) {
        this.parentElement.firstchildHeight -= this.node.getBoundingClientRect().height - CONSTANTS.PIXEL;
        this.parentElement.firstchildElement = null;
        this.parentElement = null;
      } else if (this.parentElement.secondchildElement === this) {
        this.parentElement.secondchildElement = null;
        this.parentElement = null;
      }
    }
  };

  setAllBlockPosition = () => {
    this.setNextElementPosition();
  }
};

export default Block;
