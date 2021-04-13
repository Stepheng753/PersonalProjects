package Application;
import Search.*;
import Sort.*;

public class Main <T>{
    static Integer [] numArray = new Integer[] {4, 73, 29, 19, 10, 10, 50};
    static Character [] charArray = new Character[] {'z', 'p', 'q', 'l', 'm' , 't'};
    static String [] stringArray = new String[] {"Chicken", "Broccoli", "Egg", "Salmon", "Rice"};

    public static void main(String[] args) {
        LinearSearch();
        BubbleSort();
        InsertionSort();
        SelectionSort();
        MergeSort();
        QuickSort();
    }

    public static void printDashes () {
        for (int i = 0; i < 15; i++) {
            System.out.print("\u2E3B");
        }
        System.out.println();
    }

    public static void LinearSearch () {
        System.out.println("Linear Search: ");
        new LinearSearch<>(numArray, 10);
        System.out.println();

        new LinearSearch<>(charArray, 'a');
        System.out.println();

        new LinearSearch<>(stringArray, "Chicken");
        printDashes();
    }

    public static void BubbleSort() {
        System.out.println("BubbleSort: ");
        new BubbleSort<>(numArray);
        System.out.println();

        new BubbleSort<>(charArray);
        System.out.println();

        new BubbleSort<>(stringArray);
        printDashes();
    }

    public static void InsertionSort () {
        System.out.println("InsertionSort: ");
        new InsertionSort<>(numArray);
        System.out.println();

        new InsertionSort<>(charArray);
        System.out.println();

        new InsertionSort<>(stringArray);
        printDashes();
    }

    public static void SelectionSort () {
        System.out.println("SelectionSort: ");
        new SelectionSort<>(numArray);
        System.out.println();

        new SelectionSort<>(charArray);
        System.out.println();

        new SelectionSort<>(stringArray);
        printDashes();
    }

    public static void MergeSort () {
        System.out.println("MergeSort: ");
        new MergeSort<>(numArray);
        System.out.println();

        new MergeSort<>(charArray);
        System.out.println();

        new MergeSort<>(stringArray);
        printDashes();
    }

    public static void QuickSort () {
        System.out.println("QuickSort: ");
        new QuickSort<>(numArray);
        System.out.println();

        new QuickSort<>(charArray);
        System.out.println();

        new QuickSort<>(stringArray);
        printDashes();
    }

}
