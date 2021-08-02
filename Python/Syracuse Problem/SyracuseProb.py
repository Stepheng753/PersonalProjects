from matplotlib import pyplot as plt
import numpy as np 

def syracuse(n, count = 0):
    # print(count, ': Number is: ', n)
    total_count = 0
    if n == 1:
        return count
    if n % 2 == 0:
        total_count = syracuse(n / 2, count + 1)
    else:
        total_count = syracuse(3 * n + 1, count + 1)

    return total_count


def loop_iterations():
    biggest_index = 1
    syracuse_arr = [0]
    for i in range(1, 100000):
        syracuse_arr.append(syracuse(i))
        if syracuse_arr[i] > syracuse_arr[biggest_index]:
            biggest_index = i
    print(biggest_index, ': ', syracuse_arr[biggest_index]) 

if __name__ == '__main__':
    x = np.arange(1,11) 
    y = 2 * x + 5 
    plt.title("Matplotlib demo") 
    plt.xlabel("x axis caption") 
    plt.ylabel("y axis caption") 
    plt.plot(x,y) 
    plt.grid()
    plt.show()

