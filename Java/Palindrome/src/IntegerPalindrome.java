/**
 Program: IntegerPalindrome

 Description :
 This is generally asked as follow-up or alternative of the previous program.
 This time you need to check if given Integer is palindrome or not.
 An integer is called palindrome if it's equal to its reverse, e.g. 1001 is a palindrome,
 but 1234 is not because the reverse of 1234 is 4321 which is not equal to 1234.
 You can use divide by 10 to reduce the number and modulus 10 to get the last digit.
 This trick is used to solve this problem.

 @author : Stephen Giang
 @date December 28, 2019
 **/

public class IntegerPalindrome extends StringPalindrome{

    int numberCheck;        // Number to Check

    /**
     * Sets numberCheck and calls Super Constructor with Parameter ((String) numberCheck)
     * @param numberCheck
     */
    public IntegerPalindrome (int numberCheck) {
        super(String.valueOf(numberCheck));         // Allows for Class to use Super's methods by converting int to String
        this.numberCheck = numberCheck;             // Sets numberCheck to Parameter
    }


    /**
     * Reverses the numberCheck and see's if equal
     * @return boolean
     */
    public boolean divModCheck () {
        int reverse = 0;
        int numberCheckMod = numberCheck;

        while (numberCheckMod != 0) {
            int lastDigit = numberCheckMod % 10;                    // Takes Last Digit
            numberCheckMod = (numberCheckMod - lastDigit) / 10;     // Removes Last Digit
            reverse = (reverse + lastDigit) * 10;                   // Adds Last Digit, then multiplies by 10
        }
        reverse /= 10;                                              // Removes the last multiplication of 10

        // If numberCheck is the same as reverse, then Palindrome
        if (numberCheck == reverse) {
            System.out.println("divModCheck: " + numberCheck + ": is a Palindrome!");
            return true;
        }

        // If numberCheck is not the same as reverse, then not Palindrome
        else {
            System.out.println("divModCheck: " + numberCheck + ": is NOT a Palindrome!");
            return false;
        }

    }

    public static void main(String[] args) {
        IntegerPalindrome integerPalindrome = new IntegerPalindrome(1234321);
        integerPalindrome.arrayCheck();
        integerPalindrome.substringCheck();
        integerPalindrome.reverseCheck();
        integerPalindrome.divModCheck();
    }
}
