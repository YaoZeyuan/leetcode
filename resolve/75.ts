/**
 Do not return anything, modify nums in-place instead.
 */
function sortColors(nums: number[]): void {
  let counter_0 = 0;
  let counter_1 = 0;
  let counter_2 = 0;
  for (let num of nums) {
    switch (num) {
      case 0:
        counter_0++;
        break;
      case 1:
        counter_1++;
        break;
      case 2:
        counter_2++;
        break;
    }
  }
  let index = 0;
  while (counter_0 > 0) {
    nums[index] = 0;
    index++;
    counter_0--;
  }
  while (counter_1 > 0) {
    nums[index] = 1;
    index++;
    counter_1--;
  }
  while (counter_2 > 0) {
    nums[index] = 2;
    index++;
    counter_2--;
  }
  return;
}
