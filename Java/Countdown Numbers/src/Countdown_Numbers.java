
public class Countdown_Numbers extends Methods
{
    public static void main(String[] args)
    {
        welcome();
        rules();
        do {
            getAmtOfLargeNum();
            createIndices();
            setNumbersArray();
            printLargeNumbers();
            printSmallNumbers();
            printRandomNumber();
            printNumbersArray();
            playAgain();
        } while (again.equalsIgnoreCase("Yes") || again.equalsIgnoreCase("Y"));

    }

}