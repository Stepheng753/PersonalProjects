

#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

int reverse(int numToReverse)
{
    long reversedNum = 0;
    while (numToReverse != 0)
    {
        reversedNum += numToReverse % 10;
        reversedNum *= 10;
        numToReverse /= 10;
    }
    reversedNum /= 10;
    return (reversedNum < INT_MAX && reversedNum > INT_MIN) ? (int)reversedNum : 0;
}

int main(int argc, char const *argv[])
{
    time_t t;
    srand((unsigned) time(&t));
    int x = rand() % INT_MAX;
    printf("Number to Reverse: %d\n", x);
    printf("Number Reversed: %d\n", reverse(x));
    return 0;
}
