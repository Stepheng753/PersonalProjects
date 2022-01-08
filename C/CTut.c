// C Tutorial - Derek Banas
// https://www.youtube.com/playlist?list=PLGLfVvz_LVvSaXCpKS395wbCcmsmgRea7


#include <stdio.h>
#include <string.h>
#include <stdlib.h> // Needed for exit()

// Defining a constant 
// This is a MACRO
// This is will replace all MYNAME occurances in the code with the value given
#define MYNAME "Stephen Giang"

int globalVar = 0;

void printArgs(int argc, char const *argv[])
{
    printf("Arguments: ");
    for (int i = 0; i < argc - 1; i++)
    {
        printf("%s ", argv[i]);
    }
    printf("%s\n\n", argv[argc - 1]);
}


void variablesPrinting()
{
    char firstLetter = 'S';
    int age = 21;
    long int superBigNum = -32767000;
    float piValue = 3.14159;
    double reallyBigPi = 3.14159262;

    printf("New\nLine - \twith a tab\n");
    printf("I am %d years old\n", age);
    printf("Big Number: %ld\n", superBigNum);
    printf("Pi: %.6f\n", piValue);
    printf("Big pi: %.15f\n", reallyBigPi);
    printf("The first letter of my name is %c\n", firstLetter);
    printf("My Name is %s\n", "Stephen Giang");

    // char myName[13] = MYNAME;
    char myName[] = MYNAME;

    printf("My Name is %s\n\n", myName);
    printf("I have %ld letters in my Name\n", sizeof myName);

    strcpy(myName, "Bob Smith");
    printf("My Name is %s\n\n", myName);
    printf("I have %ld letters in my Name\n", sizeof myName);
}


void scanners() 
{
    char middleInitial;
    printf("What is your middle initial? ");
    scanf("%c", &middleInitial);
    printf("Middle Initial: %c\n", middleInitial);

    char firstName[30], lastName[30];
    printf("What is your first and last name? ");
    scanf("%s %s", firstName, lastName);
    printf("Your Name: %s %c %s\n", firstName, middleInitial, lastName);

    int month, day, year;
    printf("What's your birth date? (mm/dd/yyyy) ");
    scanf("%d/%d/%d", &month, &day, &year);
    printf("Birth Date: %d/%d/%d\n", month, day, year);
}


void computations()
{
    int num1 = 12, num2 = 15, numAns;
    float decimal1 = 1.2, decimal2 = 1.5, decimalAns;
    printf("Integer Division %d\n", num2 / num1);
    printf("Integer Division %f\n", decimal2 / decimal1);
    printf("Integer Modulation %d\n", num2 % num1);
    printf("num1 / num2 : %f\n", (float)num1 / num2);
}


void comparisons()
{
    // 1 - true
    // 0 - false
    int num1 = 1, num2 = 2;
    printf("Is %d > %d : %d\n", num1, num2, num1 > num2);

    int age = 38;
    char *legalAge = (age > 21) ? "True" : "False";
    printf("Is the customer of legal age? %s\n", legalAge);
}


void memorySizes()
{
    printf("char: %ld bytes\n", sizeof(char));
    printf("int: %ld bytes\n", sizeof(int));
    printf("long: %ld bytes\n", sizeof(long));
    printf("float: %ld bytes\n", sizeof(float));
    printf("double: %ld bytes\n", sizeof(double));
}


void loops()
{
    int biggestNum = 0;
    printf("How many bits?: ");
    scanf("%d", &biggestNum);


    int incrementor = 1, multiplier = 1, finalVal = 1;
    while(incrementor++ < biggestNum) 
    {
        multiplier *= 2;
        finalVal = finalVal + multiplier;
    }
    finalVal = biggestNum < 2 ? biggestNum : finalVal;
    printf("Top Value: %d\n", finalVal);
    

    for (int i = 0; i < 20; i++)
    {
        printf("%d, ", i);
        if (i == 19)
            printf("\n");
    }


    int numberChosen = 0;
    do 
    {
        printf("Choose a number 1 - 5: ");
        scanf("%d", &numberChosen);
    } while (numberChosen < 1 || numberChosen > 5);

    switch (numberChosen)
    {
        case 1:
            printf("You have chosen 1\n");
            break;
        case 2:
            printf("You have chosen 2\n");
            break;
        case 3:
            printf("NO BREAK: Will continue to default\n");
        default:
            printf("THis will exit\n");
            exit(0);
            break;
    }
}


