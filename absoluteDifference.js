function absoluteDifference(nums) {
    let n = nums.length;
    let minAbsDiff = Infinity;

    // Try all possible ways to split the array
    for (let i = 1; i < (1 << n-1); i++) {
        let sum1 = 0;
        let sum2 = 0;
        for (let j = 0; j < n; j++) {
            if (i & (1 << j)) {
                sum1 += nums[j];
            } else {
                sum2 += nums[j];
            }
        }
        let absDiff = Math.abs(sum1 - sum2);
        if (absDiff < minAbsDiff) {
            minAbsDiff = absDiff;
        }
    }

    return minAbsDiff;
}

console.log(absoluteDifference([3,9,7,3]))
console.log(absoluteDifference([-36,36]))
console.log(absoluteDifference([2,-1,0,4,-2,-9]))

