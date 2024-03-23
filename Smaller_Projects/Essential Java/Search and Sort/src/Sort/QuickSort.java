package Sort;
import Application.*;

/**
 Program: QuickSort
 Description : Tests out Quick Sort
 @author : Stephen Giang
 @date January 21, 2020
 **/
public class QuickSort < T extends Comparable > extends Sort <T> {

    T pivot;

    public QuickSort (T [] ogArray) {
        super(ogArray);
    }


    public void QuickSortAscend(T [] array, int beginIndex, int endIndex) {
        if (endIndex > beginIndex) {
            int midpointIndex = (endIndex + beginIndex) / 2;

            // Moves the pivot to the far right, to traverse through last
            new Swap<>(array, midpointIndex, endIndex);
            pivot = array[endIndex];

            int lastBiggerIndex = beginIndex;
            int incrementer = beginIndex;
            while (incrementer <= endIndex) {
                // If element is bigger than pivot, traverse forward
                if (array[incrementer].compareTo(pivot) > 0) {
                    incrementer++;
                }
                // If element is smaller or same, switch it with most far left Bigger element
                else {
                    new Swap<>(array, incrementer, lastBiggerIndex);
                    incrementer++;
                    lastBiggerIndex++;
                }
            }

            // Repeat with the left elements and the right elements
            QuickSortAscend(array, beginIndex, lastBiggerIndex - 2);
            QuickSortAscend(array, lastBiggerIndex, endIndex);
        }
    }

    public void QuickSortDescend(T [] array, int beginIndex, int endIndex) {
        if (endIndex > beginIndex) {
            int midpointIndex = (endIndex + beginIndex) / 2;

            // Moves the pivot to the far right, to traverse through last
            new Swap<>(array, midpointIndex, endIndex);
            pivot = array[endIndex];

            int lastSmallerIndex = beginIndex;
            int incrementer = beginIndex;
            while (incrementer <= endIndex) {
                // If element is smaller than pivot, traverse forward
                if (array[incrementer].compareTo(pivot) < 0) {
                    incrementer++;
                }
                // If element is bigger or same, switch it with most far left Smaller element
                else {
                    new Swap<>(array, incrementer, lastSmallerIndex);
                    incrementer++;
                    lastSmallerIndex++;
                }
            }

            // Repeat with the left elements and the right elements
            QuickSortDescend(array, beginIndex, lastSmallerIndex - 2);
            QuickSortDescend(array, lastSmallerIndex, endIndex);
        }

    }

    @Override
    public T[] ascendSort() {
        QuickSortAscend(ascendArray, 0, ascendArray.length - 1);
        return ascendArray;
    }

    @Override
    public T[] descendSort() {
        QuickSortDescend(descendArray, 0, descendArray.length - 1);
        return descendArray;
    }
}
