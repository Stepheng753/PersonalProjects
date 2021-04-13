package SquareRoot;

public class Joel {

    int number;
    double tol;

    public Joel (int number, double tol) {
        if (number >= 0) {
            this.number = number;
            this.tol = tol;
            System.out.println("Square Root of " + this.number + " is: " + findSqrt(0,this.number));

        }
        else {
            this.number = -1 * number;
            this.tol = tol;
            System.out.println("Square Root of " + number + " is: " + findSqrt(0,this.number) + "i");
        }
    }

    public double findSqrt (double start, double end) {
        double mid = (end + start) / 2;
        double mid2 = mid*mid;
        double difference = mid2 - number;
        double absdiff = difference;
        if (absdiff < 0) {
            absdiff *= -1;
        }
        if (absdiff <= tol) {
            return mid;
        }
        if (difference > tol) {
            return findSqrt(start,mid);
        }
        if (difference < tol) {
            return findSqrt(mid,end);
        }
        else {
            System.out.println("ERROR!");
            System.exit(1);
            return 0;
        }
    }

    public static void main(String[] args) {
        double tol = 1E-13;
        long start = System.nanoTime();
        start /= 1E9;
        for (int i = 9; i <= 100; i++) {
            new Joel(i,tol);
        }
        long end = System.nanoTime();
        end /= 1E9;
        System.out.println("Time: " + (end - start + " seconds"));
    }

}
