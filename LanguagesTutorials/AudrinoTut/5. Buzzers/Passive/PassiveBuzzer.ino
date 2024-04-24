// https://www.youtube.com/watch?v=vt9C821Ug20&list=PLWdhcCYoOsiJE1DS7OhPfwrHrGlUED6Az&index=5&ab_channel=BV3D%3ABryanVines

#define PIN_BUZZER (3)
#define DELAY_TIME_ON (1)
#define DELAY_TIME_OFF (1)
#define BUZZ_TIME (250)


void setup()
{
    pinMode(PIN_BUZZER, OUTPUT);
}

void loop()
{
    for (int i = 0; i < BUZZ_TIME; i++)
    {
        digitalWrite(PIN_BUZZER, HIGH);
        delay(DELAY_TIME_ON);
        digitalWrite(PIN_BUZZER, LOW);
        delay(DELAY_TIME_OFF);
    }

    for (int i = 0; i < BUZZ_TIME / 2; i++)
    {
        digitalWrite(PIN_BUZZER, HIGH);
        delay(2 * DELAY_TIME_ON);
        digitalWrite(PIN_BUZZER, LOW);
        delay(2 * DELAY_TIME_OFF);
    }
}