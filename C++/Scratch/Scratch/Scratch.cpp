
#include <iostream> // include in out stream for cout and cin
#include <vector>   // include vectors
#include <string>   // include strings
#include <fstream>  // include file stream for file io
#include <time.h>	// unclude time function

using namespace std;	// this allows me to avoid having to type 'std::cout' everytime


int main() {

	int a = 2,
		b = 4,
		c = 6;
	int* f = &a;

	int answer = a *= *f;

	cout << answer << endl;
	cout << a;
}

