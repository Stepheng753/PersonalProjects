package Main;
import Queue.*;

public class Main {

    public static void main(String[] args) {
        QueueArray <Integer> queue = new QueueArray<Integer>(4);

        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
        queue.enqueue(4);
        queue.enqueue(4);
        queue.printAll();

        queue.dequeueAll();

        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
        queue.enqueue(4);
        queue.printAll();

        System.out.println(queue.dequeue());

        queue.enqueue(100);
        queue.printAll();
        System.out.println(queue.dequeue());
        queue.enqueue(200);
        queue.printAll();
        System.out.println(queue.peek());









    }
}
