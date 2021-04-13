import java.lang.Math;

public class Scratch {
    
    public static void main(String[] args) {
        final int swAge = 30;
        final int ewAge = 68;
        final int srAge = 68;
        final int erAge = 118;
        final int wMonths = (ewAge - swAge) * 12;
        final int rMonths = (erAge - srAge) * 12;
        final double r = .05 / 12;
        final double Ax = (1 - Math.pow((1+r), 456)) / (1 - (1 + r));
        final double P = (1000* ( (1 - Math.pow((1+r), 600)) / (1 - (1 + r)) ) ) / Math.pow(1 + r, 600);
        final double x = P / Ax;
        double rAcc = 0;

        for (int i = 1; i <= 456; i++) {
            rAcc = ( rAcc * (1 + r) ) + x ;
            System.out.println(rAcc);
        }



    }

}