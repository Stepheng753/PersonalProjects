
#include <stdio.h>
#include "printHello.h"

void printHello()
{
    printf("HEADER: Hello World!!!\n");
    printf("HEADER v%0.1f: Hello World!!!\n", PRINT_HELLO_VERSION);
}