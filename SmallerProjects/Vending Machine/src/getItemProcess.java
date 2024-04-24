import java.util.Scanner;
public class getItemProcess {

    String selection;
    char row;
    int rowIndex;
    int num;
    Items item;
    Scanner input = new Scanner(System.in);
    double holdingMoney = 0;
    private static double vendingMoney;

    public getItemProcess (String selection) {
        this.selection = selection;
        chooseSelection();
        getItem();
        showItem();
        showPrice();
        System.out.println();
    }


    private void chooseSelection () {
        row = selection.charAt(0);
        num = Integer.parseInt(selection.replaceAll("[\\D]", ""));
        if (row != 'A' && row != 'a' && row != 'B' && row != 'b' && row != 'C' && row != 'c' && row != 'D' && row != 'd' && row != 'E' && row != 'e') {
            System.out.println("Invalid Entry");
            System.exit(1);
        }
        if (num < 1 || num > 5) {
            System.out.println("Invalid Entry");
            System.exit(1);
        }
    }

    private void getItem () {
        Choices a1 = new Choices();
        if (row == 'A' || row == 'a') { rowIndex = 0; }
        if (row == 'B' || row == 'b') { rowIndex = 1; }
        if (row == 'C' || row == 'c') { rowIndex = 2; }
        if (row == 'D' || row == 'd') { rowIndex = 3; }
        if (row == 'E' || row == 'e') { rowIndex = 4; }

        item = a1.vendingMachine.get(rowIndex).get(num - 1);
    }

    private void showItem () {
        System.out.println("Selection: " + String.valueOf(row).concat(String.valueOf(num)));
        System.out.println("Item: " + item.getName());
    }

    private void showPrice () {
        System.out.printf("Price: $%.2f\n",item.getPrice());
        if (item.inventory <= 0) {
            System.out.println("Sorry Out Of Stock!");
            System.exit(0);
        }
    }


    public void insertMoney () {
        String goAgain;
        do {
        System.out.print("Please Insert a Coin: ");
        Coin a2 = new Coin(input.next());
        System.out.println("You Just Inserted a : " + a2.getName());
        holdingMoney += a2.getValue();
        System.out.printf("Total: $%.2f\n", holdingMoney);
        System.out.print("Would You Like to keep adding Coins? ");
        goAgain = input.next();
        } while (!goAgain.contains("n") && !goAgain.contains("N"));
        System.out.println();
    }

    public void insertMoney (double holdingMoney) {
        this.holdingMoney = holdingMoney;
        System.out.printf("Total Inserted: $%.2f\n", holdingMoney);
        System.out.println();
    }

    public void buyItem () {
        if (item.getInventory() > 0) {
            try {
                if (item.price - holdingMoney > 0) {
                    throw new Exception();
                }
                item.takeOne();
                vendingMoney += item.getPrice();
                holdingMoney -= item.getPrice();
                System.out.println("Please find your " + item.getName() + " below!");
                System.out.println("Thank You!");
            }
            catch (Exception e){
                System.out.println("Not Enough Funds!");
                System.out.printf("You need: $%.2f left\n", item.getPrice() - holdingMoney);
            }
        }
        else {
            System.out.println("Sorry Out Of Stock!");
            getRefund();
        }
    }

    private void getRefund () {
        System.out.println("Please Take Refunded Money Below");
        System.out.println("Refunded: " + holdingMoney);
        holdingMoney = 0;
    }

    public void getVendingMoney (String password) {
        if (password.equals("vending")) {
            getVendingMoney();
        }
        else {
            System.out.println("Incorrect Password!");
        }
    }

    private void getVendingMoney () {
        System.out.println("Money inside Vending Machine: " + vendingMoney);
    }







}
