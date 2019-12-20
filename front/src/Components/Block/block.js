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
    this.firstChildConnection = null;
    this.secondChildConnection = null;
    this.firstChildElement = null;
    this.secondChildElement = null;
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
    this.firstChildHeight = CONSTANTS.MINIMUM_BLOCK_HEIGHT;
    this.secondChildHeight = CONSTANTS.MINIMUM_BLOCK_HEIGHT;
    this.inputElement = [];
    this.inputWidth = [CONSTANTS.DEFAULT_INPUT_WIDTH, CONSTANTS.DEFAULT_INPUT_WIDTH];
    this.inputConnection = null;
    this.outputConnection = null;
    this.outputElement = null;
    this.value = null;
    this.inputX = [];
  }

  setNode = (node) => {
    this.node = node;
    this.setArgs();
  };

  setArgs = () => {
    if (this.node) {
      let positionX = CONSTANTS.PIXEL;
      this.inputX = [];
      let lastChild;
      this.render(Math.random());
      this.node.childNodes.forEach((node) => {
        if ((node.tagName !== 'path' && node.tagName !== 'g')
        || (node.tagName === 'g' && node.id === this.inputElement.reduce((acc, cur) => { if (cur.id === node.id) acc.push(cur.id); return acc; }, [])[0])) {
          this.setArgsPosition(node, positionX);
          if (node.tagName === 'foreignObject' || node.tagName === 'g') { this.inputX.push(positionX); }
          if (node.tagName === 'foreignObject') { positionX += this.inputWidth[this.inputX.length - 1] + CONSTANTS.PIXEL; } else { positionX += node.getBoundingClientRect().width; }
          lastChild = node;
        }
      });
      if (this.firstChildHeight < CONSTANTS.MINIMUM_BLOCK_HEIGHT) { this.firstChildHeight = CONSTANTS.MINIMUM_BLOCK_HEIGHT; }
      if (this.secondChildHeight < CONSTANTS.MINIMUM_BLOCK_HEIGHT) { this.secondChildHeight = CONSTANTS.MINIMUM_BLOCK_HEIGHT; }
      let { right } = lastChild.getBoundingClientRect();
      const { left } = this.node.firstChild.getBoundingClientRect();
      if (lastChild.tagName === 'foreignObject') {
        right = left + Number(lastChild.getAttribute('x')) + this.inputWidth[this.inputWidth.length - 1];
      }
      this.makeStyleFromJSON(
        (right - left - CONSTANTS.PIXEL * 5) / CONSTANTS.PIXEL,
        this.firstChildHeight / CONSTANTS.PIXEL - 2,
        this.secondChildHeight / CONSTANTS.PIXEL - 2,
      );
      this.render(Math.random());
      this.height = this.node.firstChild.getBoundingClientRect().height || this.height;
      this.setConnectionPosition();
    }
  };

  setArgsPosition = (node, positionX) => {
    if (node.tagName === 'g') {
      node.setAttribute('transform', `translate(${positionX},${this.style === 'condition' || this.style === 'variable' ? 0 : CONSTANTS.PIXEL + 1})`);
    } else if (node.tagName !== 'foreignObject') {
      node.setAttribute('transform', `translate(${this.style === 'condition' || this.style === 'variable' ? positionX - 4 : positionX},
        ${this.style === 'condition' || this.style === 'variable' ? 16 : 23})`);
    } else if (node.tagName === 'foreignObject') {
      if (this.args.includes('dropdown')) {
        node.setAttribute('x', `${this.style === 'condition' || this.style === 'variable' ? positionX + 3 : positionX + 5}`);
        node.setAttribute('y', `${this.style === 'condition' || this.style === 'variable' ? -3 : 8}`);
      } else {
        node.setAttribute('x', `${this.style === 'condition' || this.style === 'variable' ? positionX : positionX + 5}`);
        node.setAttribute('y', `${this.style === 'condition' || this.style === 'variable' ? 1 : 8}`);
      }
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

    if (this.firstChildConnection) {
      this.firstChildConnection = new Connection(
        CONSTANTS.NEXT_CONNECTION,
        this, 'firstChildPosition',
      );
      this.firstChildConnection.setPositions();
    }

    if (this.inputConnection) {
      this.inputConnection = [];
      this.inputX.forEach((x) => {
        const connection = new Connection(
          CONSTANTS.INPUT_CONNECITON,
          this, 'inputPosition',
        );
        connection.setPositions(x);
        this.inputConnection.push(connection);
      });
    }

    if (this.outputConnection) {
      this.outputConnection = new Connection(
        CONSTANTS.OUTPUT_CONNECTION,
        this, 'outputPosition',
      );
      this.outputConnection.setPositions();
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
    this.arithmeticOrCompare();
    this.setArgs();
  };

  changeDropdownWidth = ({ set, index, items, foreignObject }) => (event) => {
    const { target } = event;
    this.value = target.value;
    this.inputElement[index].value = target.value;
    set(target.value);
    if (typeof items[target.value] === 'string' && foreignObject) {
      const { lastChild } = foreignObject;
      lastChild.innerHTML = items[target.value];
      for (let i = 0; i < items[target.value].length / 3; i += 1) {
        this.inputWidth[index] = lastChild.clientWidth + CONSTANTS.PIXEL * 4;
        foreignObject.style.width = `${this.inputWidth[index]}px`;
      }
      this.setArgs();
    }
    if (this.outputElement) {
      this.callOutputElement(true);
    }
  }

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
    this.arithmeticOrCompare(false);

    if (json.previousConnection) {
      this.previousConnection = true;
    }

    if (json.nextConnection) {
      this.nextConnection = true;
    }

    if (json.firstChildConnection) {
      this.firstChildConnection = true;
    }

    if (json.inputConnection) {
      this.inputConnection = true;
    }

    if (json.outputConnection) {
      this.outputConnection = true;
    }

    if (!this.workspace.getBlockById(this.id)) {
      this.workspace.blockDB[this.id] = this;
    }
  };

  makeArgsFromJSON = (json) => {
    if (json.type === 'text') {
      this.args.push(create(json.type, { key: json.value }, json.value));
    } else {
      this.inputElement.push({ type: json.type, value: json.value });
      this.args.push(json.type);
      if (json.type === 'dropdown') {
        this.inputWidth[this.inputElement.length - 1] = CONSTANTS.DEFAULT_DROPDOWN_WIDTH;
        this.value = json.value;
      }
    }
  };

  makeStyleFromJSON = (width, height, secondHeight) => {
    if (width < 0) return;
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

    if (this.firstChildElement) {
      this.firstChildElement.setDrag(isDragged);
    }

    if (this.secondChildElement) {
      this.secondChildElement.setDrag(isDragged);
    }

    this.inputElement.forEach((input) => {
      if (input.type === 'block') {
        this.workspace.getBlockById(input.id).setDrag(isDragged);
      }
    });
  };

  getAvailableConnection = (isDragged = false) => {
    const availableConnection = [];

    if (this.previousConnection && this.parentElement === null && this.previousElement === null) {
      availableConnection.push(this.previousConnection);
    }

    if (this.nextConnection) {
      const nextConn = this.getLastBlock(isDragged).nextConnection;
      if (nextConn) availableConnection.push(nextConn);
    }

    if (this.firstChildConnection && !isDragged) {
      availableConnection.push(this.firstChildConnection);
    }

    if (this.inputConnection && !isDragged) {
      this.inputConnection.forEach((connection) => {
        availableConnection.push(connection);
      });
    }

    if (this.outputConnection && (this.outputElement === null)) {
      availableConnection.push(this.outputConnection);
    }

    return availableConnection;
  };

  setNextElementPosition = () => {
    this.inputElement.forEach((input, idx) => {
      if (input.type === 'block') {
        this.workspace.getBlockById(input.id).x = this.x + this.inputX[idx];
        if (this.style === 'condition' || this.style === 'variable') { this.workspace.getBlockById(input.id).y = this.y; } else { this.workspace.getBlockById(input.id).y = this.y + CONSTANTS.PIXEL + 1; }
        this.workspace.getBlockById(input.id).setNextElementPosition();
      }
    });
    if (this.firstChildElement) {
      this.setFirstChildPosition();
      if (this.firstChildElement.node.getBoundingClientRect().height) {
        this.firstChildHeight = (this.firstChildElement.node.getBoundingClientRect().height
        - CONSTANTS.PIXEL);
      }
    }
    if (this.nextElement) {
      this.nextElement.y = this.y + this.height - CONSTANTS.PIXEL;
      this.nextElement.x = this.x;
      this.nextElement.setNextElementPosition();
    }
    this.setArgs();
  };

  setFirstChildPosition = () => {
    this.firstChildElement.y = this.y + CONSTANTS.BLOCK_HEAD_HEIGHT;
    this.firstChildElement.x = this.x + CONSTANTS.PREVIOUS_NEXT_POS_X;
    this.firstChildElement.setNextElementPosition();
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

  setFirstChildElement = (firstChildElement) => {
    this.firstChildElement = firstChildElement;
  }

  setSecondChildElement = (secondChildElement) => {
    this.secondChildElement = secondChildElement;
  }

  connectBlock = (type, conn) => {
    switch (type) {
      case 'nextPosition':
        Utils.arrayRemove(this.workspace.topblocks, conn.source);
        conn.source.setpreviousElement(this);
        this.setNextElement(conn.source);
        break;
      case 'previousPosition':
        if (conn.positiontype === 'nextPosition') {
          let prev = conn.source;
          while (prev.previousElement !== null) {
            prev = prev.previousElement;
          }
          if (prev.parentElement) {
            prev.parentElement.firstChildHeight
            += this.node.getBoundingClientRect().height - CONSTANTS.PIXEL;
          }
          if (conn.source.nextElement) {
            const lastBlock = this.getLastBlock(true);
            conn.source.nextElement.setpreviousElement(lastBlock);
            lastBlock.setNextElement(conn.source.nextElement);
          }
          this.previousElement = conn.source;
          conn.source.setNextElement(this);
        } else if (conn.positiontype === 'firstChildPosition') {
          if (conn.source.firstChildElement) {
            const lastBlock = this.getLastBlock(true);
            conn.source.firstChildElement.setpreviousElement(lastBlock);
            conn.source.firstChildElement.parentElement = null;
            lastBlock.setNextElement(conn.source.firstChildElement);
          }
          this.parentElement = conn.source;
          conn.source.setFirstChildElement(this);
        }
        break;
      case 'outputPosition':
      { const inputElement = conn.source.inputElement[conn.source.inputConnection.indexOf(conn)];
        if (inputElement.type === 'block') {
          const connectedBlock = this.workspace.getBlockById(inputElement.id);
          connectedBlock.disconnectBlock();
          connectedBlock.x += 5;
          connectedBlock.y += 5;
          this.workspace.addTopblock(connectedBlock);
        }
        if (conn.source.inputConnection.indexOf(conn)) {
          conn.source.args[conn.source.args.lastIndexOf('input')] = 'block';
        } else {
          conn.source.args[conn.source.args.indexOf('input')] = 'block';
        }
        inputElement.type = 'block';
        inputElement.id = this.id;
        inputElement.value = this.value;
        this.outputElement = conn.source;
        this.outputElement.arithmeticOrCompare();
        break; }
      case 'firstChildPosition':
        break;
      default:
        throw new Error('잘못된 커넥션 타입입니다.');
    }
  };

  disconnectBlock = () => {
    if (this.previousElement) {
      let prev = this.previousElement;
      while (prev.previousElement !== null) {
        prev = prev.previousElement;
      }
      if (prev.parentElement) {
        prev.parentElement.firstChildHeight
        -= this.node.getBoundingClientRect().height - CONSTANTS.PIXEL;
      }
      this.previousElement.nextElement = null;
      this.previousElement = null;
    }
    if (this.parentElement) {
      if (this.parentElement.firstChildElement === this) {
        this.parentElement.firstChildHeight
        -= this.node.getBoundingClientRect().height - CONSTANTS.PIXEL;
        this.parentElement.firstChildElement = null;
        this.parentElement = null;
      } else if (this.parentElement.secondChildElement === this) {
        this.parentElement.secondChildElement = null;
        this.parentElement = null;
      }
    }
    if (this.outputElement) {
      this.outputElement.inputElement.forEach((input, idx) => {
        if (input.id === this.id) {
          input.id = null;
          input.value = 0;
          input.type = 'input';
          if (idx) {
            this.outputElement.args[this.outputElement.args.lastIndexOf('block')] = 'input';
          } else {
            this.outputElement.args[this.outputElement.args.indexOf('block')] = 'input';
          }
        }
      });
      this.outputElement.arithmeticOrCompare(false);
      this.outputElement = null;
    }
  };

  setAllBlockPosition = () => {
    this.setNextElementPosition();
  }

  arithmetic = (doRender) => {
    let value;
    switch (this.type) {
      case 'operator_plus':
        value = Number(this.inputElement[0].value) + Number(this.inputElement[1].value);
        break;
      case 'operator_minus':
        value = Number(this.inputElement[0].value) - Number(this.inputElement[1].value);
        break;
      case 'operator_multiply':
        value = Number(this.inputElement[0].value) * Number(this.inputElement[1].value);
        break;
      case 'operator_division':
        value = Number(this.inputElement[0].value) / Number(this.inputElement[1].value);
        if (Number.isNaN(value)) value = 0;
        else if (value === Infinity) value = 0;
        break;
      default:
        break;
    }
    this.value = value;
    if (this.outputElement) {
      this.callOutputElement(doRender);
    }
  }

  compare = (doRender) => {
    let value;
    switch (this.type) {
      case 'operator_gt':
        value = Number(this.inputElement[0].value) > Number(this.inputElement[1].value);
        break;
      case 'operator_lt':
        value = Number(this.inputElement[0].value) < Number(this.inputElement[1].value);
        break;
      case 'operator_eq':
        value = Number(this.inputElement[0].value) === Number(this.inputElement[1].value);
        break;
      case 'operator_ne':
        value = Number(this.inputElement[0].value) !== Number(this.inputElement[1].value);
        break;
      case 'sense_collision':
        // eslint-disable-next-line prefer-destructuring
        value = this.inputElement[0].value;
        break;
      default:
        break;
    }
    this.value = value;
    if (this.outputElement) {
      this.callOutputElement(doRender);
    }
  }

  callOutputElement = (doRender) => {
    this.outputElement.inputElement.forEach((input) => {
      if (input.id === this.id) {
        input.value = this.value;
      }
    });
    this.outputElement.arithmeticOrCompare(doRender);
    if (doRender) { this.outputElement.setArgs(); }
  }

  arithmeticOrCompare = (doRender = true) => {
    if (this.style === 'variable') { this.arithmetic(doRender); } else if (this.style === 'condition') { this.compare(doRender); }
  }
};

export default Block;
