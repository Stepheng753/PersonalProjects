

// https://leetcode.com/problems/split-array-with-same-average/
#include "splitArrSameAvg.h"

bool splitArraySameAverage(int *nums, int numsSize);
bool bruteForce(int *nums, int numsSize);

int main(int argc, char const *argv[])
{
    int valSize = 5;
    int values[] = {5, 3, 11, 19, 2};
    int *nums = createArr(values, valSize);
    printArr(nums, valSize);
    printf("\n");
    printf("SPLITABLE: %s\n", splitArraySameAverage(nums, valSize) ? "TRUE" : "FALSE");
    return 0;
}

bool splitArraySameAverage(int* nums, int numsSize)
{
    nums = selectionSort(nums, numsSize);
    if (numsSize <= 2)
        return false;

    int sumPair = nums[0] + nums[numsSize - 1];
    if (numsSize % 2 == 0)
    {
        for (int i = 1; i < (numsSize / 2); i++)
        {
            if (nums[i] + nums[numsSize - 1 - i] != sumPair)
                return false;
        }
        return true;
    }
    if (!contains(nums, numsSize, (int) sumPair / 2))
    {
        int *pairArr = malloc(((numsSize / 2) + 1) * sizeof(int));
        int pairArrIndex = 0;
        for (int i = 0; i < (numsSize / 2); i++)
        {
            pairArr[pairArrIndex++] = ((nums[i] + nums[numsSize - 1 - i]) * 10) + 2;
        }
        pairArr[pairArrIndex] = (nums[numsSize / 2] * 10) + 1;
        pairArr = selectionSort(pairArr, ((numsSize / 2) + 1));

        int attempts = 0;
        while (attempts < 2)
        {
            int sum1 = 0;
            int count1 = 0;
            int sum2 = 0;
            int count2 = 0;
            int max = -100000;
            int maxIndex = -1;
            for (int i = 0; i < (numsSize / 2) + 1; i++)
            {
                if (pairArr[i] > max)
                {
                    max = pairArr[i];
                    maxIndex = i;
                }
            }   
            for (int i = 0; i < (numsSize / 2) + 1; i++)
            {
                if (pairArr[i] == max)
                {
                    sum1 += pairArr[i] / 10;
                    count1 += 2;
                }
                else if (pairArr[i] % 2 == 1)
                {
                    sum1 += pairArr[i] / 10;
                    count1++;
                } 
                else 
                {
                    sum2 += pairArr[i] / 10;
                    count2 += 2;
                }
            }

            if ((count1 != 0 && count2 != 0) && sum1 / count1 == sum2 / count2)
            {
                return true;
            } 
            else
            {
                pairArr[maxIndex]++;
                attempts++;
            }
        }
        return bruteForce(nums, numsSize);
    }

    int *newEven = malloc((numsSize - 1) * sizeof(int));
    int newEvenIndex = 0;

    for (int i = 0; i < numsSize; i++)
    {
        if (nums[i] != (int) sumPair / 2)
        {
            newEven[newEvenIndex++] = nums[i];
        }
    }

    return splitArraySameAverage(newEven, numsSize - 1);
}


bool bruteForce(int *nums, int numsSize)
{
    for (int i = 1; i <= numsSize / 2; i++)
    {
        int *test = malloc(0);
        if (combos(nums, numsSize, i, test, 0))
        {
            return true;
        }
    }
    return false;
}