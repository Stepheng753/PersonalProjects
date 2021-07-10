import java.lang.Math;

public class Scratch { 
    
    public Scratch(double num) {
        System.out.println("Actual Answer: " + Math.abs(num));
        System.out.println("My Answer: " + abs(num));
    }

    public double abs(double num) {
        return (num > 0 ? num : num * -1);
    }

    public static void main(String[] args) {
        new Scratch(5);
    }

}