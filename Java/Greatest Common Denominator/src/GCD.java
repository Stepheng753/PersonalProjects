/**
 Program: GCD
 Description : Finds the GCD between 2 numbers
 @author : Stephen Giang
 @date December 31, 2019
 **/
public class GCD {

    int big;
    int small;

    public GCD (int num1, int num2) {
        if (num1 >= num2) {
            big = num1;
            small = num2;
        }
        else {
            small = num1;
            big = num2;
        }
        System.out.println("Brute GCD: " + bruteForce());
        System.out.println("Euclid GCD: " + euclid(big, small));
    }

    public int bruteForce () {
        int gcd = 1;

        if (big == small) {
            System.out.println("GCD: " + big);
        }

        for (int i = 2; i <= small; i++) {
            if (big % i == 0 && small % i == 0) {
                gcd = i;
            }
        }
        return gcd;
    }

    public int euclid (int big, int small) {
        if (small == 0) {
            return big;
        }
        return euclid(small, big % small);
    }

    public static void main(String[] args) {

        GCD gcd = new GCD(1264, 54);
    }
}
