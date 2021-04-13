package Sort;
import Application.*;

/**
 Program: Sort.BubbleSort
 Description : Tests out Bubble Sort
 Runtime = (n**2 - n ) / 2  -  O(N**2)
 @author : Stephen Giang
 @date January 18, 2020
 **/
public class BubbleSort <T extends Comparable> extends Sort <T> {


    public BubbleSort (T [] ogArray) {
        super(ogArray);
    }


    @Override
    public T [] ascendSort() {
        // Compares One Element to the Rest
        for (int i = 0; i < ascendArray.length - 1; i++) {
            // Loops through the rest
            for (int j = i+1; j < ascendArray.length; j++) {
                // If the Element is Bigger than the next Elements, then swap
                if (ascendArray[i].compareTo(ascendArray[j]) > 0) {
                    new Swap<>(ascendArray, i, j);
                }
            }
        }
        return ascendArray;
    }


    @Override
    public T [] descendSort () {
        // Compares One Element to the Rest
        for (int i = 0; i < descendArray.length - 1; i++) {
            // Loops through the rest
            for (int j = i+1; j < descendArray.length; j++) {
                // If the Element is smaller than the next Elements, then swap
                if (descendArray[i].compareTo(descendArray[j]) < 0) {
                    new Swap<>(ascendArray, i, j);
                }
            }
        }
        return descendArray;
    }
}
