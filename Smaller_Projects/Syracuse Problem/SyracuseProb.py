from matplotlib import pyplot as plt
import numpy as np 
import random

def syracuse(n, count_arr = [], values_arr = [], loops = 0, show_num_loops = 10):
    count_arr.append(len(count_arr))
    values_arr.append(n)
    plot_vals = []

    if n == 1 and loops < show_num_loops:
        loops = loops + 1
    elif n == 1 and loops >= show_num_loops:
        return (count_arr, values_arr)
    if n % 2 == 0:
        plot_vals = syracuse(n / 2, count_arr, values_arr, loops)
    else:
        plot_vals = syracuse(3 * n + 1, count_arr, values_arr, loops)

    return plot_vals


def loop_iterations():
    biggest_index = 1
    syracuse_arr = [0]
    for i in range(1, 100000):
        syracuse_arr.append(syracuse(i))
        if syracuse_arr[i] > syracuse_arr[biggest_index]:
            biggest_index = i
    print(biggest_index, ': ', syracuse_arr[biggest_index]) 

if __name__ == '__main__':
    plt.title('Syracuse Problem for n = [1, 50)') 
    plt.xlabel('Iteration') 
    plt.ylabel('Syracuse Value') 
    plt.grid()
    legend = []
    for i in range(1, 20):
        legend.append('n = ' + str(i))
        xy_vals = syracuse(i, [], [])
        x_vals = np.asarray(xy_vals[0])
        y_vals = np.asarray(xy_vals[1])
        plt.plot(x_vals, y_vals, color=(random.random(), random.random(), random.random()))
    plt.legend(legend, bbox_to_anchor=(0.9, 1.1), loc='upper left')
    plt.show()
    
        

