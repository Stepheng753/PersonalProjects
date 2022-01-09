import java.util.Scanner;
public class RothIRA
{

    static double contribution = 0;
    static double totalContribution = 0;
    static double preferredRetirementAge = 65;
    static double currentAge = 20;
    static double retirementPlan = 0.0;
    static double rate = 1.08;
    static Scanner input = new Scanner(System.in);

    public static void main(String[] args) {
        Input();
        Display();
    }

    public static void Input(){

        // Introduction
        System.out.println("\nWelcome to Roth IRA Calculator!");
        System.out.printf("Average Rate of S&P 500: %.3f",(rate - 1)*100);
        System.out.println("% \nMax Contribution (Age < 50): $6000 ");
        System.out.println("Max Contribution (Age >= 50): $7000 ");
        System.out.println();

        //Input Age
        System.out.print("Enter in Age: ");
        currentAge = input.nextDouble();

        //Error Check
        while (currentAge <= 0) {
            System.out.println("Age cannot be less than 0");
            System.out.print("Enter in Age: ");
            currentAge = input.nextDouble();
        }

        // Input Retirement Age
        System.out.print("Enter in Preferred Retirement Age: ");
        preferredRetirementAge = input.nextDouble();

        // Error Check
        while (preferredRetirementAge <= currentAge) {
            System.out.println("Cannot Retire at an Age Younger than Current");
            System.out.print("Enter in Preferred Retirement Age: ");
            preferredRetirementAge = input.nextDouble();
        }

    }

    public static void Display () {

        System.out.print("Enter in How Much Money You Would Like to Contribute Each Year: ");
        contribution = input.nextDouble();

        //Error Checking
        while ((contribution > 6000 && currentAge < 50) || (contribution > 7000 || contribution <= 0 ) ) {
            System.out.println("Invalid Contribution");
            System.out.print("Enter in How Much Money You Would Like to Contribute Each Year: ");
            contribution = input.nextDouble();
        }

        // Contribution Change at age 50
        for (int i = (int)currentAge; i <= preferredRetirementAge; i++) {

            // Displays Age # and Savings
            retirementPlan += contribution;
            retirementPlan *= rate;
            String retirePlanString = String.format("$%,.2f", retirementPlan);
            System.out.print("Age " + i);
            System.out.print(": Retirement Savings: " +  retirePlanString);
            System.out.println();
            totalContribution += contribution;
        }

        // Displays Total Contribution and Total Gain
        System.out.printf("\nTotal Contribution: $%,.2f",totalContribution);
        String gain = "\033[0;1m" + String.format("$%,.2f", retirementPlan - totalContribution);
        System.out.println("\nTotal Gain: " + gain);
    }



}
