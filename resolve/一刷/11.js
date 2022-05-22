// 水容量应该用高度的最小值
let computeArea = function (point1, point2) {
  let min_height = Math.min(point1.y, point2.y)

  return min_height * Math.abs(point1.x - point2.x)
}

let transferInput2List = function (input_list) {
  let index = 0
  let point_list = []
  for (; index < input_list.length; index++) {
    let point = {
      x: index,
      y: input_list[index]
    }
    point_list.push(point)
  }
  return point_list
}

var maxArea = function (height) {
  let point_list = transferInput2List(height)
  let maxContainer = 0
  let firstIndex = 0
  let nextIndex = 1

  let maxPoint1Y = 0
  let maxPoint2Y = 0
  let maxPointX = 0

  while (firstIndex < point_list.length) {
    let first_point = point_list[firstIndex]
    // 新循环的起点高度比之前还小的时候, 就没必要跑了
    if (first_point.y > maxPoint1Y) {
      while (nextIndex < point_list.length) {
        let point1 = first_point
        let point2 = point_list[nextIndex]

        let container = computeArea(first_point, point_list[nextIndex])
        if (container > maxContainer) {
          maxPoint1Y = point1.y
          maxPoint2Y = point2.y
          maxPointX = Math.abs(point2.x - point1.x)
          maxContainer = container
        }
        nextIndex++
      }
    }
    firstIndex++
    nextIndex = firstIndex + 1
  }
  return maxContainer
}