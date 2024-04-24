//https://www.youtube.com/watch?v=b54VJvnl-iY&list=PLWdhcCYoOsiJE1DS7OhPfwrHrGlUED6Az&index=3&ab_channel=BV3D%3ABryanVines

#define BLUE (3)
#define GREEN (5)
#define RED (6)
#define FULL_COLOR (255)
#define DELAY_TIME (10)

void setup() {
    pinMode(RED, OUTPUT);
    pinMode(GREEN, OUTPUT);
    pinMode(BLUE, OUTPUT);

    digitalWrite(RED, HIGH);
    digitalWrite(GREEN, LOW);
    digitalWrite(BLUE, LOW);
}

void loop() {

    convertColor1toColor2(RED, GREEN);
    convertColor1toColor2(GREEN, BLUE);
    convertColor1toColor2(BLUE, RED);
}

void convertColor1toColor2(int COLOR1_LED, int COLOR2_LED) {
    int color1 = FULL_COLOR;
    int color2 = 0;

    for (int i = 0; i < FULL_COLOR; i++)
    {
        color1 -= 1;
        color2 += 1;
        analogWrite(COLOR1_LED, color1);
        analogWrite(COLOR2_LED, color2);
        delay(DELAY_TIME);
    }
}