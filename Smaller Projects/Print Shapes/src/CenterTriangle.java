public class CenterTriangle extends Triangle {

    public CenterTriangle (int numRows) {
        super(numRows);
    }

    @Override
    public void print () {
        int numSpaces = numRows - 1;

        for (int row = 0; row < numRows; row++) {

            for (int i = 0; i < numSpaces; i++) {
                System.out.print('\u0020');
            }

            for (int stars = 0; stars < row + 1; stars++) {
                System.out.printf("%-2s", '\u002A');
            }

            System.out.println();
            numSpaces--;
        }
    }


    public static void main(String[] args) {
        CenterTriangle centerTriangle = new CenterTriangle(50);
    }

}
