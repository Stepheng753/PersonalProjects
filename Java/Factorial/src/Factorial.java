/**
 * Program: Factorial
 *
 * Description :
 * This is one of the simplest programs you can expect in interviews.
 * It is generally asked to see if you can code or not.
 * Sometimes interviewer may also ask about changing a recursive solution to iterative one or vice-versa
 *
 * @author : Stephen Giang
 * @date December 30, 2019
 **/
public class Factorial {

    public int recursiveCheck (int number) {
        int factorial;
        if (number == 1) {
            factorial = 1;
        }
        else {
            factorial = number * recursiveCheck(number - 1);
        }
        return factorial;
    }

    public int iterativeCheck (int number) {
        int factorial = 1;
        for (int i = number; i >= 1; i--) {
            factorial *= i;
        }
        return factorial;
    }

    public void printFactorial (int number) {
        System.out.println("Recursive: " + number + "! = " + recursiveCheck(number));
        System.out.println("Iterative: " + number + "! = " + iterativeCheck(number));
    }

    public static void main(String[] args) {
        Factorial factorial = new Factorial();
        factorial.printFactorial(5);
    }
}
