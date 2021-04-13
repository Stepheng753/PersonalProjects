/**
 * Program: DuplicateArray
 *
 * Description :
 * Write a program to remove duplicates from an array in Java without using the Java Collection API.
 * The array can be an array of String, Integer or Character, your solution should be independent of the type of array.
 *
 * @author : Stephen Giang
 * @date December 30, 2019
 **/
public class DuplicateArray<T> {
    T [] arrayCheck;

    public DuplicateArray (T[] arrayCheck) {
        this.arrayCheck = arrayCheck;
    }

    public T [] ridDuplicates () {
        for (int i = 0; i < arrayCheck.length - 1; i++) {
            for (int j = i + 1; j < arrayCheck.length; j++) {
                if (arrayCheck[i].equals(arrayCheck[j])) {
                    removeIndex(j);
                }
            }
        }
        System.out.print("[ ");
        for (int i = 0; i < arrayCheck.length - 1; i++) {
            System.out.print(arrayCheck[i] + ", ");
        }
        System.out.println(arrayCheck[arrayCheck.length - 1] + " ]");

        return arrayCheck;
    }

    public void removeIndex (int index) {
        T [] newArray = (T []) new Object[arrayCheck.length - 1];
        int j = 0;

        for (int i = 0; i < arrayCheck.length ; i++) {
            if (i != index) {
                newArray[j++] = arrayCheck[i];
            }
        }
        arrayCheck = (T[]) new Object[newArray.length];

        for (int i = 0; i < arrayCheck.length; i++) {
            arrayCheck[i] = newArray[i];
        }
    }

    public static void main(String[] args) {
        Object [] arr = new Object[]{1, 2, 3, 1, 4, 2, 5, 3, 6};
        DuplicateArray duplicateArray = new DuplicateArray(arr);
        duplicateArray.ridDuplicates();
    }

}
