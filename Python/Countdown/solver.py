from itertools import permutations
from itertools import product


def loops(numbers, target_number):
    operations = ['+', '-', '*', '/']
    solutions_arr = []

    for i in range(1,6):
        all_numbers_perm = list(set(permutations(numbers, i)))
        all_order_operations = list(set(product(operations, repeat=i-1)))

        for num_seq in all_numbers_perm:
            for op_seq in all_order_operations:
                arr = combine_arrs(num_seq, op_seq)
                result = arithmetic(arr)
                if (result == target_number):
                    arr_str = str(arr[0])
                    for i in range(1, len(arr)):
                        arr_str += ' ' + str(arr[i])
                    arr_str += ' = ' + str(target_number)
                    solutions_arr.append(arr_str)
                    print(arr_str)

    if solutions_arr == []:
        return 'No Solutions'
    
    return solutions_arr



def combine_arrs(arr1, arr2):
    arr1_index = 0
    arr2_index = 0
    combined = []
    while (arr1_index < len(arr1) and arr2_index < len(arr2)):
        combined.append(arr1[arr1_index])
        combined.append(arr2[arr2_index])
        arr1_index += 1
        arr2_index += 1
    while (arr1_index < len(arr1)):
        combined.append(arr1[arr1_index])
        arr1_index += 1
    while (arr2_index < len(arr2)):
        combined.append(arr2[arr2_index])
        arr2_index += 1
    return combined

                            
def arithmetic(arr):
    answer = arr[0]
    for i in range(1, len(arr), 2):
        if not isinstance(answer,int) or answer < 0:
            return None
        if (arr[i] == '+'):
            answer += arr[i+1]
        elif (arr[i] == '-'):
            answer -= arr[i+1]
        elif (arr[i] == '*'):
            answer *= arr[i+1]
        elif (arr[i] == '/'):
            answer /= arr[i+1]
    return answer


if __name__ == '__main__':
    loops([4, 10, 2, 6, 7, 2], 662)