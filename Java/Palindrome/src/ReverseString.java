/**
 * Program: ReverseString
 *
 * Description :
 * This problem is similar to the String Palindrome problem we have discussed above.
 * If you can solve that problem, you can solve this as well. You can use indexOf() or substring() to reverse a String or alternatively,
 * convert the problem to reverse an array by operating on character array instead of String.
 *
 * @author : Stephen Giang
 * @date December 30, 2019
 **/
public abstract class ReverseString {
    String reverseString;

    public ReverseString (String reverseString) {
        this.reverseString = reverseString;
    }

    public String reversal () {
        char [] letters = reverseString.toCharArray();
        char [] reverseArray = new char[reverseString.length()];
        int j = 0;

        for (int i = letters.length - 1; i >= 0; i--) {
            reverseArray[j++] = letters[i];
        }
        reverseString = String.valueOf(reverseArray);
        return reverseString;
    }
}
