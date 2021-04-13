def main(last_num):
    for i in range(1, last_num + 1):
        if i % 15 == 0:
            print(i, ': FizzBuzz')
        elif i % 3 == 0:
            print(i, ': Fizz')
        elif i % 5 == 0:
            print(i, ': Buzz')
        else:
            print(i)


def other(last_num):
    for i in range(1, last_num + 1):
        print(i, end=": ")
        if i % 3 == 0:
            print('Fizz', end="")
        if i % 5 == 0:
            print('Buzz', end="")    
        print()


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    other(1000)

