package Sort;

/**
 Program: SelectionSort
 Description : Tests out Selection Sort
 Runtime = (n**2 - n ) / 2  -  O(N**2)
 @author : Stephen Giang
 @date January 21, 2020
 **/
public class SelectionSort <T extends Comparable> extends Sort <T>{


    public SelectionSort(T [] ogArray) {
        super(ogArray);
    }


    @Override
    public T[] ascendSort () {
        for (int i = 0; i < ascendArray.length; i++) {
            T min = ascendArray[i];
            int minIndex = i;

            // Traverses to Find Minimum
            for (int j = i + 1; j < ascendArray.length; j++) {
                if (ascendArray[j].compareTo(min) < 0) {
                    min = ascendArray[j];
                    minIndex = j;
                }
            }

            // Swaps Minimum with Beginning of Unsorted subArray
            // Appends Min to Sorted Array
            ascendArray[minIndex] = ascendArray[i];
            ascendArray[i] = min;
        }
        return ascendArray;
    }


    @Override
    public T[] descendSort () {
        for (int i = 0; i < descendArray.length; i++) {
            T max = descendArray[i];
            int maxIndex = i;

            // Traverses to Find Minimum
            for (int j = i + 1; j < descendArray.length; j++) {
                if (descendArray[j].compareTo(max) > 0) {
                    max = descendArray[j];
                    maxIndex = j;
                }
            }

            // Swaps Minimum with Beginning of Unsorted subArray
            // Appends Min to Sorted Array
            descendArray[maxIndex] = descendArray[i];
            descendArray[i] = max;
        }
        return descendArray;
    }

}
