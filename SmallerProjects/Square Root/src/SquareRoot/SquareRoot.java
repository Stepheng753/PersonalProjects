package SquareRoot;
import java.lang.Math;

/**
 Program: SquareRoot.SquareRoot
 Description :
 You need to write a program to calculate the square root of a number without using the Math.sqrt() function of JDK.
 You need to write your logic and method to calculate the square root. You can though use the popular algorithm, like Newton's method

 @author : Stephen Giang
 @date December 31, 2019
 **/

public class SquareRoot {

    double number;
    double tol;

    public SquareRoot (double number, double tol) {
        if (number >= 0) {
            this.number = number;
            this.tol = tol;
            System.out.println("Square Root of " + this.number + " is: " + findSqrt(this.number,0, Math.ceil(this.number), 1));

        }
        else {
            this.number = -1 * number;
            this.tol = tol;
            System.out.println("Square Root of " + number + " is: " + findSqrt(this.number, 0, Math.ceil(this.number), 1) + "i");
        }
    }

    public double findSqrt (double number, double start, double end, double inc) {
        double i = start;
        try {
            if (((number > 1) &&  isPrime(number) == true)) {
                return fastButInaccurate(0,number, number);
            }
            else {
                while (i <= end) {
                    double i2 = i * i;
                    double difference = i2 - number;
                    double absDifference = difference;

                    // Takes Absolute Value of the difference
                    if (difference < 0) {
                        absDifference = difference * -1;
                    }

                    // If Distance is within tol, return that value
                    if (absDifference <= tol) {
                        return i;
                    }

                    // Simplifies Radical
                    if (i > 1 && number % i2 == 0 && i % 1 == 0) {
                        int newNum = (int) (number / i2);
                        return i * findSqrt(newNum, start, end, inc);
                    }

                    // Breaks Down Radical
                    if (i > 1 && number % i == 0 && number != i && i % 1 == 0) {
                        int num1 = (int) (number / i);
                        int num2 = (int) i;
                        return findSqrt(num1, start, end, inc) * findSqrt(num2, start, end, inc);
                    }

                    // Checks Smaller Interval with Different Increment
                    if (difference > tol) {
                        return findSqrt(number, i - inc, i, inc / 2);
                    }

                    i += inc;
                }
            }
        } catch (StackOverflowError e) {
            tol *= 10;
            return findSqrt(number, 0, number, 1);
        }

        System.out.println("Error!");
        return 0;
    }

    public double fastButInaccurate(double start, double end, double number) {
        double mid = (end + start) / 2;
        double mid2 = mid*mid;
        double difference = mid2 - number;
        double absdiff = difference;
        if (absdiff < 0) {  absdiff *= -1; }

        if (absdiff <= tol) { return mid; }

        if (difference > tol) { return fastButInaccurate(start,mid, number); }

        if (difference < tol) { return fastButInaccurate(mid,end, number); }

        else {
            System.out.println("ERROR!");
            System.exit(1);
            return 0;
        }
    }

    public boolean isPrime (double number) {
        for (int i = 2; i < number / 2; i++) {
            if (number % i == 0) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        double tol = 1E-15;
        long start = System.nanoTime();
        start /= 1E9;
        for (int i = 0; i<= 500; i++) {
            new SquareRoot(i,tol);
        }
        long end = System.nanoTime();
        end /= 1E9;
        System.out.println("Time: " + (end - start + " seconds"));
    }
}
