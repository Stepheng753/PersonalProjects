package Search;
import Application.PrintArray;

/**
 Program: LinearSearch
 Description : Tests out Linear Search
 @author : Stephen Giang
 @date January 19, 2020
 **/
public class LinearSearch <T extends Comparable> {

    T [] searchArray;
    T searchParam;
    String [] printArray;

    public LinearSearch (T [] searchArray, T searchParam) {
        this.searchParam = searchParam;
        this.searchArray = searchArray;
        setPrintArray();
        linSearch();
    }

    public void setPrintArray () {
        printArray = new String[searchArray.length];
        for (int i = 0; i < searchArray.length; i++) {
            printArray[i] = searchArray[i].toString();
        }
    }

    public void linSearch () {
        new PrintArray<>(printArray);

        int foundIndex = -1;
        int repeats = 0;
        for (int i = 0; i < searchArray.length; i++) {
            if (searchArray[i].compareTo(searchParam) == 0 && repeats == 0) {
                foundIndex = i;
                repeats++;
                System.out.println("\"" + searchParam + "\" was found at Index: " + foundIndex );
                printArray[i] = "{" + searchArray[i] + "}";
            }
            else if (searchArray[i].compareTo(searchParam) == 0 && repeats > 0) {
                foundIndex = i;
                repeats++;
                System.out.println("\"" + searchParam + "\" was also found at Index: " + foundIndex );
                printArray[i] = "{" + searchArray[i] + "}";
            }
        }
        if (foundIndex == -1) {
            System.out.println("\"" + searchParam + "\" was NOT found within the array");
        }

        new PrintArray<>(printArray);
    }

}
