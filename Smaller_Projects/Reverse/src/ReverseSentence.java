/**
 Program: ReverseSentence
 Description : Reverse a Sentence
 @author : Stephen Giang
 @date January 02, 2020
 **/

public class ReverseSentence {
    String sentence;

    public ReverseSentence (String sentence) {
        this.sentence = sentence;
    }

    public String reverse () {
        String noPunc = sentence.replaceAll("\\p{Punct}|\\d","");

        String [] words = noPunc.split("\\s+");
        for (int i = 0; i < words.length / 2; i++) {
            String temp = words [i];
            words[i] = words[words.length - 1 - i];
            words[words.length - 1 - i] = temp;
        }

        String reverse = "";
        for (int i = 0; i < words.length; i++) {
            words[i] = words[i].concat("\u0020");
            reverse = reverse.concat(words[i]);
        }

        System.out.println("Normal: " + sentence);
        System.out.println("Reversed: " + reverse);
        return reverse;
    }


    public static void main(String[] args) {
        ReverseSentence reverseSentence = new ReverseSentence("Hello, My Name is Stephen! What is your Name?");
        reverseSentence.reverse();
    }

}
