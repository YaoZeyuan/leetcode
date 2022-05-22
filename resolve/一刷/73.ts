/**
 Do not return anything, modify matrix in-place instead.
 */
function setZeroes(matrix: number[][]): void {
  let zeroLineSet: Set<number> = new Set();
  let zeroColumnSet: Set<number> = new Set();
  let height = matrix.length;
  let width = matrix[0].length;
  function getXY(x: number, y: number) {
    return matrix[y][x];
  }
  function clearXY(x: number, y: number) {
    matrix[y][x] = 0;
    return;
  }
  // 收集xy所在行信息
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (getXY(x, y) === 0) {
        zeroColumnSet.add(x);
        zeroLineSet.add(y);
      }
    }
  }

  // 将其重置为0
  for (let x of zeroColumnSet) {
    for (let y = 0; y < height; y++) {
      clearXY(x, y);
    }
  }
  for (let y of zeroLineSet) {
    for (let x = 0; x < width; x++) {
      clearXY(x, y);
    }
  }
  return 
}
