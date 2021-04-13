// Tutorial from Video :
// https://www.youtube.com/watch?v=Rub-JsjMhWY 

#include <iostream> // include in out stream for cout and cin
#include <vector>   // include vectors
#include <string>   // include strings
#include <fstream>  // include file stream for file io
#include <time.h>	// unclude time function

using namespace std;	// this allows me to avoid having to type 'std::cout' everytime

class Animal {

private:
	int height;
	int weight;
	string name;

	static int numOfAnimals;	// static variable

public:
	// getters and setters
	int getHeight() { return height; }
	int getWeight() { return weight; }
	string getName() { return name; }
	void setHeight(int cm) { height = cm; }
	void setWeight(int kg) { weight = kg; }
	void setName(string animalName) { name = animalName; }

	// Prototypes
	void setAll(int, int, string);
	Animal(int, int, string);		// Constructor
	Animal();						// Constructor
	~Animal();						// Destructor
	string toString();

	static int getNumOfAnimals() { return numOfAnimals; }	// Static Function

};

int Animal::numOfAnimals = 0;	// set static variable

// decalre prototypes
void Animal::setAll(int height, int weight, string name) {
	this->height = height;
	this->weight = weight;
	this->name = name;
}

Animal::Animal(int height, int weight, string name) {
	this->height = height;
	this->weight = weight;
	this->name = name;
	numOfAnimals++;
}

Animal::Animal() {
	numOfAnimals++;
}

Animal::~Animal() {
	cout << "Animal " << this->name << " is destroyed" << endl;
}

string Animal::toString() {
	string returnStr = "Name: ";
	returnStr.append(name).append("\nHeight: ").append(to_string(height)).append(" cm");
	returnStr.append("\nWeight: ").append(to_string(weight)).append(" kg");

	return returnStr;
}

void animalExample() {
	Animal bunny;
	bunny.setHeight(87);
	bunny.setWeight(4);
	bunny.setName("Bonny");
	cout << "Name: " << bunny.getName() << endl;
	cout << "Height: " << bunny.getHeight() << " cm" << endl;
	cout << "weight: " << bunny.getWeight() << " kg" << endl << endl;

	Animal deer(125, 80, "Doe");
	cout << deer.toString() << endl << endl;
}

// Extends and Inherits
class Dog : public Animal {
private:
	string sound = "bark";
public:
	void setSound(string sound) { this->sound = sound; }
	string getSound() { return sound; }

	Dog(int, int, string, string);
	Dog() : Animal() {};
	string toString();
};

Dog::Dog(int height, int weight, string name, string sound) : Animal(height, weight, name) {
	this->sound = sound;
}

string Dog::toString() {
	string returnStr = Animal::toString();
	returnStr.append("\nSound: ").append(sound);

	return returnStr;
}

void dogExample() {
	Dog bassetHound(100, 45, "Porter", "Row");
	cout << bassetHound.toString() << endl;
}

// polymorphism
class Student {
public:
	void getFamily() { cout << "We are Students" << endl; }
	virtual void getClass() { cout << "I am a Student" << endl; }	// lets computer know this will most likely get overridden, kind of like abstract
};

class Senior : public Student {
public:
	void getClass() { cout << "I am a Senior" << endl; }
};

class MathSenior : public Senior {
public:
	void getClass() { cout << "I am a Math Senior" << endl; }
};

void whatClass(Student* student) {
	student->getClass();
}

void studentExample() {
	Student* student = new Student;		// creates a pointer that points to Object
	Senior* senior = new Senior;

	student->getClass();
	senior->getClass();
	whatClass(student);
	whatClass(senior);

	Student* seniorPtr = new Senior;	// creates a pointer that points to Object
	MathSenior stephen;
	Student* mathSeniorPtr = &stephen;	// same thing except the MathSenior Object is declared

	seniorPtr->getFamily();
	seniorPtr->getClass();
	mathSeniorPtr->getFamily();
	mathSeniorPtr->getClass();
}

/*
// all code is kept within the main ion
int main() {

	studentExample();

	return 0;	// this means we return the porgram runned perfectly fine

}
*/
