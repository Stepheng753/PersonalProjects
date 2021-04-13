package Queue;
import Main.*;

public class QueueArray <T> implements Queue <T>{

    int size;
    int front;
    int rear;
    Object [] queueArray;

    public QueueArray (int size) {
        this.size = size;
        front = -1;
        rear = -1;
        queueArray = new Object[this.size];
    }

    @Override
    public void enqueue(T element) {
        try {
            if (isFull()) {
                throw new Exception();
            }
            // Circular Incrementer
            if (rear == (size - 1)) {
                rear = -1;
            }
            if (isEmpty()) {
                front++;
            }
            queueArray[++rear] = element;

        } catch (Exception overFlow) {
            System.out.println("Queue is Full!");
        }
    }

    @Override
    public T dequeue() {
        T dequeueValue;
        try {
            if (isEmpty()) {
                throw new Exception();
            }
            dequeueValue = (T) queueArray[front];
            if (front == rear) {
                front = -1;
                rear = -1;
                return dequeueValue;
            }
            if (front != (size - 1)) {
                front++;
            }
            else if (front == (size - 1)) {
                front = 0;
            }

        } catch (Exception underFlow) {
            System.out.println("Queue is Empty!");
            return null;
        }
        return dequeueValue;
    }

    @Override
    public void dequeueAll() {
        while (!isEmpty()){
            dequeue();
        }
    }

    @Override
    public T peek() {
        try {
            if (!isEmpty()) {
                return (T) queueArray[front];
            } else {
                throw new Exception();
            }
        } catch (Exception underFlow) {
            System.out.println("Queue is Empty!");
            return null;
        }

    }

    @Override
    public boolean isEmpty() {
        return (rear == -1 && front == -1);
    }

    public boolean isFull() {
        return ((front == rear + 1)||(front == 0 && rear == size - 1) || (rear == 0 && front == size - 1));
    }

    public void printAll () {
        new PrintArray(queueArray);
    }
}
