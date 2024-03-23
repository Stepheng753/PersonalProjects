package SquareRoot;

public class Internet {

    int number;

    public Internet (int number) {
        if (number >= 0) {
            this.number = number;
            System.out.println("Square Root of " + this.number + " is: " + internetMethod());

        }
        else {
            this.number = -1 * number;
            System.out.println("Square Root of " + number + " is: " + internetMethod() + "i");
        }
    }

    public double internetMethod () {
        double t;
        double sqrt = number / 2;

        do {
            t = sqrt;
            sqrt = (t + (number / t) )/ (2);
        } while (t != sqrt);

        return sqrt;
    }

    public static void main(String[] args) {
        long start = System.nanoTime();
        start /= 1E9;
        for (int i = 2; i <= 100000; i++) {
            new Internet(i);
        }
        long end = System.nanoTime();
        end /= 1E9;
        System.out.println("Time: " + (end - start + " seconds"));
    }
}
