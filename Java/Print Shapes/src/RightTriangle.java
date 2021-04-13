/**
 Program: RightTriangle
 Description :
 *
 * *
 * * *
 * * * *
 * * * * *
 * Print the triangle above, rows being determined by input
 @author : Stephen Giang
 @date December 31, 2019
 **/

public class RightTriangle extends Triangle {

    public RightTriangle (int numRows) {
        super(numRows);
    }

    @Override
    public void print () {
        for (int row = 0; row < numRows; row++) {
            for (int stars = 0; stars < row + 1; stars++) {
                System.out.printf("%-2s", '\u002A');
            }
            System.out.println();
        }
    }

    public static void main(String[] args) {
        RightTriangle rightTriangle = new RightTriangle(6);
    }

}