void arrayAndStrings()
{
    char wholeName[14] = "Stephen Giang";
    int primeNums[3] = {2, 3, 5};
    int morePrimes[] = {13, 17, 19, 23};
    printf("First Prime: %d\n", primeNums[0]);

    char dontForgetNull[] = {'N', 'U', 'L', 'L', '\0'};
    printf("NOT FORGET NULL: %s\n", dontForgetNull);
    char forgetNull[] = {'N', 'U', 'L', 'L'};
    printf("FORGET NULL: %s\n", forgetNull);

    char fgetsArr[10];
    printf("What city do you live in?: ");
    // Ends fgetsArr with an "\0" for you if hit max, otherwise it ends with \n
    fgets(fgetsArr, sizeof(fgetsArr) / sizeof(char), stdin);
    for (int i = 0; i < sizeof(fgetsArr) / sizeof(char); i++)
    {
        if(fgetsArr[i] == '\n')
        {
            fgetsArr[i] = '\0';
        }
    }
    printf("fgets City: %s\n", fgetsArr);

    // Calling it a second time does not clear the stack! It uses the rest of the first call after the first 10 elements.
    char fgetsArr2[10];
    printf("What city do you live in?: ");
    fgets(fgetsArr2, sizeof(fgetsArr2) / sizeof(char), stdin);
    for (int i = 0; i < sizeof(fgetsArr2) / sizeof(char); i++)
    {
        if(fgetsArr2[i] == '\n')
        {
            fgetsArr2[i] = '\0';
        }
    }
    printf("fgets2 City: %s\n", fgetsArr2);

    // NOT GOOD DO NOT DO.
    // char scanfArr[10];
    // printf("What city do you live in?: ");
    // scanf("%s\n", scanfArr);
    // printf("scan City: %s\n", scanfArr);

    printf("Is %s > %s?: %d\n", fgetsArr, fgetsArr2, strcmp(fgetsArr, fgetsArr2));

    char append[] = "Concat";
    strcat(fgetsArr, append);
    printf("fgets City: %s\n", fgetsArr);
    printf("fgets Array Length: %ld\n", sizeof(fgetsArr) / sizeof(char));
    printf("fgetsArr[11]: %c\n", fgetsArr[11]);
    printf("fgets String Length: %ld\n", strlen(fgetsArr));
}

void local1()
{
    int localTo1 = 150;
    globalVar = 151;
    printf("Local to local1: %d\n", localTo1);
    printf("Global: %d\n", globalVar);
}

void local2()
{
    int localTo2 = 50;
    globalVar = 51;
    printf("Local to local2 Before: %d\n", localTo2);
    printf("Global Before: %d\n", globalVar);
    local1();
    printf("Local to local2 After: %d\n", localTo2);
    printf("Global After: %d\n", globalVar);
}

void pointers()
{
    int num1 = 12, num2 = 15;
    printf("HEXADECIMAL: num1 = %p ::: num2 = %p\n", &num1, &num2);
    printf("DECIMAL: num1 = %lu ::: num2 = %lu\n", (unsigned long)&num1, (unsigned long)&num2);
    printf("Size of int: %ld\n", sizeof(int));

    int *pNum1 = &num1;
    printf("HEXADECIMAL: pNum1 = %p\n", pNum1);
    printf("DECIMAL: pNum1 = %lu\n", (unsigned long)pNum1);

    printf("Value pNum: %d\n", *pNum1);
}

