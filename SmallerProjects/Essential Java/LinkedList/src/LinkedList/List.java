package LinkedList;

public interface List <T> {

    public boolean isEmpty ();
    public void add (T data);
    public void add (T data, int index);
    public T remove ();
    public T remove (int index);
    public T peek ();
    public T peek (int index);
    public void set (T data, int index);
    public int getSize ();

}
