let computeArea = function (point1, point2) {
  return (point1.y + point2.y) * Math.abs(point1.x  - point2.x) / 2
}

let transferInput2List = function(input_list){
  let index = 0;
  let point_list = [];
  for(;index < input_list.length; index++){
    let point = {
      x:index,
      y:input_list[index]
    }
    point_list.push(point)
  }
  return point_list
}


let maxArea = function(height) {
  let point_list = transferInput2List(height)
  let maxContainer = 0
  let firstIndex = 0
  let nextIndex = 1
  while(firstIndex < point_list.length){
    while (nextIndex < point_list.length){
      let container = computeArea(point_list[firstIndex], point_list[nextIndex])
      if(container > maxContainer){
        maxContainer = container
      }
      nextIndex++
    }
    firstIndex++
    nextIndex = firstIndex + 1
  }
  return maxContainer
};