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
      this.makeStyleFromJSON(
        (lastChild.getBoundingClientRect().right
        - this.node.getBoundingClientRect().left
        - CONSTANTS.PIXEL * 5)
        / CONSTANTS.PIXEL,
      );
      this.render(Math.random());
      this.height = this.node.getBoundingClientRect().height;
    }
  };

  setArgsPosition = (node, positionX) => {
    if (node.tagName !== 'foreignObject') {
      node.setAttribute('transform', `translate(${positionX},23)`);
    } else {
      node.setAttribute('transform', `translate(${positionX + 3},5)`);
    }
  };

  changeInputWidth = (event) => {
    const { target } = event;
    const { length } = target.value;
    if (length > 5) {
      const { lastChild } = target.parentNode;
      lastChild.innerHTML = target.value;
      target.parentNode.style.width = `${lastChild.clientWidth}px`;
      target.style.width = `${lastChild.clientWidth}px`;
    } else {
      target.parentNode.style.width = '30px';
      target.style.width = '30px';
    }
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

    if (json.previousConnection && !this.previousConnection) {
      this.previousConnection = new Connection(
        CONSTANTS.PREVIOUS_CONNECTION,
        this, 'previousPosition',
      );
    }

    if (json.nextConnection && !this.nextConnection) {
      this.nextConnection = new Connection(CONSTANTS.NEXT_CONNECTION, this, 'nextPosition');
    }

    this.style = json.style;
    this.makeStyleFromJSON();

    if (!this.workspace.getBlockById(this.id)) {
      this.workspace.blockDB[this.id] = this;
    }
  };

  makeArgsFromJSON = (json) => {
    if (json.type === 'text') {
      this.args.push(create(json.type, { key: json.value }, json.value));
    } else if (json.type === 'input') {
      this.args.push(
        create('foreignObject', { key: 'foreign' },
          create(json.type, { key: json.value, onChange: this.changeInputWidth.bind(this) }, null),
          create('div', { key: 'hiddenText', style: { position: 'absolute', visibility: 'hidden', fontSize: '0.5rem' } }, null)),
      );
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
            strokeWidth: 0.5,
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
            strokeWidth: 0.5,
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
            strokeWidth: 0.5,
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
            strokeWidth: 0.5,
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
            strokeWidth: 0.5,
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
            strokeWidth: 0.5,
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
      this.firstchildConnection.setDrag(isDragged);
    }

    if (this.secondchildElement) {
      this.secondchildElement.setDrag(isDragged);
    }
  };

  getAvailableConnection = (isDragged = false) => {
    const availableConnection = [];

    if (this.previousConnection) {
      availableConnection.push(this.previousConnection);
    }

    if (this.nextConnection) {
      const nextConn = this.getLastBlock(isDragged).nextConnection;
      if (nextConn) availableConnection.push(nextConn);
    }

    return availableConnection;
  };

  setNextElementPosition = () => {
    if (this.nextElement) {
      this.nextElement.y = this.y + this.height - CONSTANTS.PIXEL;
      this.nextElement.x = this.x;
      this.nextElement.setNextElementPosition();
    }
  };

  setpreviousElement = (previousElement) => {
    this.previousElement = previousElement;
  };

  setNextElement = (nextElement) => {
    this.nextElement = nextElement;
  };

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
        this.setNextElementPosition();
        break;
      case 'previousPosition':
        if (conn.source.nextElement) {
          const lastBlock = this.getLastBlock(true);
          conn.source.nextElement.setpreviousElement(lastBlock);
          lastBlock.setNextElement(conn.source.nextElement);
        }
        this.previousElement = conn.source;
        conn.source.setNextElement(this);
        conn.source.setNextElementPosition();
        break;

      case 'outputPosition':
        break;

      case 'inputPosition':

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
  };
};

export default Block;
