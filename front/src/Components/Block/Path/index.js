const pixel = 6;

const path = {
  single: (width = 14) => `M ${pixel},0 
    l 0,0 ${pixel * 1},0 
    0,0 ${pixel * 1},${pixel * 1}
    0,0 ${pixel * 2},0 
    0,0 ${pixel * 1},-${pixel * 1}
    0,0 ${pixel * (width - 1)},0 
    c ${pixel},0 ${pixel},0 ${pixel},${pixel}
    l 0,0 0,${pixel * 4}
    c 0,${pixel} 0,${pixel} -${pixel},${pixel}
    l 0,0 -${pixel * (width - 1)},0 
    0,0 -${pixel * 1},${pixel * 1}
    0,0 -${pixel * 2},0 
    0,0 -${pixel * 1},-${pixel * 1}
    0,0 -${pixel * 1},0
    c -${pixel},0 -${pixel},0 -${pixel},-${pixel} 
    l 0,0 0,-${pixel * 4}
    c 0,-${pixel} 0,-${pixel} ${pixel},-${pixel}`,

  double: (width = 14, height = 2) => `M ${pixel},0 
    l 0,0 ${pixel * 1},0 
    0,0 ${pixel * 1},${pixel * 1}
    0,0 ${pixel * 2},0 
    0,0 ${pixel * 1},-${pixel * 1}
    0,0 ${pixel * (width - 1 + 4)},0 
    c ${pixel},0 ${pixel},0 ${pixel},${pixel}
    l 0,0 0,${pixel * 4}
    c 0,${pixel} 0,${pixel} -${pixel},${pixel}
    l 0,0 -${pixel * (width - 1)},0 
    0,0 -${pixel * 1},${pixel * 1}
    0,0 -${pixel * 2},0 
    0,0 -${pixel * 1},-${pixel * 1}
    0,0 -${pixel * 1},0
    c -${pixel},0 -${pixel},0 -${pixel},${pixel}
    l 0,0 0,${pixel * height}
    c 0,${pixel} 0,${pixel} ${pixel},${pixel}
    l 0,0 ${pixel * 1},0
    0,0 ${pixel * 1},${pixel * 1}
    0,0 ${pixel * 2},0 
    0,0 ${pixel * 1},-${pixel * 1}
    0,0 ${pixel * (width - 1)},0
    c ${pixel},0 ${pixel},0 ${pixel},${pixel}
    l 0,0 0,${pixel * 3}
    c 0,${pixel} 0,${pixel} -${pixel},${pixel}
    l 0,0 -${pixel * (width - 1 + 4)},0 
    0,0 -${pixel * 1},${pixel * 1}
    0,0 -${pixel * 2},0 
    0,0 -${pixel * 1},-${pixel * 1}
    0,0 -${pixel * 1},0
    c -${pixel},0 -${pixel},0 -${pixel},-${pixel}
    l 0,0 0,-${pixel * 4}
    0,0 0,-${pixel * (height + 2)}
    0,0 0,-${pixel * 5}
    c 0,-${pixel} 0,-${pixel} ${pixel},-${pixel}`,

  triple: (width = 14, firstHeight = 2, secondHeight = 2) => `M ${pixel},0 
    l 0,0 ${pixel * 1},0 
    0,0 ${pixel * 1},${pixel * 1}
    0,0 ${pixel * 2},0 
    0,0 ${pixel * 1},-${pixel * 1}
    0,0 ${pixel * (width - 1 + 4)},0 
    c ${pixel},0 ${pixel},0 ${pixel},${pixel}
    l 0,0 0,${pixel * 4}
    c 0,${pixel} 0,${pixel} -${pixel},${pixel}
    l 0,0 -${pixel * (width - 1)},0 
    0,0 -${pixel * 1},${pixel * 1}
    0,0 -${pixel * 2},0 
    0,0 -${pixel * 1},-${pixel * 1}
    0,0 -${pixel * 1},0
    c -${pixel},0 -${pixel},0 -${pixel},${pixel}
    l 0,0 0,${pixel * firstHeight}
    c 0,${pixel} 0,${pixel} ${pixel},${pixel}
    l 0,0 ${pixel * 1},0
    0,0 ${pixel * 1},${pixel * 1}
    0,0 ${pixel * 2},0 
    0,0 ${pixel * 1},-${pixel * 1}
    0,0 ${pixel * (width - 1)},0
    c ${pixel},0 ${pixel},0 ${pixel},${pixel}
    l 0,0 0,${pixel * 3}
    c 0,${pixel} 0,${pixel} -${pixel},${pixel}
    l 0,0 -${pixel * (width - 1)},0 
    0,0 -${pixel * 1},${pixel * 1}
    0,0 -${pixel * 2},0 
    0,0 -${pixel * 1},-${pixel * 1}
    0,0 -${pixel * 1},0
    c -${pixel},0 -${pixel},0 -${pixel},${pixel}
    l 0,0 0,${pixel * secondHeight}
    c 0,${pixel} 0,${pixel} ${pixel},${pixel}
    l 0,0 ${pixel * 1},0
    0,0 ${pixel * 1},${pixel * 1}
    0,0 ${pixel * 2},0 
    0,0 ${pixel * 1},-${pixel * 1}
    0,0 ${pixel * (width - 1)},0
    c ${pixel},0 ${pixel},0 ${pixel},${pixel}
    l 0,0 0,${pixel * 3}
    c 0,${pixel} 0,${pixel} -${pixel},${pixel}
    l 0,0 -${pixel * (width - 1 + 4)},0 
    0,0 -${pixel * 1},${pixel * 1}
    0,0 -${pixel * 2},0 
    0,0 -${pixel * 1},-${pixel * 1}
    0,0 -${pixel * 1},0
    c -${pixel},0 -${pixel},0 -${pixel},-${pixel} 
    l 0,0 0,-${pixel * 4}
    0,0 0,-${pixel * (secondHeight + 2)}
    0,0 0,-${pixel * 5}
    0,0 0,-${pixel * (firstHeight + 2)}
    0,0 0,-${pixel * 5}
    c 0,-${pixel} 0,-${pixel} ${pixel},-${pixel}`,

  event: (width = 5) => `M 0,${pixel * 3} 
    c ${pixel * 6},-${pixel * 4} ${pixel * 14},-${pixel * 4} ${pixel * 20},0
    l 0,0 ${pixel * (width - 1)},0
    c ${pixel},0 ${pixel},0 ${pixel},${pixel}
    l 0,0 0,${pixel * 4}
    c 0,${pixel} 0,${pixel} -${pixel},${pixel}
    l 0,0 -${pixel * (width - 1 + 8)},0
    0,0 -${pixel * 2},${pixel * 2}
    0,0 -${pixel * 4},0 
    0,0 -${pixel * 2},-${pixel * 2}
    0,0 -${pixel * 3},0
    c -${pixel},0 -${pixel},0 -${pixel},-${pixel} 
    l 0,0 0,-${pixel * 5}`,

  condition: (width = 5) => `M ${pixel * 2}, 0
    l 0,0 ${pixel * width},0
    0,0 ${pixel * 2},${pixel * 2}
    0,0 -${pixel * 2},${pixel * 2}
    0,0 -${pixel * width},0
    0,0 -${pixel * 2},-${pixel * 2}
    0,0 ${pixel * 2},-${pixel * 2}`,

  variable: (width = 2) => `M ${pixel * 3},0
    l 0,0 ${pixel * width},0
    c ${pixel * 4},0 ${pixel * 4},${pixel * 4} 0,${pixel * 4}
    l 0,0 -${pixel * width},0
    c -${pixel * 4},0 -${pixel * 4},-${pixel * 4} 0,-${pixel * 4}`,
};

export default path;
