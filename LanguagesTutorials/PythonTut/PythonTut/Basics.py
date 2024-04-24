# Tutorial from Video :
# https://www.youtube.com/watch?v=N4mEzFDjqtA&t=152s

# import modules
import random
import sys
import os


def comment_tut():
    # hashtag for single line comments
    """
    triple double quotes for multiline comments
    """


# strings
def print_tut():
    # single quotes are the same thing as double in Python
    print("Double Quotes")
    print('Single Quotes')

    quote = "Life is like a"
    multi_line_quote = '''Box of Chocolates
                        - Forest Gump'''
    print("%s\n%s %s" % ("My Favorite Quote:", quote, multi_line_quote))  # %s means find the string
    print("This takes away ", end="")
    print("newlines")
    # print("2 newlines below", "\n" * 2)


# numbers
def arithmetic_tut():
    print("5 + 2 =", 5 + 2)  # addition
    print("5 - 2 =", 5 - 2)  # subtraction
    print("5 * 2 =", 5 * 2)  # multiplication
    print("5 / 2 =", 5 / 2)  # division
    print("5 % 2 =", 5 % 2)  # modulus
    print("5 ** 2 =", 5 ** 2)  # exponential
    print("5 // 2 =", 5 // 2)  # round down division


# lists are changeable and similar to arrays
def lists_tut():
    grocery_list = ["Eggs", "Milk", "Flour", "Bananas"]
    print("First Item:", grocery_list[0])
    print("Middle Items:", grocery_list[1:3])

    snack_list = ["Pringles", "Lays"]
    food_list = [grocery_list, snack_list]
    print("Food List:", food_list)
    print("List 1, item 1:", food_list[1][1])
    snack_list.append("Cheetos")
    print("Food List:", food_list)

    grocery_list.insert(3, "Sugar")
    grocery_list.remove("Bananas")
    grocery_list.sort()
    grocery_list.reverse()
    del grocery_list[1]
    print("Grocery List:", grocery_list)

    food_list2 = snack_list + grocery_list
    print("Total Food List:", food_list2)
    print("Amount of Food:", len(food_list2))
    print("Max:", max(food_list2))
    print("Min", min(food_list2))


# tuples are unchangeable and like lists
def tuples_tut():
    pi_tuple = (3, 1, 4, 1, 5, 9)
    pi_list = list(pi_tuple)  # convert to list for editing
    pi_tuple = tuple(pi_list)  # convert to tuple for protecting
    print(pi_tuple)
    print("Length of pi_tuple:", len(pi_tuple))
    print("Max of pi_tuple:", max(pi_tuple))
    print("Min of pi_tuple:", min(pi_tuple))


# dictionaries/maps - work like hashmaps with keys and values
def dictionaries_tut():
    # dictionary_name = {key : value}
    super_heroes = {"Superman": "Clark Kent",
                    "Batman": "Bruce Wayne",
                    "Flash": "Barry Allen",
                    "Aquaman": "Arthur Curry"}
    print("Superman is", super_heroes["Superman"])
    del super_heroes["Aquaman"]
    super_heroes["Flash"] = "Wally West"
    print("The Flash is", super_heroes.get("Flash"))
    print("Superhero keys:", super_heroes.keys())
    print("Superhero values:", super_heroes.values())


def conditional_tut():
    # logical operator - and, or, not
    age = 20

    if not (age > 0):
        print("You are not born")
    elif (age >= 18) and (age < 65):
        print("You are able to work")
    elif (age < 18) or (age >= 65):
        print("You are NOT able to work")


def loops_tut():
    # for loops
    for x in range(0, 6):  # again goes from 0 - 5 like [0,6)
        print(x, " ", end="")
        if x == len(range(0, 6)) - 1:
            print()

    # different ways to loop
    carbs_list = ["Rice", "Pasta", "Noodles"]
    for x in carbs_list:
        print(x, " ", end="")
        if x == carbs_list[len(carbs_list) - 1]:
            print()

    for x in [2, 4, 6, 8, 10]:
        print(x, " ", end="")
        if x == 10:
            print()

    # nested loops
    num_list = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    for x in range(0, 3):
        for y in range(0, 3):
            print(num_list[x][y], " ", end="")
    print("\n")

    # while loops
    random_num = random.randrange(0, 50)
    i = 0
    # Loop through random numbers until we reach 5
    while random_num != 5:
        if i % 10 == 0 and i != 0:  # start newlines after 10 iterations
            print()
        i += 1
        print(random_num, " ", end="")
        random_num = random.randrange(0, 50)
    print(random_num, "\n")

    # break and continue
    i = 0
    while i <= 20:
        if i % 2 == 0:
            print(i, " ", end="")
        elif i == 9:
            print()
            break  # break out of loop
        else:
            i += 1
            continue  # restarts loop
        i += 1


def input_tut():
    print("Enter in your Name: ", end="")
    name = sys.stdin.readline()  # sys.stdin - standard input
    print("Hello", name)


def strings_tut():
    long_string = "I'll catch you if you fall - The Floor"
    print(long_string[0:4])  # [0,4) characters
    print(long_string[-5:])  # prints from last 5 characters to the end
    print(long_string[:-5])  # prints from beginning to last 5 characters
    print(long_string[:4] + " be there")  # concatenates two strings with '+'
    print("%c is my %s letter and my %d number is %.5f" % ('S', "favorite", 1, 5.75))
    print(long_string.capitalize())
    print(long_string.find("Floor"))
    print(long_string)
    print(long_string.isalpha())    # returns true if all characters in string are letters
    print(long_string.isalnum())    # returns true if all characters in string are numbers or letters
    print(len(long_string))
    print(long_string.replace("Floor", "Ground"))
    print(long_string.strip())      # returns string without trailing/leading whitespaces
    quote_list = long_string.split(" ")
    print(quote_list)


def file_io_tut():
    # writing a file
    test_file = open("test.txt", "wb")              # wb is the mode which overrides and writes bytes (wb)
    print(test_file.mode)
    print(test_file.name)
    test_file.write(bytes("First\n", 'UTF-8'))      # this is how to write to a file
    test_file.close()
    test_file = open("test.txt", "ab+")             # ab+ is the mode which appends and writes bytes (ab+)
    test_file.write(bytes("Second\n", 'UTF-8'))
    test_file.close()

    # reading a file
    test_file = open("test.txt", "r+")      # r+ is for reading and writing
    text_in_file = test_file.read()
    print(text_in_file)
    test_file.close()

    # deleting a file
    # os.remove("test.txt")
    

def main():
    print()
    file_io_tut()

main()
