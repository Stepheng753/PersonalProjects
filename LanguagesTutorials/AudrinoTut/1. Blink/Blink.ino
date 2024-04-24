//https://www.youtube.com/watch?v=A21eaw4V8_4&list=PLWdhcCYoOsiJE1DS7OhPfwrHrGlUED6Az&index=1&ab_channel=BV3D%3ABryanVines

int led = 13;
int delayTimeOn = 1000;
int delayTimeOff = 50;

void setup() {
  pinMode(led, OUTPUT);
}

void loop() {
  digitalWrite(led, HIGH);
  delay(delayTimeOn);
  digitalWrite(led, LOW);
  delay(delayTimeOff);
}