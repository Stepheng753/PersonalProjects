public class Coin {

    String name;
    double value;
    String coinName;

    Coin (String coinName) {
        this.coinName = coinName.toLowerCase();
        if (this.coinName.charAt(0) == '$') {
            name = "Dollar Coin";
            value = 1.00;
        }
        if (this.coinName.charAt(0) == 'h') {
            name = "Half Dollar";
            value = .50;
        }
        if (this.coinName.charAt(0) == 'q' ) {
            name = "Quarter";
            value = .25;
        }
        if (this.coinName.charAt(0) == 'd' ) {
            name = "Dime";
            value = .10;
        }
        if (this.coinName.charAt(0) == 'n' ) {
            name = "Nickel";
            value = .05;
        }
        if (this.coinName.charAt(0) == 'p' ) {
            name = "Penny";
            value = .01;
        }
    }


    public String getName() {
        return name;
    }

    public double getValue() {
        return value;
    }
}
