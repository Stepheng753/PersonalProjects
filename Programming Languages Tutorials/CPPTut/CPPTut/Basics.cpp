// Tutorial from Video :
// https://www.youtube.com/watch?v=Rub-JsjMhWY 

#include <iostream> // include in out stream for cout and cin
#include <vector>   // include vectors
#include <string>   // include strings
#include <fstream>  // include file stream for file io
#include <time.h>	// unclude time function

using namespace std;	// this allows me to avoid having to type 'std::cout' everytime

void coutTut() {

	// cout
	cout << "Hello World" << endl;
	cout << endl;
}

void variablesTut() {

	// Variables
	const double PI = 3.1415926535;		// const is the same as final in java
	char myGrade = 'A';
	bool isHappy = true;
	int myAge = 20;
	float favNum = 3.141592;			// accurate up to 6 decimal places
	double otherFavNum = PI;			// accurate up to 15 decimal places


	// to find size of variables in bytes, use sizeof()
	cout << "Size of char: " << sizeof(myGrade) << " bytes" << endl;
	cout << "Size of bool: " << sizeof(isHappy) << " bytes" << endl;
	cout << "Size of int: " << sizeof(myAge) << " bytes" << endl;
	cout << "Size of float: " << sizeof(favNum) << " bytes" << endl;
	cout << "Size of double: " << sizeof(otherFavNum) << " bytes" << endl;
	cout << endl;
}

void switchTut() {

	// Switch Statement 
	int myAge = 20;

	switch (myAge) {
	case 20:
		cout << "Age: " << myAge << endl;
		break;
	default:
		cout << "Age is not 20" << endl;
	}
	cout << endl;
}

void ternaryOperatorTut() {

	// Ternary Operator - Variable = (condition) ? true : false
	int largestNum = (5 > 2) ? 5 : 2;
	cout << "Biggest Number out of 5 & 2: " << largestNum << endl;
	cout << endl;
}

void loopsTut() {

	// For Loops and Arrays
	int firstNums[] = { 0,1,2,3,4 };
	int multiDim[4][3] = { {0,1,2} ,{3,4,5}, {6,7,8}, {9,10,11} };		// multiDim [array #][element within the chosen array]
	cout << "Array 1, element 2: " << multiDim[1][2] << endl;

	int amtArrays = sizeof(multiDim) / sizeof(multiDim[0]);						// Grabs the Amount of Arrays in 2D Array
	int amtElementsPerArray = sizeof(multiDim[0]) / sizeof(multiDim[0][0]);		// Grabs the Amount of elements in each Array

	int j = 0;
	for (int i = 0; i < amtArrays; i++) {
		cout << "{ ";
		for (j = 0; j < amtElementsPerArray - 1; j++) {
			cout << multiDim[i][j] << ", ";
		}
		cout << multiDim[i][j] << " } " << endl;
	}
	cout << endl;


	// While Loop and Rand
	srand(time(NULL));						// Initializes the random number generator
	int randNum = (rand() % 100) + 1;		// Random Number from 1 - 100

	while (randNum != 100) {
		cout << randNum << ", ";
		randNum = (rand() % 100) + 1;
	}
	cout << randNum << endl;
	cout << endl;


	// Do While, String, Cin  (editted to avoid cin every run)
	string numberGuessString;
	int numberGuessInt = 0;
	int numberOfGuesses = 0;
	int numberToGuess = (rand() % 2) + 1;

	do {
		numberOfGuesses++;
		cout << "Guess a number between 1 - 2: ";
		getline(cin, numberGuessString);			// getline(sourceOfInput, storageOfInput)
		numberGuessInt = stoi(numberGuessString);	// stoi - String to Int

	} while (numberGuessInt != numberToGuess);

	cout << "Correct!  -- Number of Guesses: " << numberOfGuesses << endl;
	cout << endl;
}

void stringsTut() {

	// Strings
	char happy[5 + 1] = { 'H','a','p','p','y', '\0' };		// Conversion of Char Array to String
	string birthday = " Birthday";
	cout << happy + birthday << endl;

	string stringPI = "3.1415926535";
	double doublePI = stod(stringPI);		// stod - String to Double

	cout << "Size of String: " << stringPI.size() << endl;
	cout << "Is String Empty: " << stringPI.empty() << endl;
	cout << stringPI.append("89793238") << endl;

	string name = "Stephen Giang";

	string wholeName = name;
	cout << "Whole Name: " << wholeName << endl;

	string firstName;
	cout << "First Name: " << firstName.assign(wholeName, 0, 7) << endl;		// assign(name, startingIndex, numCharacters)

	string lastName;
	cout << "Last Name: " << lastName.assign(wholeName, 8, 5) << endl;

	cout << "Index for Last Name: " << wholeName.find(lastName, 0) << endl;

	string middleName = "Johnson";
	wholeName.insert(8, middleName + " ");			// insert(startingIndex, stringToInsert)
	cout << "Whole Name: " << wholeName << endl;

	wholeName.erase(8, 8);							// erase(startingIndex, numCharacters)
	cout << "Whole Name: " << wholeName << endl;

	wholeName.replace(7, 1, " J ");					// replace(startingIndex, numCharToErase, stringToReplaceWith)
	cout << "Whole Name: " << wholeName << endl;
	cout << endl;
}

