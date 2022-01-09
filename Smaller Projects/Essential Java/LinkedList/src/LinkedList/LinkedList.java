package LinkedList;
import Node.*;

public class LinkedList <T> implements List <T> {

    int size;
    Node <T> head;
    Node <T> lastNode;

    public LinkedList () {
        size = 0;
        head = null;
        lastNode = null;
    }

    @Override
    public boolean isEmpty() {
        return (size == 0);
    }

    @Override
    public void add(T data) {
        try {
            if (data == null) {
                throw new Exception("Cannot insert Null Values!");
            }
            Node<T> addNode = new Node<>(data);
            if (isEmpty()) {
                head = addNode;
                lastNode = head;
            }
            if (!isEmpty()) {
                addNode.setPrevNode(lastNode);
            }
            lastNode.setNextNode(addNode);
            lastNode = addNode;
            size++;
        } catch (Exception indexError) {
            System.out.println(indexError.getMessage());
        }
    }

    @Override
    public void add(T data, int index) {
        try {
            if (data == null) {
                throw new Exception("Cannot insert Null Values!");
            }
            else if (index == size) {
                add(data);
            }
            else if (index < 0 || index > size) {
                throw new Exception("Index is Out of Bounds!");
            }
            else if (index == 0) {
                Node<T> addNode = new Node<>(data);
                head.setPrevNode(addNode);
                addNode.setNextNode(head);
                head = addNode;
                size++;
            }
            else {
                Node<T> addNode = new Node<>(data);
                Node<T> currNode = head;
                for (int i = 0; i < index; i++) {
                    currNode = currNode.getNextNode();
                }
                currNode.getPrevNode().setNextNode(addNode);
                addNode.setPrevNode(currNode.getPrevNode());
                currNode.setPrevNode(addNode);
                addNode.setNextNode(currNode);
                size++;
            }
        } catch (Exception indexError) {
            System.out.println(indexError.getMessage());
        }
    }

    @Override
    public T remove () {
        T returnData = lastNode.getData();
        lastNode.getPrevNode().setNextNode(null);
        lastNode = lastNode.getPrevNode();
        size--;

        return returnData;
    }

    @Override
    public T remove(int index) {
        try {
            if (index == size) {
                return remove();
            }
            else if (index < 0 || index > size) {
                throw new Exception("Index is Out of Bounds!");
            }
            else if (index == 0) {
                T returnData = head.getData();
                head.getNextNode().setPrevNode(null);
                head = head.getNextNode();
                size--;
                return returnData;
            }
            else {
                Node<T> currNode = head;
                for (int i = 0; i < index; i++) {
                    currNode = currNode.getNextNode();
                }
                T returnData = currNode.getData();
                currNode.getPrevNode().setNextNode(currNode.getNextNode());
                currNode.getNextNode().setPrevNode(currNode.getPrevNode());
                size--;
                return returnData;
            }
        } catch (Exception indexError) {
            System.out.println(indexError.getMessage());
            return null;
        }
    }

    @Override
    public T peek () {
        return lastNode.getData();
    }

    @Override
    public T peek(int index) {
        try {
            if (index < 0 || index > size) {
                throw new Exception("Index is Out of Bounds!");
            }
            else {
                Node<T> currNode = head;
                for (int i = 0; i < index; i++) {
                    currNode = currNode.getNextNode();
                }
                return currNode.getData();
            }
        } catch (Exception indexError) {
            System.out.println(indexError.getMessage());
            return null;
        }
    }

    @Override
    public void set(T data, int index) {
        try {
            if (index < 0 || index > size) {
                throw new Exception("Index is Out of Bounds!");
            }
            else {
                Node<T> currNode = head;
                for (int i = 0; i < index; i++) {
                    currNode = currNode.getNextNode();
                }
                currNode.setData(data);
            }
        } catch (Exception indexError) {
            System.out.println(indexError.getMessage());
        }
    }

    @Override
    public int getSize() {
        return size;
    }

    @Override
    public String toString () {
        Node <T> currNode = head;
        String display = "[ \n" + head.toString();

        while (currNode.getNextNode() != null) {
            currNode = currNode.getNextNode();
            display = display.concat("\n" + currNode.toString());
        }
        display = display.concat("]");

        return display;
    }

    public String diagram () {
        Node <T> currNode = head;
        String display = "Size: " + getSize() + "\n";
        String currLine = "[ " + head.getData().toString() + " ]";

        while (currNode.getNextNode() != null) {
            if (currLine.length() >= 60) {
                display = display.concat(currLine + "\n");
                currLine = "";
            }
            currNode = currNode.getNextNode();
            currLine = currLine.concat (" ---> [ " + currNode.getData().toString() + " ]");
        }
        display = display.concat(currLine + "\n");
        return display;
    }


}
