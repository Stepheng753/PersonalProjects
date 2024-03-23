package Node;

public class Node <T> {

    T data;
    private Node <T> nextNode;
    private Node <T> prevNode;

    public Node (T data) {
        this.data = data;
        this.nextNode = null;
        this.prevNode = null;
    }

    public Node (T data, Node <T> nextNode) {
        this.data = data;
        this.nextNode = nextNode;
        this.prevNode = null;
    }

    public Node (T data, Node <T> nextNode, Node <T> prevNode) {
        this.data = data;
        this.nextNode = nextNode;
        this.prevNode = prevNode;
    }

    public void setData (T data) {
        this.data = data;
    }

    public T getData () {
        return data;
    }

    public void setNextNode (Node <T> nextNode) {
        this.nextNode = nextNode;
    }

    public Node <T> getNextNode () {
        return nextNode;
    }

    public void setPrevNode (Node <T> prevNode) {
        this.prevNode = prevNode;
    }

    public Node <T> getPrevNode () {
        return prevNode;
    }

    @Override
    public String toString () {
        String nodeData;
        String nextData;
        String prevData;

        try {
            nodeData = getData().toString();
        } catch (NullPointerException nullPointer) {
            nodeData = "Null";
        }

        try {
            nextData = getNextNode().getData().toString();
        } catch (NullPointerException nullPointer) {
            nextData = "Null";
        }

        try {
            prevData = getPrevNode().getData().toString();
        } catch (NullPointerException nullPointer) {
            prevData = "Null";
        }

        String display =
                "Prev Node Data: " + prevData + "\n" +
                "Node Data: " + nodeData + "\n" +
                "Next Node Data: " + nextData + "\n";


        return display;
    }
}
