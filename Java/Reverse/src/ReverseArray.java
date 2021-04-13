import java.lang.reflect.Array;

/**
 Program: ReverseArray
 Description : Reverse an Array without creating a temporary buffer
 @author : Stephen Giang
 @date January 02, 2020
 **/
public class ReverseArray <T> {
    T [] array;

    public ReverseArray (T [] array) {
        this.array = array;
    }

    public T[] reverse () {
        printArray();
        for (int i = 0; i < array.length / 2; i++) {
            T temp = array [i];
            array[i] = array[array.length - 1 - i];
            array[array.length - 1 - i] = temp;
        }
        printArray();

        return array;
    }

    public void printArray () {
        System.out.print("[ ");
        for (int i = 0; i < array.length - 1; i++) {
            System.out.print( array[i] + ", ");
        }
        System.out.println(array[array.length - 1] + " ]");
    }

    public static void main(String[] args) {
        ReverseArray ra = new ReverseArray(new Object[]{1,2,3,4,5,6,7,8});
        ra.reverse();
    }
}
