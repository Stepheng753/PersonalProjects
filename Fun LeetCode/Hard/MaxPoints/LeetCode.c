
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

/**
 * @brief 
 *  Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane, 
 *  return the maximum number of points that lie on the same straight line.
 * @param points 
 * @param coordinateSize 
 * @param numPoints 
 * @return int 
 */
int maxPoints(int **points, int numPoints, int *coordinateSize);

// int main(int argc, char const *argv[])
// {
//     int coordinateSize = 2;
//     int numPoints = 3;
//     int pointsValues[] = {1,1,2,2,3,3};
//     int **points = createPointsArr(coordinateSize, numPoints, pointsValues);
//     maxPoints(points, numPoints, &coordinateSize);
//     return 0;
// }

int maxPoints(int **points, int numPoints, int *coordinateSize) 
{
    auto void printDebug(int *starter, int **points, int j, int k, double *currLine, double *checkLine, int numPointsOnLine);

    int maxPointsOnLine = 1;
    int numLines = 0;
    arrayWSizesLL *HEAD = NULL;

    for (int i = 0; i < numPoints; i++)
    {
        int *starter = points[i];
        int numPointsOnLine = 1;
        int *ptsLine = malloc(numPointsOnLine * sizeof(int));
        ptsLine[numPointsOnLine - 1] = i;

        for (int j = i + 1; j < numPoints; j++)
        {
            if (!containsLL(HEAD, i,j))
            {
                double *currLine = calcLine(starter, points[j]);

                numPointsOnLine = 2;
                ptsLine = realloc(ptsLine, numPointsOnLine * sizeof(int));
                ptsLine[numPointsOnLine - 1] = j;
                if (numPointsOnLine > maxPointsOnLine)
                    maxPointsOnLine = numPointsOnLine;
                    


                for (int k = 0; k < numPoints; k++)
                {
                    if (!contains(ptsLine, numPointsOnLine, k))
                    {
                        double *checkLine = calcLine(starter, points[k]);
                        if (equalArr(currLine, checkLine, *coordinateSize))
                        {
                            numPointsOnLine++;
                            ptsLine = realloc(ptsLine, numPointsOnLine * sizeof(int));
                            ptsLine[numPointsOnLine - 1] = k;
                        }
                        if (numPointsOnLine > maxPointsOnLine)
                            maxPointsOnLine = numPointsOnLine;

                        // printDebug(starter, points, j, k, currLine, checkLine, numPointsOnLine);
                    }
                }
                printArr(ptsLine, numPointsOnLine);

                arrayWSizesLL *allLines = malloc(sizeof(arrayWSizesLL));
                (*allLines).array = malloc(sizeof(*ptsLine));
                for (int i = 0; i < numPointsOnLine; i++)
                {
                    (*allLines).array[i] = ptsLine[i];
                }
                (*allLines).size = numPointsOnLine;
                (*allLines).next = HEAD;
                HEAD = allLines;
            }
        }
    }

    printf("MAX POINTS: %d\n", maxPointsOnLine);
    return maxPointsOnLine;



    void printDebug(int *starter, int **points, int j, int k, double *currLine, double *checkLine, int numPointsOnLine)
    {
        printf("(%d, %d), (%d, %d) => [%.2f, %.2f]\n", 
                starter[0], starter[1], points[j][0], points[j][1], currLine[0], currLine[1]);

        printf("(%d, %d), (%d, %d) => [%.2f, %.2f] => %d\n\n", 
                starter[0], starter[1], points[k][0], points[k][1], checkLine[0], checkLine[1], numPointsOnLine);
    }
}

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


