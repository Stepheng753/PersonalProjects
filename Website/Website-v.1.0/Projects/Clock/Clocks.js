
function setup() {
    createCanvas(1000, 400);
}

function draw() {
    background(230, 190, 255);

    timeClock(675, 200);
    gradClock(325, 200);

}

function timeClock(centerX, centerY) {
    translate(centerX, centerY);
    let hr = hour();
    let min = minute();
    let sec = second();
    let hour12 = (hr % 12 === 0) ? 12 : (hr % 12);
    let ampm = (hr < 12) ? " AM" : " PM";

    fill(255);
    noStroke();
    textFont("Calisto", 24);
    let time = ("0" + hour12).slice(-2) + ":" +
        ("0" + min).slice(-2) + ":" +
        ("0" + sec).slice(-2) + ampm;
    text(time, -65, -170);

    rotate(-PI / 2);
    strokeWeight(5);
    noFill();

    stroke(255, 220, 240);
    let hrEnd = map(hr, 0, 12, 0, 2 * PI);
    arc(0, 0, 300, 300, 0, hrEnd);

    stroke(220, 240, 255);
    let minEnd = map(min, 0, 60, 0, 2 * PI);
    arc(0, 0, 280, 280, 0, minEnd);

    stroke(225, 240, 225);
    let secEnd = map(sec, 0, 60, 0, 2 * PI);
    arc(0, 0, 260, 260, 0, secEnd);

    push();
    stroke(255, 220, 240);
    strokeWeight(7);
    rotate(hrEnd);
    line(0, 0, 75, 0);
    pop();

    push();
    stroke(220, 255, 255);
    strokeWeight(5);
    rotate(minEnd);
    line(0, 0, 100, 0);
    pop();

    push();
    stroke(230, 255, 230);
    strokeWeight(3);
    rotate(secEnd);
    line(0, 0, 100, 0);
    pop();

    rotate(PI / 2)
    translate(-centerX, -centerY);
}


function gradClock(centerX, centerY) {
    translate(centerX, centerY);
    let daylim = 30;
    if (((month() <= 7) && (month() % 2 != 0)) || ((month() > 7) && (month() % 2 == 0))) {
        daylim = 31
    } else if (month() == 2) {
        daylim = 28
    }

    let mosLeft = (4 - (month() % 12));
    let daysLeft = daylim - day() + 12;
    let hoursLeft = 23 - hour();
    let minsLeft = 59 - minute();
    let secsLeft = 59 - second();

    fill(255);
    noStroke();
    let time = ("0" + mosLeft).slice(-2) + ":" +
        ("0" + daysLeft).slice(-2) + ":" +
        ("0" + hoursLeft).slice(-2) + ":" +
        ("0" + minsLeft).slice(-2) + ":" +
        ("0" + secsLeft).slice(-2);

    textFont('Courier', 20);
    text(time, -80, 0);
    textFont('Helvetica', 20);
    text("Countdown to Graduation!", -100, -170)
    textFont('Courier', 8)
    text("Months", -80, 15)
    text("Days", -40, 15)
    text("Hrs", 0, 15)
    text("Mins", 32, 15)
    text("Secs", 65, 15)

    rotate(-PI / 2);
    strokeWeight(5);
    noFill();

    stroke("red");
    let moEnd = map(mosLeft, 0, 12, 0, 2 * PI)
    arc(0, 0, 300, 300, 0, moEnd)

    stroke(0);
    let dayEnd = map(daysLeft, 0, daylim, 0, 2 * PI)
    arc(0, 0, 280, 280, 0, dayEnd)

    stroke("gold");
    let hrEnd = map(hoursLeft, 0, 24, 0, 2 * PI)
    arc(0, 0, 260, 260, 0, hrEnd)

    stroke("red");
    let minEnd = map(minsLeft, 0, 60, 0, 2 * PI)
    arc(0, 0, 240, 240, 0, minEnd)

    stroke(0);
    let secEnd = map(secsLeft, 0, 60, 0, 2 * PI)
    arc(0, 0, 220, 220, 0, secEnd)

    rotate(PI / 2)
    translate(-centerX, -centerY);
}
