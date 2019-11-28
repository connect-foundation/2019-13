import React from 'react';
import Path from './Path';
import Utils from '../../utils/utils';
import Constants from './constants';

const create = React.createElement;
const setArgsPosition = (childnode, positionX) => {
  if (childnode.tagName !== 'foreignObject') {
    childnode.setAttribute('transform', `translate(${positionX},23)`);
  } else {
    childnode.setAttribute('transform', `translate(${positionX + 3},5)`);
  }
  return childnode;
};
const BlockModel = class {
  constructor(usedId) {
    this.id = usedId;
    this.type = '';
    this.style = '';
    this.x = 0;
    this.y = 0;
    this.args = [];
    this.color = '';
    this.strokeColor = '';
    this.path = null;
    this.node = null;
    this.render = null;
    this.allIdx = -1;
    this.styleIdx = -1;
  }

  setNode(node) {
    this.node = node;
    this.setArgs();
  }

  setArgs() {
    if (this.node) {
      let positionX = Constants.PIXEL;
      let lastChild;
      this.node.childNodes.forEach((node) => {
        if (node.tagName !== 'path' && node.tagName !== 'g') {
          setArgsPosition(node, positionX);
          positionX += node.getBoundingClientRect().width;
          lastChild = node;
        }
      });
      this.makeStyleFromJSON(
        (lastChild.getBoundingClientRect().right
          - this.node.getBoundingClientRect().left
          - Constants.PIXEL * 5)
          / Constants.PIXEL,
      );
      this.render(Math.random());
    }
  }


  changeInputWidth(event) {
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
  }

  makeFromJSON(json) {
    this.type = json.type;
    this.color = json.color;
    this.strokeColor = json.stroke_color;
    this.x = json.x ? json.x : 0;
    this.y = json.y ? json.y : 0;
    this.allIdx = json.allIdx === 0 || Number(json.allIdx)
      ? json.allIdx
      : -1;
    this.styleIdx = json.styleIdx === 0 || Number(json.styleIdx)
      ? json.styleIdx
      : -1;

    if (!this.id) {
      this.id = Utils.uid();
    }

    json.args.forEach((arg) => {
      this.makeArgsFromJSON(arg);
    });

    this.style = json.style;
    this.makeStyleFromJSON();
    return this;
  }

  makeArgsFromJSON(json) {
    if (json.type === 'text') {
      this.args.push(create(json.type, { key: json.value }, json.value));
    } else if (json.type === 'input') {
      this.args.push(
        create(
          'foreignObject',
          { key: 'foreign' },
          create(
            json.type,
            { key: json.value, onChange: this.changeInputWidth.bind(this), value: json.value },
            null,
          ),
          create(
            'div',
            {
              key: 'hiddenText',
              style: {
                position: 'absolute',
                visibility: 'hidden',
                fontSize: '0.5rem',
              },
            },
            null,
          ),
        ),
      );
    }
  }

  makeStyleFromJSON(width, height, secondHeight) {
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
  }
};
export default BlockModel;
