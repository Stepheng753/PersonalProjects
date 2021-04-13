/**
 Program: PrimeNumber

 Description :
 Write a Java program to check if a given number is prime or not. Remember, a prime number is a number
 which is not divisible by any other number, e.g. 3, 5, 7, 11, 13, 17, etc.
 Be prepared for cross, e.g. checking till the square root of a number, etc.

 @author : Stephen Giang
 @date December 28, 2019
 **/

import java.lang.Math;
import java.math.BigInteger;

public class PrimeNumber {
    static int number;                 // Number to Check
    static int [][] pascals;           // Creates Static 2D Array to hold Pascals Triangle

    /**
     * Sets the Number to check
     * @param number
     */
    public PrimeNumber(int number){
        this.number = number;

        // If negative, checks the positive version
        if (this.number < 0) {
            this.number *= -1;
        }
    }


    /**
     * Checks if divisible by all numbers from 2 - sqrt(number)
     * Time : O(sqrt(N) - 2 )
     * @return boolean
     */
    public boolean sqrtCheck () {
        int sqrt = (int) Math.round(Math.sqrt(number));

        // 0 and 1 are Neither Prime nor Composite
        if (number == 0 || number == 1) {
            System.out.println("The Number, " + number + ", is: Neither Prime not Composite");
            return false;
        }

        // Checks through a reduced List consisting of 2 - sqrt.  Checks to see if divisible or not.
        for (int i = 2; i <= sqrt; i++) {
            if ((number % i) == 0) {
                System.out.println("The Number, " + number + ", is: : Composite! ");
                return false;
            }
        }
        System.out.println("The Number: " + number + " is: : Prime! ");
        return true;
    }


    /**
     * ForAll primes, p, [a^p - a] is divisible by p
     * Time : O (N - 2)
     * @return boolean
     */
    public boolean fermatCheck () {

        // 0 and 1 are Neither Prime nor Composite
        if (number == 0 || number == 1) {
            System.out.println("The Number, " + number + ", is: Neither Prime not Composite");
            return false;
        }

        // Checks to see if [a^p - a] is divisible by p, p = number
        for (int a = 2; a < number; a++ ) {
            if ((Math.pow(a, number) - a) % a != 0) {
                System.out.println("The Number: " + number + ", is: Composite! ");
                return false;
            }
        }
        System.out.println("The Number: " + number + " is: : Prime! ");
        return true;
    }


    /**
     * ForAll primes, every element of their pascal's triangle row is divisible by the prime number
     * All Coefficients of (x-1)^p are all divisible by the p
     * @return boolean
     */
    public boolean AKSCheck () {
        pascalsTriangle();

        // 0 and 1 are Neither Prime nor Composite
        if (number == 0 || number == 1) {
            System.out.println("The Number, " + number + ", is: Neither Prime not Composite");
            return false;
        }

        try {
            // Checks to see if all the All Coefficients of (x-1)^p are all divisible by the p, p = number
            for (int col = 1; col < number; col++) {
                if (pascals[number][col] % number != 0) {
                    System.out.println("The Number: " + number + ", is: : Composite! ");
                    return false;
                }
            }
        } catch (NullPointerException ex) { return false; }

        System.out.println("The Number: " + number + " is: : Prime! ");
        return true;
    }


    /**
     * Creates Pascals Triangle for the AKSCheck
     * @throws OutOfMemoryError
     */
    public static void pascalsTriangle() throws OutOfMemoryError {
        try {
            pascals = new int[number + 1][number + 1];

            // Sets the ends of each row to 1
            for (int i = 0; i < number + 1; i++) {
                pascals[i][0] = 1;
                pascals[i][i] = 1;
            }

            // Each element is defined as the row above, and the sum of its adjacent elements
            for (int row = 2; row < number + 1; row++) {
                for (int col = 1; col < row; col++) {
                    pascals[row][col] = pascals[row - 1][col - 1] + pascals[row - 1][col];
                }
            }
        } catch (OutOfMemoryError e ) {
            System.out.println("Too Big of a Number to Check");
        }
    }


    /**
     * Prints Pascals Triangle
     */
    public static void printPascalsTriangle () {

        // Prints each element with a space in between
        for (int row = 0; row < number + 1; row++) {

            for (int col = 0; col < row + 1; col++) {
                System.out.print(pascals[row][col] + " ");
            }

            System.out.println();
        }
    }

    public static double pow(double number, double expo) {
        double mult = number;
        for (int i = 0; i < expo - 1; i++) {
            number *= mult;
        }
        return number;
    }

    public static void main(String[] args) {
//        PrimeNumber primeNumber = new PrimeNumber(107);
//        primeNumber.sqrtCheck();
//        primeNumber.fermatCheck();
//        primeNumber.AKSCheck();
        double p = 107;
        double a = 3;
        System.out.printf("%.0f",pow(3,107));

    }





}
