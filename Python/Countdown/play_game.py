
import random
import time
import sys
from solver import loops

def main():
    introduction()
    numbers = generate_numbers()
    target_number = random.randint(100, 999)
    solution = loops(numbers, target_number)
    print(numbers)
    print(target_number)

    timer()
    print_solution(solution)
    


def introduction():
    print('\n####################################')
    print('Welcome to Countdown Numbers Game!')
    print('####################################\n')
    print('Would You Like to Go Over the Rules ?')
    rulesNeeded = input('Type \'Yes\' or \'No\': ')
    if (rulesNeeded.lower() in 'yes' and rulesNeeded != ''):
        print('\nThe Following Rules are: ')
        print('\n###########################################################################################')
        print('There are Large Numbers and Small Numbers \n' +
        'Large Numbers consist of {25 , 50, 75, 100} \n' +
        'Small Numbers consist of { 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10} \n' +
        'The User will get to choose (out of 6) how many Large and Small Numbers \n' +
        'They will then choose how many Large Numbers they want ( zero to four ) \n' +
        'From the number given, the computer will choose that number of random large numbers \n' +
        'The computer will then choose the remaining out of 6 random small numbers \n' +
        'Lastly, the computer will show a random 3 Digit Number \n' +
        'The goal is to stitch together the 6 numbers with the 4 basic operations ( +, -, *, /) \n' +
        'to equal the random 3 digit number')
        print('###########################################################################################\n')

def set_get_amt_large_nums():
    amt_large_nums = -1
    while (amt_large_nums < 0 or amt_large_nums > 4):
        try:
            amt_large_nums = int(input('How Many Large Numbers Would You Like: '))
        except:
            print('Type a Number')
    return amt_large_nums

def generate_numbers():
    large_num_index = []
    small_num_index = []
    for i in range(0,20):
        if i < 4:
            large_num_index.append(i)
        small_num_index.append(i)

    random.shuffle(large_num_index)
    random.shuffle(small_num_index)

    numbers = []
    large_nums = [25, 50, 75, 100]
    small_nums = []
    for i in range(1, 11):
        small_nums.append(i)
        small_nums.append(i)

    amt_large_num = set_get_amt_large_nums()
    for i in range(0, 6):
        if i < amt_large_num:
            numbers.append(large_nums[large_num_index[i]])
        else:
            numbers.append(small_nums[small_num_index[i]])

    return numbers


def timer():
    total_time = 30
    print('You have %i seconds, starting ... NOW' %total_time)
    start_time = time.time()
    show_times = []
    for i in range(1, 35):
        show_times.append(i)
    while (time.time() - start_time < total_time):
        elapsed_time = round(time.time() - start_time)
        if elapsed_time == show_times[0]:
            sys.stdout.write('\rTime Remaining: [' + '.'*elapsed_time + ' '*(total_time - elapsed_time) + ']')
            show_times.remove(elapsed_time)
        sys.stdout.flush()
    print('\nTIMES UP')


def print_solution(solution):
    print_solution = input('Do you want to see the solution: ')
    if (print_solution.lower() in 'yes'):
        if solution == 'No Solutions':
            print(solution)
        else:
            for sol in solution:
                print(sol)






if __name__ == '__main__':
    main()