/**
 Program: StringPalindrome

 Description :
 You need to write a simple Java program to check if a given String is palindrome or not.
 A Palindrome is a String which is equal to the reverse of itself, e.g., "Bob" is a palindrome because of the reverse of "Bob" is also "Bob."
 Though be prepared with both recursive and iterative solution of this problem.
 The interviewer may ask you to solve without using any library method, e.g. indexOf() or subString() so be prepared for that.

 @author : Stephen Giang
 @date December 28, 2019
 **/

public class StringPalindrome extends ReverseString{

    String stringCheck;

    /**
     * Sets the stringCheck to the Parameter
     * @param stringCheck
     */
    public StringPalindrome(String stringCheck) {
        super(stringCheck);
        this.stringCheck = stringCheck;
    }


    /**
     * Checks if first char and last char are equal, and works inwards
     * @return boolean
     */
    public boolean arrayCheck () {
        int i = 0;
        int j = stringCheck.length() - 1;
        char [] letters = stringCheck.toLowerCase().toCharArray();

        // For even lengths
        if (stringCheck.length() % 2 == 0) {
            while (j > i) {
                // If any of the corresponding letters are not equal, then not Palindrome
                if (letters[i++] != letters[j--]) {
                    System.out.println("arrayCheck: " + stringCheck + ": is NOT a Palindrome!");
                    return false;
                }
            }
        }
        // For odd lengths
        else {
            while (j != i) {
                // If any of the corresponding letters are not equal, then not Palindrome
                if (letters[i++] != letters[j--]) {
                    System.out.println("arrayCheck: " + stringCheck + ": is NOT a Palindrome!");
                    return false;
                }
            }
        }

        // If all corresponding letters are equal, then Palindrome
        System.out.println("arrayCheck: " + stringCheck + ": is a Palindrome!");
        return true;
    }


    /**
     * Checks if the first half of the String = the second half of String
     * @return boolean
     */
    public boolean substringCheck () {
        int j = 0;
        char [] secondHalf = new char[stringCheck.length() / 2];
        char [] charArray = stringCheck.toCharArray();

        // Makes an array of the second half of String in reverse
        if (stringCheck.length() % 2 == 0) {
            // Indices go from Last to the greater middle index
            for (int i = stringCheck.length() - 1; i >= stringCheck.length() / 2; i--) {
                secondHalf[j++] = charArray[i];
            }
        }
        else {
            // Indices exclude the Middle Index
            for (int i = stringCheck.length() - 1; i >= (stringCheck.length() + 1 ) / 2; i--) {
                secondHalf[j++] = charArray[i];
            }
        }

        // If the substrings are equal, then Palindrome
        if (stringCheck.substring(0,(stringCheck.length() / 2) ).equalsIgnoreCase(String.valueOf(secondHalf))) {
            System.out.println("substringCheck: " + stringCheck + ": is a Palindrome!");
            return true;
        }
        // If the substrings are not equal, then not Palindrome
        else {
            System.out.println("substringCheck: " + stringCheck + ": is NOT a Palindrome!");
            return false;
        }
    }

    /**
     * Checks if the word backwards is the same as the word forward
     * @return boolean
     */
    public boolean reverseCheck () {
        if (stringCheck.equalsIgnoreCase(reversal())) {
            System.out.println("reverseCheck: " + stringCheck + ": is a Palindrome!");
            return true;
        }
        else {
            System.out.println("reverseCheck: " + stringCheck + ": is NOT a Palindrome!");
            return false;
        }
    }

    public static void main(String[] args) {
        StringPalindrome stringPalindrome = new StringPalindrome("Sam");
        stringPalindrome.arrayCheck();
        stringPalindrome.substringCheck();
        stringPalindrome.reverseCheck();
    }




}
