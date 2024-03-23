#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct arrayWSizes
{
    int *array;
    int size;
    struct arrayWSizes *next;

} arrayWSizesLL;

int** createPointsArr(int coordinateSize, int numPoints, int pointsValues[coordinateSize * numPoints]);

double* calcLine(int *point1, int *point2);

int equalArr(double *array1, double *array2, int sizeArr);

void printArr(int *array, int sizeArr);

void printPoints(int **points, int numPoints);

int contains(int *array, int sizeArr, int element);

int containsLL(arrayWSizesLL *HEAD, int i, int j);


int** createPointsArr(int coordinateSize, int numPoints, int pointsValues[coordinateSize * numPoints])
{
    int **points;
    points = malloc(numPoints * sizeof(int*));
    for (int i = 0; i < numPoints; i++)
    {
        points[i] = malloc(coordinateSize * sizeof(int));
    }
    int indexer = 0;
    for (int i = 0; i < numPoints; i++)
    {
        points[i][0] = pointsValues[indexer++];
        points[i][1] = pointsValues[indexer++];
    }

    return points;
}

double* calcLine(int *point1, int *point2)
{
    int x1 = point1[0];
    int y1 = point1[1];
    int x2 = point2[0];
    int y2 = point2[1];
    double slope = 100000000;
    if (x2 != x1)
    {
        slope = (double) (y2 - y1) / (x2 - x1);
    }
    double yint = y1 - (slope * x1);
    double *line = malloc(2 * sizeof(double));
    line[0] = slope;
    line[1] = yint;
    return line;
}

int equalArr(double *array1, double *array2, int sizeArr)
{
    for (int i = 0; i < sizeArr; i++)
    {
        if (array1[i] != array2[i])
            return 0;            
    }
    return 1;
}

void printArr(int *array, int sizeArr)
{
    printf("[ ");
    for (int i = 0; i < sizeArr - 1; i++)
    {
        printf("%d, ", array[i]);
    }
    printf("%d ]\n", array[sizeArr - 1]);
}

void printPoints(int **points, int numPoints)
{
    for (int i = 0; i < numPoints; i++)
    {
        printf("[%d, %d]\n", points[i][0], points[i][1]);
    }
    
}

int contains(int *array, int sizeArr, int element)
{
    for (int i = 0; i < sizeArr; i++)
    {
        if (array[i] == element)
            return 1;
    }
    return 0;
}

int containsLL(arrayWSizesLL *HEAD, int i, int j)
{
    arrayWSizesLL *currNode = HEAD;
    while(currNode != NULL)
    {
        if (contains((*currNode).array, (*currNode).size, i) && contains((*currNode).array, (*currNode).size, j))
        {
            return 1;
        }
        currNode = (*currNode).next;
    }
    return 0;
    
}