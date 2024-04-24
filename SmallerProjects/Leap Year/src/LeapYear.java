/**
 Program: LeapYear
 Description : Leap Year
 = divisible by 400 or (divisible by 4 and not 100)
 = More than 365 days
 @author : Stephen Giang
 @date January 02, 2020
 **/

import java.util.Calendar;
public class LeapYear {
    int year;
    int daysOfYear;
    Calendar calendar = Calendar.getInstance();

    public LeapYear (int year) {
        this.year = year;
        setCalendar();
    }

    public void setCalendar () {
        calendar.set(Calendar.YEAR, year);
        daysOfYear = calendar.getActualMaximum(Calendar.DAY_OF_YEAR);
    }

    public boolean day366Check () {
        System.out.println("In " + year + ", there was " + daysOfYear + " days");
        System.out.println("Leap Years are determined by having more than 365 days");

        if (daysOfYear > 365) {
            System.out.println("So, " + year + " was a Leap Year!");
            return true;
        }
        else {
            System.out.println("So, " + year + " was NOT a Leap Year!");
            return false;
        }
    }

    public boolean divCheck () {
        System.out.println("Leap Years are determined by being divisible by 400, or by 4 and not 100");

        if (year % 400 == 0) {
            System.out.println("The Year, " + year + ", is divisible by 400, so it is a Leap Year!");
            return true;
        }
        else if ((year % 4 == 0) && (year % 100 != 0)) {
            System.out.println("The Year, " + year + ", is divisible by 4, but not by 100 so it is a Leap Year!");
            return true;
        }
        else {
            System.out.println("The Year, " + year + ", is not Divisible by 400, or by 4 and not 100 so it is NOT a Leap Year!");
            return false;
        }
    }

    public static void main(String[] args) {
        LeapYear year = new LeapYear(2003);
        year.day366Check();
        year.divCheck();
    }



}
