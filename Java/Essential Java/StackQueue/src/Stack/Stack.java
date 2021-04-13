package Stack;

public interface Stack <T> {

    // This will insert to top of Stack
    public void push(T element);

    // This will remove and return element on top of Stack
    public T pop();

    // This will pop off all elements in Stack
    public void popAll ();

    // This will return and not remove the element on top of Stack
    public T peek();

    // Returns true if empty
    public boolean isEmpty();

    // Returns the position of an element with top of stack being 0
    public int search(T element);
}
