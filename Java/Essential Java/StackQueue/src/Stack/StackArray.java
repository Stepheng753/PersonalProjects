package Stack;

/**
 Program: StackArray
 Description : Array Implementation of Stack.Stack
 @author : Stephen Giang
 @date February 21, 2020
 **/

public class StackArray <T> implements Stack<T> {

    int size;
    int topIndex;
    Object [] stackArray;

    public StackArray(int size) {
        this.size = size;
        topIndex = -1;
        stackArray = new Object[this.size];
    }

    @Override
    public void push(T element) {
        try {
            if (!isFull()) {
                topIndex++;
                stackArray[topIndex] = element;
            } else {
                throw new Exception();
            }
        } catch (Exception overFlow) {
            System.out.println("Stack is Full!");
        }
    }

    @Override
    public T pop() {
        try {
            if (!isEmpty()) {
                return (T) stackArray[topIndex--];
            }
            else {
                throw new Exception();
            }
        } catch (Exception underFlow) {
            System.out.println("Stack is Empty!");
            return null;
        }
    }

    @Override
    public void popAll () {
        for (int i = topIndex; i >= 0; i--) {
            System.out.println(pop());
        }
    }

    @Override
    public T peek() {
        try {
            if (!isEmpty()) {
                return (T) stackArray[topIndex];
            }
            else {
                throw new Exception();
            }
        } catch (Exception underFlow) {
            System.out.println("Stack is Empty!");
            return null;
        }
    }

    @Override
    public boolean isEmpty() {
        return (topIndex < 0);
    }

    public boolean isFull () {
        return (topIndex >= size-1);
    }

    @Override
    public int search(T element) {
        int position = 1;
        for (int i = topIndex; i >= 0; i--) {
            if (stackArray[i] == element) {
                return position;
            }
            position++;
        }

        try {
            if (position >= size) {
                throw new Exception();
            }
        } catch (Exception notFound){
            System.out.println("Element: " + element + " not Found!");
        }
        return -1;
    }
}
