/**
 Program: FibonacciSequence

 Description :
 Write a simple Java program which will print Fibonacci series, e.g. 1 1 2 3 5 8 13 ... . up to a given number.
 We prepare for cross questions like using iteration over recursion and how to optimize the solution using caching and memoization.

 @author : Stephen Giang
 @date December 27, 2019
 **/

public class FibonacciSequence {
    int iterations;             // The Amount of Iterations
    static long [] fiboSeq;     // This sequence will hold all the Fibonacci Numbers


    /**
     * Sets Iterations
     * @param iterations
     */
    public FibonacciSequence(int iterations) {
        this.iterations = iterations;
    }


    /**
     * Makes Fibonacci Sequences using iterations
     * Time : O(N)
     */
    public void iterationsSeq(){
        fiboSeq = new long [iterations];

        // Sets the starting parameters with the first numbers 1;
        for (int i = 0; i < 2; i++) {
            fiboSeq[i] = 1;
        }

        // Sets each number being the sum of the previous 2
        for (int i = 2; i < iterations; i++) {
            fiboSeq[i] = fiboSeq[i -2] + fiboSeq[i - 1];
        }
        printSeq(iterations);
    }


    /**
     * Returns the Fibonacci Number at specified index
     * @param iterations
     * @return lastFibo
     */
    public int recursiveFiboNum(int iterations){

        // Sets the starting parameters with the first numbers 1;
        if (iterations == 0 || iterations == 1) {
            return 1;
        }

        // Takes the sum of the 2 numbers before it, numbers before it are calculated through recursion
        int lastFibo = recursiveFiboNum(iterations - 2) + recursiveFiboNum(iterations - 1);
        return lastFibo;
    }


    /**
     * Makes Fibonacci Sequences using iterations
     * Time : O(N * C^N)
     */
    public void recursiveSeq () {
        fiboSeq = new long [iterations];

        // Sets the starting parameters with the first numbers 1;
        for (int i = 0; i < 2; i++) {
            fiboSeq[i] = 1;
        }

        // Inserts all the Fibonacci Numbers from the Recursive Method to an array
        for (int i = 2; i < iterations; i++) {
            fiboSeq[i] = recursiveFiboNum(i);
        }

        printSeq(iterations);
    }


    /**
     * Prints Sequence with 10 elements per line
     * @param iterations
     */
    public static void printSeq (int iterations) {
        int i = 0;

        System.out.print("{ ");
        // Prints each number with a comma separating after every 3 digits.
        while (i != iterations - 1) {
            System.out.printf("%,d , ", fiboSeq[i]);
            i++;
            if ( (i % 10) == 0) { System.out.println(); }
        }
        System.out.printf("%,d }", fiboSeq[iterations - 1]);
        System.out.println();
    }

    public static void main(String[] args) {
        FibonacciSequence fibo = new FibonacciSequence(5);
        fibo.iterationsSeq();
        fibo.recursiveSeq();

    }
}
