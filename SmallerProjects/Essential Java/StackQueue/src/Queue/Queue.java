package Queue;

public interface Queue <T>{

    // This will insert to back of Queue
    public void enqueue(T element);

    // This will remove and return front of Queue
    public T dequeue();

    // This will dequeue all elements in Queue
    public void dequeueAll();

    // This will return and not remove the front of the Queue
    public T peek();

    // Returns true if empty
    public boolean isEmpty();




}
