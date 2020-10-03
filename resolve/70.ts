function climbStairs(n: number): number {
  let answerMap: Map<number, number> = new Map();
  answerMap.set(1, 1);
  answerMap.set(2, 2);
  answerMap.set(3, 3);
  function getStep(currentLevel: number): number {
    if (currentLevel <= 0) {
      return 0;
    }
    if (answerMap.has(currentLevel)) {
      return answerMap.get(currentLevel) as number;
    }
    // 分为两种情况: 一次上一级/一次上两级
    let needStep = getStep(currentLevel - 1) + getStep(currentLevel - 2);
    answerMap.set(currentLevel, needStep);
    return needStep;
  }
  return getStep(n);
}

let result70 = climbStairs(10);
console.log("result =>", result70);
