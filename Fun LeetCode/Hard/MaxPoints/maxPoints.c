
#include "maxPoints.h"

/**
 * @brief 
 *  https://leetcode.com/problems/max-points-on-a-line/
 *  Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane, 
 *  return the maximum number of points that lie on the same straight line.
 * @param points 
 * @param coordinateSize 
 * @param numPoints 
 * @return int 
 */
int maxPoints(int **points, int numPoints, int *coordinateSize);

int main(int argc, char const *argv[])
{
    int coordinateSize = 2;
    int numPoints = 3;
    int pointsValues[] = {1,1,2,2,3,3};
    int **points = createPointsArr(coordinateSize, numPoints, pointsValues);
    maxPoints(points, numPoints, &coordinateSize);
    return 0;
}

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
                (*allLines).array = malloc(sizeof(ptsLine));
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


