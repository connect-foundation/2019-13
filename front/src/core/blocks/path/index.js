import CONSTANTS from '../constants';

const path = {
  single: (width = 14) => `M ${CONSTANTS.PIXEL},0 
    l 0,0 ${CONSTANTS.PIXEL * 1},0 
    0,0 ${CONSTANTS.PIXEL * 1},${CONSTANTS.PIXEL * 1}
    0,0 ${CONSTANTS.PIXEL * 2},0 
    0,0 ${CONSTANTS.PIXEL * 1},-${CONSTANTS.PIXEL * 1}
    0,0 ${CONSTANTS.PIXEL * (width - 1)},0 
    c ${CONSTANTS.PIXEL},0 ${CONSTANTS.PIXEL},0 ${CONSTANTS.PIXEL},${CONSTANTS.PIXEL}
    l 0,0 0,${CONSTANTS.PIXEL * 4}
    c 0,${CONSTANTS.PIXEL} 0,${CONSTANTS.PIXEL} -${CONSTANTS.PIXEL},${CONSTANTS.PIXEL}
    l 0,0 -${CONSTANTS.PIXEL * (width - 1)},0 
    0,0 -${CONSTANTS.PIXEL * 1},${CONSTANTS.PIXEL * 1}
    0,0 -${CONSTANTS.PIXEL * 2},0 
    0,0 -${CONSTANTS.PIXEL * 1},-${CONSTANTS.PIXEL * 1}
    0,0 -${CONSTANTS.PIXEL * 1},0
    c -${CONSTANTS.PIXEL},0 -${CONSTANTS.PIXEL},0 -${CONSTANTS.PIXEL},-${CONSTANTS.PIXEL} 
    l 0,0 0,-${CONSTANTS.PIXEL * 4}
    c 0,-${CONSTANTS.PIXEL} 0,-${CONSTANTS.PIXEL} ${CONSTANTS.PIXEL},-${CONSTANTS.PIXEL}`,

  double: (width = 14, height = 2) => `M ${CONSTANTS.PIXEL},0 
    l 0,0 ${CONSTANTS.PIXEL * 1},0 
    0,0 ${CONSTANTS.PIXEL * 1},${CONSTANTS.PIXEL * 1}
    0,0 ${CONSTANTS.PIXEL * 2},0 
    0,0 ${CONSTANTS.PIXEL * 1},-${CONSTANTS.PIXEL * 1}
    0,0 ${CONSTANTS.PIXEL * (width - 5 + 4)},0 
    c ${CONSTANTS.PIXEL},0 ${CONSTANTS.PIXEL},0 ${CONSTANTS.PIXEL},${CONSTANTS.PIXEL}
    l 0,0 0,${CONSTANTS.PIXEL * 4}
    c 0,${CONSTANTS.PIXEL} 0,${CONSTANTS.PIXEL} -${CONSTANTS.PIXEL},${CONSTANTS.PIXEL}
    l 0,0 -${CONSTANTS.PIXEL * (width - 5)},0 
    0,0 -${CONSTANTS.PIXEL * 1},${CONSTANTS.PIXEL * 1}
    0,0 -${CONSTANTS.PIXEL * 2},0 
    0,0 -${CONSTANTS.PIXEL * 1},-${CONSTANTS.PIXEL * 1}
    0,0 -${CONSTANTS.PIXEL * 1},0
    c -${CONSTANTS.PIXEL},0 -${CONSTANTS.PIXEL},0 -${CONSTANTS.PIXEL},${CONSTANTS.PIXEL}
    l 0,0 0,${CONSTANTS.PIXEL * height}
    c 0,${CONSTANTS.PIXEL} 0,${CONSTANTS.PIXEL} ${CONSTANTS.PIXEL},${CONSTANTS.PIXEL}
    l 0,0 ${CONSTANTS.PIXEL * 1},0
    0,0 ${CONSTANTS.PIXEL * 1},${CONSTANTS.PIXEL * 1}
    0,0 ${CONSTANTS.PIXEL * 2},0 
    0,0 ${CONSTANTS.PIXEL * 1},-${CONSTANTS.PIXEL * 1}
    0,0 ${CONSTANTS.PIXEL * (width - 5)},0
    c ${CONSTANTS.PIXEL},0 ${CONSTANTS.PIXEL},0 ${CONSTANTS.PIXEL},${CONSTANTS.PIXEL}
    l 0,0 0,${CONSTANTS.PIXEL * 3}
    c 0,${CONSTANTS.PIXEL} 0,${CONSTANTS.PIXEL} -${CONSTANTS.PIXEL},${CONSTANTS.PIXEL}
    l 0,0 -${CONSTANTS.PIXEL * (width - 5 + 4)},0 
    0,0 -${CONSTANTS.PIXEL * 1},${CONSTANTS.PIXEL * 1}
    0,0 -${CONSTANTS.PIXEL * 2},0 
    0,0 -${CONSTANTS.PIXEL * 1},-${CONSTANTS.PIXEL * 1}
    0,0 -${CONSTANTS.PIXEL * 1},0
    c -${CONSTANTS.PIXEL},0 -${CONSTANTS.PIXEL},0 -${CONSTANTS.PIXEL},-${CONSTANTS.PIXEL}
    l 0,0 0,-${CONSTANTS.PIXEL * 4}
    0,0 0,-${CONSTANTS.PIXEL * (height + 2)}
    0,0 0,-${CONSTANTS.PIXEL * 5}
    c 0,-${CONSTANTS.PIXEL} 0,-${CONSTANTS.PIXEL} ${CONSTANTS.PIXEL},-${CONSTANTS.PIXEL}`,

  triple: (width = 14, firstHeight = 2, secondHeight = 2) => `M ${CONSTANTS.PIXEL},0 
    l 0,0 ${CONSTANTS.PIXEL * 1},0 
    0,0 ${CONSTANTS.PIXEL * 1},${CONSTANTS.PIXEL * 1}
    0,0 ${CONSTANTS.PIXEL * 2},0 
    0,0 ${CONSTANTS.PIXEL * 1},-${CONSTANTS.PIXEL * 1}
    0,0 ${CONSTANTS.PIXEL * (width - 5 + 4)},0 
    c ${CONSTANTS.PIXEL},0 ${CONSTANTS.PIXEL},0 ${CONSTANTS.PIXEL},${CONSTANTS.PIXEL}
    l 0,0 0,${CONSTANTS.PIXEL * 4}
    c 0,${CONSTANTS.PIXEL} 0,${CONSTANTS.PIXEL} -${CONSTANTS.PIXEL},${CONSTANTS.PIXEL}
    l 0,0 -${CONSTANTS.PIXEL * (width - 5)},0 
    0,0 -${CONSTANTS.PIXEL * 1},${CONSTANTS.PIXEL * 1}
    0,0 -${CONSTANTS.PIXEL * 2},0 
    0,0 -${CONSTANTS.PIXEL * 1},-${CONSTANTS.PIXEL * 1}
    0,0 -${CONSTANTS.PIXEL * 1},0
    c -${CONSTANTS.PIXEL},0 -${CONSTANTS.PIXEL},0 -${CONSTANTS.PIXEL},${CONSTANTS.PIXEL}
    l 0,0 0,${CONSTANTS.PIXEL * firstHeight}
    c 0,${CONSTANTS.PIXEL} 0,${CONSTANTS.PIXEL} ${CONSTANTS.PIXEL},${CONSTANTS.PIXEL}
    l 0,0 ${CONSTANTS.PIXEL * 1},0
    0,0 ${CONSTANTS.PIXEL * 1},${CONSTANTS.PIXEL * 1}
    0,0 ${CONSTANTS.PIXEL * 2},0 
    0,0 ${CONSTANTS.PIXEL * 1},-${CONSTANTS.PIXEL * 1}
    0,0 ${CONSTANTS.PIXEL * (width - 5)},0
    c ${CONSTANTS.PIXEL},0 ${CONSTANTS.PIXEL},0 ${CONSTANTS.PIXEL},${CONSTANTS.PIXEL}
    l 0,0 0,${CONSTANTS.PIXEL * 3}
    c 0,${CONSTANTS.PIXEL} 0,${CONSTANTS.PIXEL} -${CONSTANTS.PIXEL},${CONSTANTS.PIXEL}
    l 0,0 -${CONSTANTS.PIXEL * (width - 5)},0 
    0,0 -${CONSTANTS.PIXEL * 1},${CONSTANTS.PIXEL * 1}
    0,0 -${CONSTANTS.PIXEL * 2},0 
    0,0 -${CONSTANTS.PIXEL * 1},-${CONSTANTS.PIXEL * 1}
    0,0 -${CONSTANTS.PIXEL * 1},0
    c -${CONSTANTS.PIXEL},0 -${CONSTANTS.PIXEL},0 -${CONSTANTS.PIXEL},${CONSTANTS.PIXEL}
    l 0,0 0,${CONSTANTS.PIXEL * secondHeight}
    c 0,${CONSTANTS.PIXEL} 0,${CONSTANTS.PIXEL} ${CONSTANTS.PIXEL},${CONSTANTS.PIXEL}
    l 0,0 ${CONSTANTS.PIXEL * 1},0
    0,0 ${CONSTANTS.PIXEL * 1},${CONSTANTS.PIXEL * 1}
    0,0 ${CONSTANTS.PIXEL * 2},0 
    0,0 ${CONSTANTS.PIXEL * 1},-${CONSTANTS.PIXEL * 1}
    0,0 ${CONSTANTS.PIXEL * (width - 5)},0
    c ${CONSTANTS.PIXEL},0 ${CONSTANTS.PIXEL},0 ${CONSTANTS.PIXEL},${CONSTANTS.PIXEL}
    l 0,0 0,${CONSTANTS.PIXEL * 3}
    c 0,${CONSTANTS.PIXEL} 0,${CONSTANTS.PIXEL} -${CONSTANTS.PIXEL},${CONSTANTS.PIXEL}
    l 0,0 -${CONSTANTS.PIXEL * (width - 5 + 4)},0 
    0,0 -${CONSTANTS.PIXEL * 1},${CONSTANTS.PIXEL * 1}
    0,0 -${CONSTANTS.PIXEL * 2},0 
    0,0 -${CONSTANTS.PIXEL * 1},-${CONSTANTS.PIXEL * 1}
    0,0 -${CONSTANTS.PIXEL * 1},0
    c -${CONSTANTS.PIXEL},0 -${CONSTANTS.PIXEL},0 -${CONSTANTS.PIXEL},-${CONSTANTS.PIXEL} 
    l 0,0 0,-${CONSTANTS.PIXEL * 4}
    0,0 0,-${CONSTANTS.PIXEL * (secondHeight + 2)}
    0,0 0,-${CONSTANTS.PIXEL * 5}
    0,0 0,-${CONSTANTS.PIXEL * (firstHeight + 2)}
    0,0 0,-${CONSTANTS.PIXEL * 5}
    c 0,-${CONSTANTS.PIXEL} 0,-${CONSTANTS.PIXEL} ${CONSTANTS.PIXEL},-${CONSTANTS.PIXEL}`,

  event: (width = 5) => `M 0,${CONSTANTS.PIXEL * 1.5} 
    c ${CONSTANTS.PIXEL * 3},-${CONSTANTS.PIXEL * 2} ${CONSTANTS.PIXEL * 7},-${CONSTANTS.PIXEL * 2} ${CONSTANTS.PIXEL * 10},0
    l 0,0 ${CONSTANTS.PIXEL * (width - 4)},0
    c ${CONSTANTS.PIXEL},0 ${CONSTANTS.PIXEL},0 ${CONSTANTS.PIXEL},${CONSTANTS.PIXEL}
    l 0,0 0,${CONSTANTS.PIXEL * 2.5}
    c 0,${CONSTANTS.PIXEL} 0,${CONSTANTS.PIXEL} -${CONSTANTS.PIXEL},${CONSTANTS.PIXEL}
    l 0,0 -${CONSTANTS.PIXEL * (width - 4 + 4)},0
    0,0 -${CONSTANTS.PIXEL * 1},${CONSTANTS.PIXEL * 1}
    0,0 -${CONSTANTS.PIXEL * 2},0 
    0,0 -${CONSTANTS.PIXEL * 1},-${CONSTANTS.PIXEL * 1}
    0,0 -${CONSTANTS.PIXEL * 1},0
    c -${CONSTANTS.PIXEL},0 -${CONSTANTS.PIXEL},0 -${CONSTANTS.PIXEL},-${CONSTANTS.PIXEL} 
    l 0,0 0,-${CONSTANTS.PIXEL * 3.5}`,

  condition: (width = 5) => `M ${CONSTANTS.PIXEL * 2}, 0
    l 0,0 ${CONSTANTS.PIXEL * (width + 2)},0
    0,0 ${CONSTANTS.PIXEL * 2},${CONSTANTS.PIXEL * 2}
    0,0 -${CONSTANTS.PIXEL * 2},${CONSTANTS.PIXEL * 2}
    0,0 -${CONSTANTS.PIXEL * (width + 2)},0
    0,0 -${CONSTANTS.PIXEL * 2},-${CONSTANTS.PIXEL * 2}
    0,0 ${CONSTANTS.PIXEL * 2},-${CONSTANTS.PIXEL * 2}`,

  variable: (width = 5) => `M ${CONSTANTS.PIXEL * 2.25},0
    l 0,0 ${CONSTANTS.PIXEL * (width + 1.5)},0
    c ${CONSTANTS.PIXEL * 3},0 ${CONSTANTS.PIXEL * 3},${CONSTANTS.PIXEL * 4} 0,${CONSTANTS.PIXEL * 4}
    l 0,0 -${CONSTANTS.PIXEL * (width + 1.5)},0
    c -${CONSTANTS.PIXEL * 3},0 -${CONSTANTS.PIXEL * 3},-${CONSTANTS.PIXEL * 4} 0,-${CONSTANTS.PIXEL * 4}`,
};

export default path;