/**
 Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix: number[][]): void {
  const XLength = matrix.length;
  const YLength = matrix[0].length;
  const MaxYLevel = Math.ceil(YLength / 2 - 1);
  console.log("↓↓↓↓---old---↓↓↓↓");
  printIt(matrix);
  for (let level = 0; level <= MaxYLevel; level = level + 1) {
    let levelXLength = XLength - level * 2 - 1;
    const MaxXLevel = Math.ceil(levelXLength / 2);
    for (let xOffset = 0; xOffset <= MaxXLevel; xOffset = xOffset + 1) {
      let P00Item_X = xOffset + level;
      let P00Item_Y = level;

      let PX0Item_X = levelXLength + level;
      let PX0Item_Y = level + xOffset;

      let PXXItem_X = levelXLength + level - xOffset;
      let PXXItem_Y = levelXLength + level;

      let P0XItem_X = level;
      let P0XItem_Y = levelXLength + level - xOffset;

      // matrix是先Y后X
      let P00Item = matrix[P00Item_Y][P00Item_X];
      let PX0Item = matrix[PX0Item_Y][PX0Item_X];
      let PXXItem = matrix[PXXItem_Y][PXXItem_X];
      let P0XItem = matrix[P0XItem_Y][P0XItem_X];

      matrix[P00Item_Y][P00Item_X] = P0XItem;
      matrix[PX0Item_Y][PX0Item_X] = P00Item;
      matrix[PXXItem_Y][PXXItem_X] = PX0Item;
      matrix[P0XItem_Y][P0XItem_X] = PXXItem;

      console.log("↓↓↓↓---new---↓↓↓↓");
      printIt(matrix);
    }
  }
}
function printIt(input: any[][]) {
  let result = "";
  for (let item of input) {
    result += item.join(",") + "\n";
  }
  console.log(result);
}

function test() {
  function generateIt(length: number) {
    let result = [];
    let index = 1;
    for (let i = 0; i < length; i++) {
      let item = [];
      for (let j = 0; j < length; j++) {
        item.push(index);
        index++;
      }
      result.push(item);
    }
    return result;
  }
  let input = generateIt(4);

  rotate(input);
  printIt(input);
}

test();
