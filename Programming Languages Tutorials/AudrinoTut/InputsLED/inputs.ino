// https://www.youtube.com/watch?v=4iGIr7ANhDY&list=PLWdhcCYoOsiJE1DS7OhPfwrHrGlUED6Az&index=4&ab_channel=BV3D%3ABryanVine

#define PIN_LED (5)
#define PIN_HOLD_SET (7)
#define PIN_BUTTON_OFF (8)
#define PIN_BUTTON_ON (9)
bool hold = true;
bool canChange = true;

void setup()
{
    pinMode(PIN_LED, OUTPUT);
    pinMode(PIN_BUTTON_OFF, INPUT_PULLUP);
    pinMode(PIN_BUTTON_ON, INPUT_PULLUP);
    pinMode(PIN_HOLD_SET, INPUT_PULLUP);
}

void loop() {
    if (canChange && digitalRead(PIN_HOLD_SET) == LOW) {
        hold = !hold;
        canChange = false;

        if (hold) {
            flashLED(5, 100);
        } else {
            flashLED(2, 250);
        }
    }
    else if (!canChange && digitalRead(PIN_HOLD_SET) == HIGH) {
        canChange = true;
    }

    if (hold) {
        if (digitalRead(PIN_BUTTON_ON) == LOW || digitalRead(PIN_BUTTON_OFF) == LOW) {
            digitalWrite(PIN_LED, HIGH);
        }
        else if (digitalRead(PIN_BUTTON_ON) == HIGH && digitalRead(PIN_BUTTON_OFF) == HIGH) {
            digitalWrite(PIN_LED, LOW);
        }
    } else {
        if (digitalRead(PIN_BUTTON_ON) == LOW) {
            digitalWrite(PIN_LED, HIGH);
        }
        if (digitalRead(PIN_BUTTON_OFF) == LOW) {
            digitalWrite(PIN_LED, LOW);
        }
    }
}

void flashLED(int numTimes, int delayTime) {
    for (int i = 0; i < numTimes; i++) {
        digitalWrite(PIN_LED, HIGH);
        delay(delayTime);
        digitalWrite(PIN_LED, LOW);
        delay(delayTime);
    }
}
