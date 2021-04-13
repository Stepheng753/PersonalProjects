import java.util.ArrayList;

enum Items {

    A1("Lays Original", 1.25,15),
    A2("Chester's Fries", 1.00, 15),
    A3("Kettle Jalapeno", 1.75, 15),
    A4("Ruffles Original Ridges", 1.25, 15),
    A5("Pringles Pizza", 1.25, 15),

    B1("Pretzels", 1.00, 15),
    B2("Cheez-Itz", 1.00,15),
    B3("Fritos Original", 1.25,15),
    B4("Doritos Cool Ranch", 1.50,15),
    B5("Sun Chips French Onion", 1.50,15),

    C1("Sour Punch Straws", 1.25, 15),
    C2("Mamba", 1.00,15),
    C3("Sour Patch Kids", 1.25,15),
    C4("Starbursts", 1.00,15),
    C5("Skittles", 1.00,15),

    D1("M&M's Peanuts", 1.25, 15),
    D2("Crunch Bar", 1.00,15),
    D3("Hershey's Almonds", 1.25,15),
    D4("Kit Kat", 1.25,15),
    D5("Twix Bar", 1.25,15),

    E1("Cup Noodles", 1.75, 15),
    E2("Grandma's Cookies", 1.75,15),
    E3("Donettes Fudge", 1.75,15),
    E4("Pocky Chocolate", 1.25,15),
    E5("Cinnamon Toast Crunch", 2.15,15);



    String name;
    double price;
    int inventory;
    Items (String name, double price, int inventory){
        this.name = name;
        this.price = price;
        this.inventory = inventory;
    }

    public String getName() { return name; }

    public double getPrice() { return price; }

    public int getInventory() { return inventory; }

    public void takeOne () { inventory -= 1; }
}

public class Choices {

    public Choices () {
        addItemsToRow();
        addRowsToMachine();
    }

    ArrayList<Items> RowA = new ArrayList<Items>();
    ArrayList<Items> RowB = new ArrayList<Items>();
    ArrayList<Items> RowC = new ArrayList<Items>();
    ArrayList<Items> RowD = new ArrayList<Items>();
    ArrayList<Items> RowE = new ArrayList<Items>();


    public void addItemsToRow () {
        RowA.add(Items.A1);
        RowA.add(Items.A2);
        RowA.add(Items.A3);
        RowA.add(Items.A4);
        RowA.add(Items.A5);

        RowB.add(Items.B1);
        RowB.add(Items.B2);
        RowB.add(Items.B3);
        RowB.add(Items.B4);
        RowB.add(Items.B5);

        RowC.add(Items.C1);
        RowC.add(Items.C2);
        RowC.add(Items.C3);
        RowC.add(Items.C4);
        RowC.add(Items.C5);

        RowD.add(Items.D1);
        RowD.add(Items.D2);
        RowD.add(Items.D3);
        RowD.add(Items.D4);
        RowD.add(Items.D5);

        RowE.add(Items.E1);
        RowE.add(Items.E2);
        RowE.add(Items.E3);
        RowE.add(Items.E4);
        RowE.add(Items.E5);

    }

    ArrayList<ArrayList<Items>> vendingMachine = new ArrayList<ArrayList<Items>>();

    public void addRowsToMachine () {
        vendingMachine.add(RowA);
        vendingMachine.add(RowB);
        vendingMachine.add(RowC);
        vendingMachine.add(RowD);
        vendingMachine.add(RowE);
    }



}