void printIntVec(vector <int> vec) {
	int i = 0;

	if (vec.empty()) {
		cout << "{  }" << endl;
	}
	else {
		cout << "{ ";
		for (i = 0; i < vec.size() - 1; i++) {
			cout << vec.at(i) << ", ";
		}
		cout << vec.at(i) << " }" << endl;
	}
}

void vectorsTut() {

	// vectors - same as linkedLists in Java
	vector <int> vec(0);
	int arr[] = { 0,1,2,3,4,5,6,7,8,9 };
	int arrSize = sizeof(arr) / sizeof(arr[0]);

	vec.insert(vec.begin(), arr, arr + arrSize);
	printIntVec(vec);

	vec.insert(vec.begin() + 10, 10);
	printIntVec(vec);

	vec.push_back(54);
	printIntVec(vec);
	cout << "Last Value or the 'Back' Value: " << vec.back() << endl;

	vec.pop_back();
	printIntVec(vec);

	vec.insert(vec.begin(), -1);
	printIntVec(vec);
	cout << "First Value or the 'Front' Value: " << vec.front() << endl;

	vec.clear();
	printIntVec(vec);

}

void fileIOTut() {

	// File Output Stream
	string quote = "Life is like a box of chocolates, you never know what you'll get.";
	ofstream writer("OFStreamExample.txt");		// output file stream

	if (!writer) {
		cout << "Error Opening File" << endl;
		exit(EXIT_FAILURE);
	}
	else {
		writer << quote << endl;
		writer.close();
	}

	ofstream writer2("OFStreamExample.txt", ios::app);		// ios - input output stream
		// ios::app - Open a stream and append to it 
		// ios::binary - Treat the File as Binary 
		// ios::in - Open a file to read input
		// ios::trunc - Default
		// ios::out - Open a file to write output

	if (!writer2) {
		cout << "Error Opening File" << endl;
		exit(EXIT_FAILURE);
	}
	else {
		writer2 << "\n- Forest Gump\n" << endl;
		writer2.close();
	}


	// File Input Stream
	char letter;
	ifstream reader("OFStreamExample.txt");

	if (!reader) {
		cout << "Error Opening File" << endl;
		exit(EXIT_FAILURE);
	}
	else {
		for (int i = 0; !reader.eof(); i++) {
			reader.get(letter);
			cout << letter;
		}
		cout << endl;
		reader.close();
	}

}

void exceptionHandlingTut() {

	// Try, Throw, Catch
	int number = 0;
	try {
		if (number != 0) {
			cout << 5 / number << endl;
		}
		else {
			throw(number);
		}
	}
	catch (int number) {
		cout << number << " is not valid" << endl;
	}

}

void addFive(int* numPtr) {
	cout << numPtr << " + 5 = ";
	numPtr += 5;
	cout << numPtr << endl;
}

void subtractFive(int& numRef) {
	cout << numRef << " - 5 = ";
	numRef -= 5;
	cout << numRef << endl;
}

void pointersTut() {

	// pointers
	int myAge = 20;
	int* agePtr = &myAge;	// & is a reference operator, * is a pointer definer
	cout << "Address of Pointer: " << agePtr << endl;
	cout << "Data at Pointer: " << *agePtr << endl;

	int randNums[] = { 18, 22, 4, 28, 62 };
	int* randNumsPtr = randNums;
	cout << "Address of Pointer: " << randNumsPtr << endl;
	cout << "Data at Pointer: " << *randNumsPtr++ << endl;
	cout << "Address of Pointer: " << randNumsPtr << endl;
	cout << "Data at Pointer: " << *randNumsPtr++ << endl;

	int num = *randNumsPtr;
	int* numPtr = &num;
	addFive(numPtr);
	cout << "The Number has changed from " << *randNumsPtr++ << " to " << num << endl;

	// references
	int& numRef = num;
	cout << "The Number is: " << num << endl;
	numRef++;
	cout << "The Number + 1 is: " << num << endl;
	subtractFive(numRef);
	cout << "The Number has changed from " << num + 5 << " to " << num << endl << endl;

	// difference between them
	int num1 = 1;
	int num2 = 2;

	int* num1Ptr;			// pointers do not need to be inialized
	num1Ptr = &num1;
	int& num2Ref = num2;	// references must be initialized

	// both can change the value of it pointed object
	cout << "num1: " << num1 << endl;
	addFive(num1Ptr);
	cout << "num1: " << num1 << endl;

	cout << "num2: " << num2 << endl;
	subtractFive(num2Ref);
	cout << "num2: " << num2 << endl;

	// pointers can change where they point to
	num1Ptr = &num2;
	cout << "num2: " << num2 << endl;
	addFive(num1Ptr);
	cout << "num2: " << num2 << endl;

	// if I try to change where the reference refers to, it does not change the value of the refered object
	num2Ref = num1;
	cout << "num1: " << num1 << endl;
	subtractFive(num2Ref);
	cout << "num1: " << num1 << endl;

}


// all code is kept within the main ion
int main() {

	pointersTut();

}