void arrayWithPointers()
{
    int primeNums[] = {2, 3, 5, 7};
    printf("First Index: %d\n", primeNums[1]);
    printf("First Index: %d\n", *(primeNums + 1));

    // String array = char array of pointers
    char *arrStrings[4] = {"Sally", "Mark", "Paul", "Sue"};
    for (int i = 0; i < 4; i++)
    {
        printf("%s : %lu\n", arrStrings[i], (unsigned long)&arrStrings[i]);
    }
}

void generateTwoRandNums(int* rand1, int* rand2)
{
    *rand1 = rand() % 50 + 1;
    *rand2 = rand() % 50 + 1;
    printf("RAND_MAX: %d\n", RAND_MAX);
    printf("rand1: %d\n", *rand1);
    printf("rand2: %d\n", *rand2);
}

void funcsWithPointers()
{
    int num1 = 0, num2 = 0;
    generateTwoRandNums(&num1, &num2);
    printf("num1: %d\n", num1);
    printf("num2: %d\n", num2);
}

void editMessageSent(char* strMsg, int sizeStr)
{
    char newMessage[] = "New Message!";
    if (sizeStr > sizeof(newMessage))
    {
        for (int i = 0; i < sizeof(newMessage); i++)
        {
            strMsg[i] = newMessage[i];
        }
    } 
    else
    {
        printf("Nessage is too big\n");
        printf("Size of current: %d\n", sizeStr);
        printf("Size of new: %ld\n", sizeof(newMessage));
    }
}

void funcsWithString()
{
    char stringMsg[] = "Edit my Function";
    editMessageSent(stringMsg, sizeof stringMsg);
    printf("New Message: %s\n", stringMsg);
}

struct dogFaves
{
    char *food;
    char *friend;
};

typedef struct dog
{
    const char *name;
    const char *breed;
    int avgHeightCm;
    int avgWeightLbs;
    struct dogFaves faveThings;

} dog;

void getDogInfo(dog theDog)
{
    printf("Name: %s\n", theDog.name);
    printf("Breed: %s\n", theDog.breed);
    printf("Height: %d cms\n", theDog.avgHeightCm);
    printf("Weight: %d lbs\n", theDog.avgWeightLbs);
}

void getDogFaves(dog theDog)
{
    printf("Name: %s\n", theDog.name);
    printf("Fave Food: %s\n", theDog.faveThings.food);
    printf("Fave Friend: %s\n", theDog.faveThings.friend);
}

void setDogWeight(dog *theDog, int newWeight)
{
    (*theDog).avgWeightLbs = newWeight;
    printf("New Weight: %d lbs\n", theDog->avgWeightLbs);
}

void getMemoryLocations(struct dog theDog)
{
    printf("Name Location: %lu\n", (unsigned long)theDog.name);
    printf("Breed Location: %lu\n", (unsigned long)theDog.breed);
    printf("Height Location: %lu\n", (unsigned long)&theDog.avgHeightCm);
    printf("Weight Location: %lu\n", (unsigned long)&theDog.avgWeightLbs);
}

void structs()
{
    dog cujo = {"Cujo", "Saint Bernard", 90, 264};
    getDogInfo(cujo);
    dog cujo2 = cujo;
    getMemoryLocations(cujo);
    getMemoryLocations(cujo2);

    dog benji = {"Benji", "Silky Terrier", 25, 9, {"Meat", "Joe"}};
    getDogFaves(benji);
    setDogWeight(&benji, 15);
    getDogInfo(benji);
}

int main(int argc, char const *argv[])
{
    // printArgs(argc, argv);
    // variablesPrinting();
    // scanners();
    // computations();
    // comparisons();
    // memorySizes();
    // loops();
    // arrayAndStrings();
    // local2();
    // pointers();
    // arrayWithPointers();
    // funcsWithPointers();
    // funcsWithString();
    structs();
    return 0;
}
