import java.util.Scanner;

public class CollegeFund
{

    static double principal;
    static double totalPrincipal;
    static double rate = 1.053;
    static double childAge = 0;
    static double collegeFund = 0;
    static Scanner input = new Scanner(System.in);

    public static void main(String[] args) {
        Input();
        Display();
    }

    public static void Input () {

        // Input Principal
        System.out.print("\nEnter in Principal: ");
        principal = input.nextDouble();

        // Error Check
        while (principal <= 0) {
            System.out.println("Cannot input less than 0 Dollars");
            System.out.print("Enter in Principal: ");
            principal = input.nextDouble();
        }

        // Input Age
        System.out.print("Enter in Child's Age: ");
        childAge = input.nextDouble();

        // Error Check
        while (childAge >= 18) {
            System.out.println("Child's Age: Invalid");
            System.out.print("Enter in Child's Age: ");
            childAge = input.nextDouble();
        }

        System.out.println();
    }

    public static void Display () {

        // Displays Age # and College Fund
        for (int i = (int)childAge; i <= 18; i++) {
            collegeFund += principal;
            collegeFund *= rate;
            totalPrincipal += principal;
            String collegeFundString = String.format("$%,.2f", collegeFund);
            System.out.print("Year " + i );
            System.out.print(": College Fund: " + collegeFundString);
            System.out.println();
        }

        // Displays Total Principal and Total Gain
        System.out.printf("\nTotal Contribution: $%,.2f",totalPrincipal);
        String gain = "\033[0;1m" + String.format("$%,.2f", collegeFund - totalPrincipal);
        System.out.println("\nTotal Gain: " + gain);

    }
}
