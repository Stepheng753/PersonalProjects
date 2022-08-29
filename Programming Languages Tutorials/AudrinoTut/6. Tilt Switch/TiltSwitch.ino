// https://www.youtube.com/watch?v=fnnang4zS4Q&list=PLWdhcCYoOsiJE1DS7OhPfwrHrGlUED6Az&index=6&ab_channel=BV3D%3ABryanVines


#define PIN_TILT_SWITCH (10)
#define PIN_ACTIVE_BUZZER (9)
#define PIN_LED (8)
#define PIN_RESET_BUTTON (7)

bool isOn;

void setup()
{
    pinMode(PIN_TILT_SWITCH, INPUT_PULLUP);
    pinMode(PIN_ACTIVE_BUZZER, OUTPUT);
    pinMode(PIN_LED, OUTPUT);
    pinMode(PIN_RESET_BUTTON, INPUT_PULLUP);

    digitalWrite(PIN_ACTIVE_BUZZER, LOW);
    digitalWrite(PIN_LED, LOW);

    isOn = false;
}

void loop()
{
    // TILT SWITCH NOT ACTIVE
    if (digitalRead(PIN_TILT_SWITCH) == HIGH && !isOn) {
        digitalWrite(PIN_ACTIVE_BUZZER, HIGH);
        digitalWrite(PIN_LED, HIGH);
        isOn = true;
    }


    // RESET BUTTON PRESSED
    if (digitalRead(PIN_RESET_BUTTON) == LOW && isOn) {
        digitalWrite(PIN_ACTIVE_BUZZER, LOW);
        digitalWrite(PIN_LED, LOW);
        delay(250);
        isOn = false;
    }

    if (isOn) {
        digitalWrite(PIN_ACTIVE_BUZZER, HIGH);
        digitalWrite(PIN_LED, HIGH);
        delay(250);
        digitalWrite(PIN_ACTIVE_BUZZER, LOW);
        digitalWrite(PIN_LED, LOW);
        delay(500);
    }
}