/**
 Program: VendingMachineTest
 Description :
 @author : Stephen Giang
 @date January 04, 2020
 **/

public class VendingMachineTest {

    public static void main(String[] args) {
        getItemProcess gi = new getItemProcess("c1");
        gi.insertMoney(100000);
        for (int i = 0; i < 15; i++) {
            gi.buyItem();
        }
        System.out.println(Items.C1.getInventory());
        System.out.println();
        getItemProcess g3 = new getItemProcess("B5");
        g3.insertMoney(2);
        g3.buyItem();
        g3.getVendingMoney("vending");
        System.out.println(Items.B5.getInventory());

    }


}
