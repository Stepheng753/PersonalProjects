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