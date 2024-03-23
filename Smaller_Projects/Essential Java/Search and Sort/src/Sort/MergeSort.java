package Sort;

/**
 Program: MergeSort
 Description : Tests out Merge Sort
 @author : Stephen Giang
 @date January 21, 2020
 **/
public class MergeSort <T extends Comparable> extends Sort <T> {

    int valuesIndex = 0;

    public MergeSort (T [] ogArray) {
        super(ogArray);
    }


    public void mergeAscend(Object [] leftArray, Object [] rightArray, Object [] merged) {

        int leftLength = leftArray.length;
        int rightLength = rightArray.length;
        int leftIndex = 0;
        int rightIndex = 0;
        int mergedIndex = 0;

        // Keeps Incrementing until one array is fully traversed
        while (leftIndex < leftLength && rightIndex < rightLength) {
            // Because the arrays are of type Object, we typeCast them to T for Comparable
            T left = (T) leftArray[leftIndex];
            T right = (T) rightArray[rightIndex];

            // If Left is smaller, insert left and remove from leftArray
            if (left.compareTo(right) < 0) {
                merged[mergedIndex] = leftArray[leftIndex];
                leftIndex++;
            }
            // Else, insert right and remove from rightArray
            else {
                merged[mergedIndex] = rightArray[rightIndex];
                rightIndex++;
            }
            mergedIndex++;
        }

        // Fill in the rest with the NonEmpty Array
        while (leftIndex < leftLength) {
            merged[mergedIndex] = leftArray[leftIndex];
            mergedIndex++;
            leftIndex++;
        }
        while (rightIndex < rightLength) {
            merged[mergedIndex] = rightArray[rightIndex];
            mergedIndex++;
            rightIndex++;
        }
        valuesIndex++;
    }


    public void mergeDescend(Object [] leftArray, Object [] rightArray, Object [] merged) {

        int leftLength = leftArray.length;
        int rightLength = rightArray.length;
        int leftIndex = 0;
        int rightIndex = 0;
        int mergedIndex = 0;

        // Keeps Incrementing until one array is fully traversed
        while (leftIndex < leftLength && rightIndex < rightLength) {
            // Because the arrays are of type Object, we typeCast them to T for Comparable
            T lefty = (T) leftArray[leftIndex];
            T righty = (T) rightArray[rightIndex];

            // If Left is smaller, insert left and remove from leftArray
            if (lefty.compareTo(righty) > 0) {
                merged[mergedIndex] = leftArray[leftIndex];
                leftIndex++;
            }
            // Else, insert right and remove from rightArray
            else {
                merged[mergedIndex] = rightArray[rightIndex];
                rightIndex++;
            }
            mergedIndex++;
        }

        // Fill in the rest with the NonEmpty Array
        while (leftIndex < leftLength) {
            merged[mergedIndex] = leftArray[leftIndex];
            mergedIndex++;
            leftIndex++;
        }
        while (rightIndex < rightLength) {
            merged[mergedIndex] = rightArray[rightIndex];
            mergedIndex++;
            rightIndex++;
        }
    }


    public void split (Object [] array, int ascendDescend) {
        int arrayLength = array.length;

        if (arrayLength > 1) {
            int halfLength = arrayLength / 2;

            // Create two arrays to hold half of the Elements
            Object [] leftArray = new Object[halfLength];
            Object [] rightArray = new Object [arrayLength - halfLength];

            // Plug in Half of array to corresponding arrays
            for (int i = 0; i < halfLength; i++) { leftArray[i] = array[i]; }
            for (int i = halfLength; i < arrayLength; i++) { rightArray[i - halfLength] = array[i]; }

            // Splits Recursively
            valuesIndex = 0;
            split(leftArray, ascendDescend);
            split(rightArray, ascendDescend);

            // If ascendDescend >= 0, Ascend, else Descend
            if (ascendDescend >= 0) {
                mergeAscend(leftArray, rightArray, array);
            }
            else {
                mergeDescend(leftArray, rightArray, array);
            }
        }
    }


    @Override
    public T[] ascendSort() {
        split(ascendArray, 1);
        return ascendArray;
    }


    @Override
    public T[] descendSort() {
        split(descendArray, -1);
        return descendArray;
    }
}
