function searchMatrix(matrix: number[][], target: number): boolean {
  for (let lineIndex = 0; lineIndex < matrix.length; lineIndex++) {
    let line = matrix[lineIndex];
    if (line[0] <= target && target <= line[line.length - 1]) {
      return line.indexOf(target) !== -1;
    }
  }
  return false
}
