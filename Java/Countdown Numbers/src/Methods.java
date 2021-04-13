
import java.util.ArrayList;
import java.util.Collections;
import java.util.Random;
import java.util.Scanner;

public class Methods
{
    static Random rand = new Random();
    static Scanner input = new Scanner(System.in);

    static int [] largeNum = {25 , 50, 75, 100};
    static int [] smallNum = { 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10};
    static int [] numbers = new int [6];

    static String again;
    static int amtOfLargeNum;
    static int randomNum;

    static ArrayList<Integer> largeNumIndex = new ArrayList<>();
    static ArrayList <Integer> smallNumIndex = new ArrayList<>();

    public static void welcome()
    {
        System.out.println("\nWelcome to Countdown Numbers Game!");
        System.out.println(repeat('\u2014', 54) + "\n");
    }

    public static void rules()
    {
        System.out.println("Would You Like to Go Over the Rules ?");
        System.out.print("Type \"Yes\" or \"No\": ");
        String answer = input.next();
        if (answer.equalsIgnoreCase("Yes") || answer.equalsIgnoreCase("Y"))
        {
            System.out.println(
                    "\nThe rules are: \n" +
                            "There are Large Numbers and Small Numbers \n" +
                            "Large Numbers consist of {25 , 50, 75, 100} \n" +
                            "Small Numbers consist of { 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10} \n" +
                            "The User will choose out of 6, how many Large and Small Numbers \n" +
                            "Then they will choose how many Large Numbers they want ( zero to four ) \n" +
                            "From the number given, the computer will choose that number of random large numbers \n" +
                            "The computer will then choose the remaining out of 6 random small numbers \n" +
                            "Lastly, the computer will show a random 3 Digit Number \n" +
                            "The goal is to stitch together the 6 numbers with the 4 basic operations ( +, -, *, /) \n" +
                            "to equal the random 3 digit number");
            System.out.println("\n" + repeat('\u2014', 54));
        }
    }

    public static void getAmtOfLargeNum()
    {
        System.out.print("\nHow Many Large Numbers Would You Like: ");
        amtOfLargeNum = input.nextInt();
    }

    public static void createIndices()
    {
        largeNumIndex.clear();
        for (int i = 0; i < 4; i ++) {
            largeNumIndex.add(i);
        }
        Collections.shuffle(largeNumIndex);

        smallNumIndex.clear();
        for (int i = 0; i < 20; i ++) {
            smallNumIndex.add(i);
        }
        Collections.shuffle(smallNumIndex);

    }

    public static void setNumbersArray ()
    {
        if (amtOfLargeNum > 0)
        {
            for (int i = 0; i < amtOfLargeNum; i++) {
                numbers[i] = largeNum[largeNumIndex.get(i)];
            }
        }

        for (int i = amtOfLargeNum; i <= 6 - 1; i++) {
            numbers[i] = smallNum[smallNumIndex.get(i)];
        }
    }

    public static void printLargeNumbers()
    {
        System.out.print("Large Numbers are: { ");

        if (amtOfLargeNum > 0)
        {
            for (int i = 0; i < amtOfLargeNum - 1; i++) {
                System.out.print(numbers[i] + ", ");
            }
            System.out.println(numbers[amtOfLargeNum - 1] + " }\n");
        }
        else {
            System.out.println("  } \n");
        }
    }

    public static void printSmallNumbers ()
    {
        int amtOfSmallNum = 6 - amtOfLargeNum;
        System.out.println("Amount of Small Numbers: " + amtOfSmallNum);
        System.out.print("Small Numbers are: { ");

        for (int i = amtOfLargeNum; i < 6 - 1; i++) {
            System.out.print(numbers[i] + ", ");
        }
        System.out.println(numbers[6 - 1] + " }\n");
    }

    public static void printRandomNumber ()
    {
        randomNum = rand.nextInt(999 - 100 + 1) + 100;
        System.out.println("Your Random Number is: " + randomNum);
    }

    public static void printNumbersArray()
    {
        System.out.print("Numbers are: { ");

        for (int i = 0; i < numbers.length - 1; i++) {
            System.out.print(numbers[i] + ", ");
        }
        System.out.println(numbers[5] + " }");
    }

    public static void playAgain()
    {
        System.out.println("\nWould You Like to Play Again");
        System.out.print("Type \"Yes\" or \"No\": ");
        again = input.next();
        System.out.println("\n" + repeat('\u2014', 54));
    }


    public static String repeat(char letter, int numOfRepeats)
    {
        String repeatedStr = "";

        for (int i = 0; i < numOfRepeats; i++) {
            repeatedStr = repeatedStr + letter;
        }
        return repeatedStr;
    }

}
