# Tutorial from Video :
# https://www.youtube.com/watch?v=N4mEzFDjqtA&t=152s

# import modules
import random
import sys
import os


class Animal:
    __name = ""  # '__' means private
    __height = 0
    __weight = 0
    __sound = 0

    # Constructor
    def __init__(self, name, height, weight, sound):
        self.__name = name
        self.__height = height
        self.__weight = weight
        self.__sound = sound

    # Getters and Setters
    def set_name(self, name):
        self.__name = name

    def set_height(self, height):
        self.__height = height

    def set_weight(self, weight):
        self.__weight = weight

    def set_sound(self, sound):
        self.__sound = sound

    def get_name(self):
        return self.__name

    def get_height(self):
        return str(self.__height)

    def get_weight(self):
        return str(self.__weight)

    def get_sound(self):
        return self.__sound

    def get_type(self):
        return "Animal Type"

    def to_string(self):
        return "Name: {}\n" \
               "Height: {} cm\n" \
               "Weight: {} kg\n" \
               "Sound: {}".format(self.__name, self.__height,
                                  self.__weight, self.__sound)


# Dog extends Animal
class Dog(Animal):
    __owner = ""

    def __init__(self, name, height, weight, sound, owner):
        self.__owner = owner
        super(Dog, self).__init__(name, height, weight, sound)

    def set_owner(self, owner):
        self.__owner = owner

    def get_owner(self):
        return self.__owner

    def get_type(self):
        return "Dog Type"

    def to_string(self):
        return super(Dog, self).to_string() + "\nOwner: " + self.__owner

    def multi_sound(self, amt_times=None):
        if amt_times is None:
            print(self.get_sound())
        else:
            print(self.get_sound() * amt_times)


def get_type(animal):
    return animal.get_type()


def animal_examples():
    snake = Animal("Slither", 55, 20, "ssss")
    print(snake.to_string())
    print(snake.get_type())
    print()

    dog = Dog("Bear", 20, 10, "ruff", "Theresa")
    print(dog.to_string())
    print(dog.get_type())
    dog.multi_sound()
    dog.multi_sound(2)
    print()

    print(get_type(snake))
    print(get_type(dog))


animal_examples()
