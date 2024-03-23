package Sort;

/**
 Program: InsertionSort
 Description : Tests out Insertion Sort
 Runtime = (n**2 - n ) / 2  -  O(N**2)
 @author : Stephen Giang
 @date January 20, 2020
 **/
public class InsertionSort <T extends Comparable> extends Sort <T> {

    T key;
    int prevIndex;

    public InsertionSort (T [] ogArray) {
        super(ogArray);
    }


    @Override
    public T [] ascendSort () {
        for (int i = 1; i < ascendArray.length; i++) {
            key = ascendArray[i];
            prevIndex = i - 1;

            // If Previous is Greater than Key, then Shift
            while (prevIndex >= 0 && ascendArray[prevIndex].compareTo(key) > 0) {
                ascendArray[prevIndex + 1] = ascendArray[prevIndex];    // Shifts Greater Elements to the Right
                prevIndex--;    // Compare the Key with the Rest of Prev Indices
            }

            // Inserts Key into the Sorted Array
            ascendArray[prevIndex + 1] = key;
        }
        return ascendArray;
    }


    @Override
    public T [] descendSort () {
        for (int i = 1; i < descendArray.length; i++) {
            key = descendArray[i];
            prevIndex = i - 1;

            // If Previous is Less than Key, then Shift
            while ( prevIndex >= 0 && descendArray[prevIndex].compareTo(key) < 0) {
                descendArray[prevIndex + 1] = descendArray[prevIndex];  // Shifts Lesser Elements to the Right
                prevIndex--;    // Compare the Key with the Rest of Prev Indices
            }

            // Inserts Key into the Sorted Array
            descendArray[prevIndex + 1] = key;
        }
        return descendArray;
    }
}
