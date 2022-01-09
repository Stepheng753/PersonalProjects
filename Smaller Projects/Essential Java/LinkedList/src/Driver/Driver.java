package Driver;
import LinkedList.*;
import Node.Node;

public class Driver {

    public static void main(String[] args) {
        LinkedList <Double> list = new LinkedList <Double>();
        list.add(0.);
        list.add(1.);
        list.add(2.);
        list.add(3.);
        list.add(4.);
        list.add(5.);
        System.out.println(list.diagram());
        list.add(2.5,3);
        System.out.println();
        System.out.println(list.diagram());
        list.remove();
        System.out.println();
        System.out.println(list.diagram());
        list.remove(1);
        System.out.println();
        System.out.println(list.diagram());
        list.set(3.14,3);
        System.out.println();
        System.out.println(list.diagram());
        list.remove(0);
        System.out.println();
        System.out.println(list.diagram());
        for (double i = 0; i < 100; i++) {
            list.add(i);
        }
        System.out.println();
        System.out.println(list.diagram());


    }
}
