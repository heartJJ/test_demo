
console.log(Date.now());

let nums = [2, 7, 11, 15], target = 17;
const map = new Map();
const result = [];

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  
  for (let i = 0; i < nums.length; i++) {
    const index = map.get(nums[i]);
    
    if (index >= 0) {
      result.push(i);
      result.push(index);
      break;
    }

    map.set(target - nums[i], i);
  }
};
twoSum(nums, target);

console.log(result);

console.log(Date.now());
