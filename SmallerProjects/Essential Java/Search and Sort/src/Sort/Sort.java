package Sort;

import Application.*;

public abstract class Sort < T extends Comparable > {

    T [] ogArray;
    T [] ascendArray;
    T [] descendArray;

    public Sort (T [] ogArray) {
        this.ogArray = ogArray;
        setArrays();

        System.out.println("Original Array: ");
        new PrintArray<>(this.ogArray);

        System.out.println("Ascend Sorted Array: ");
        new PrintArray <>(ascendSort());

        System.out.println("Descend Sorted Array: ");
        new PrintArray <>(descendSort());

    }


    public void setArrays () {
        ascendArray = ogArray.clone();
        descendArray = ogArray.clone();
    }


    public abstract T [] ascendSort ();
    public abstract T [] descendSort ();

}
