
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

void printArr(int *arr, int sizeArr);
int *createArr(int values[], int sizeArr);
int contains(int *arr, int sizeArr, int element);
int *selectionSort(int *arr, int sizeArr);
int average(int *arr, int sizeArr);
bool combos(int *arr, int arrSize, int comboSize, int *printerArr, int printerSize);

void printArr(int *arr, int sizeArr)
{
    printf("[ ");
    for (int i = 0; i < sizeArr - 1; i++)
    {
        printf("%d, ", arr[i]);
    }
    printf("%d ]", arr[sizeArr - 1]);
}

int *createArr(int values[], int sizeArr)
{
    int *array = malloc(sizeArr * sizeof(int));
    for (int i = 0; i < sizeArr; i++)
    {
        array[i] = values[i];
    }
    return array;
}

int contains(int *arr, int sizeArr, int element)
{
    for (int i = 0; i < sizeArr; i++)
    {
        if (arr[i] == element)
            return 1;
    }
    return 0;
}

int *selectionSort(int *arr, int sizeArr)
{
    for (int i = 0; i < sizeArr - 1; i++)
    {
        int indexSmallestElement = i;
        for (int j = i; j < sizeArr; j++)
        {
            if (arr[j] < arr[indexSmallestElement])
                indexSmallestElement = j;
        }
        int temp = arr[i];
        arr[i] = arr[indexSmallestElement];
        arr[indexSmallestElement] = temp;
    }
    return arr;
}

int average(int *arr, int sizeArr)
{
    int sum = 0;
    for (int i = 0; i < sizeArr; i++)
    {
        sum += arr[i];
    }
    return sum / sizeArr;
}

bool combos(int *arr, int arrSize, int comboSize, int *printerArr, int printerSize)
{
    if (comboSize == 0)
    {
        if (average(arr, arrSize) == average(printerArr, printerSize))
        {
            printArr(arr, arrSize);
            printf(" - %d - ", average(arr, arrSize));
            printArr(printerArr, printerSize);
            printf("\n");
            return true;
        }
        return false;
    }
    for (int i = 0; i < arrSize; i++)
    {
        if (arr[i] >= printerArr[printerSize - 1])
        {
            printerArr = realloc(printerArr, (printerSize + 1) * sizeof(int));
            printerArr[printerSize] = arr[i];
            int *removeArr = malloc((arrSize - 1) * sizeof(int));
            int j = 0;
            int k = 0;
            for (int j = 0; j < arrSize; j++)
            {
                if (j != i)
                {
                    removeArr[k++] = arr[j];
                }
            }
            if (combos(removeArr, arrSize - 1, comboSize - 1, printerArr, printerSize + 1))
            {
                return true;
            }
        }
    }
    return false;
}

