/**
 Program: ArmstrongNumber

 Description :
 A number is called an Armstrong number if it is equal to the cube of its every digit.
 For example, 153 is an Armstrong number because of 153= 1+ 125+27, which is equal to 1^3 + 5^3 + 3^3.
 You need to write a program to check if the given number is Armstrong number or not.

 @author : Stephen Giang
 @date December 29, 2019
 **/

import java.lang.Math;
public class ArmstrongNumber {

    int numberCheck;        // Number to Check

    /**
     * Sets the Number to Check
     * @param numberCheck
     */
    public ArmstrongNumber (int numberCheck) {
        this.numberCheck = numberCheck;
    }


    /**
     * Takes Last Digit, Cubes it, and Adds it with other Last Digits
     * @return boolean
     */
    public boolean lastDigitCheck () {
        int numberCheckMod = numberCheck;
        int calculatedNum = 0;

        // Takes Last Digit, Cubes it, and Adds it with other Last Digits
        while (numberCheckMod != 0) {
            int lastDigit = numberCheckMod % 10;                    // Takes the Last Digit
            calculatedNum += Math.pow(lastDigit, 3);                // Adds it with other Last Digits after cubing it
            numberCheckMod = (numberCheckMod - lastDigit) / 10;     // Removes Last Digit from numberCheck
        }

        // If Calculated Number = Original Number, then Armstrong Number
        if (numberCheck == calculatedNum) {
            System.out.println(numberCheck + ": is an Armstrong Number!");
            return true;
        }

        // If Calculated Number != Original Number, then NOT Armstrong Number
        else {
            System.out.println(numberCheck + ": is NOT an Armstrong Number!");
            return false;
        }
    }

    public static void main(String[] args) {
        ArmstrongNumber armstrongNumber = new ArmstrongNumber(370);
        armstrongNumber.lastDigitCheck();
    }


}
