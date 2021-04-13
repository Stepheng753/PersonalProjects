function introduction() {
    var yourName = prompt("What is your Name?");
    if (yourName != null) {
        document.getElementById("sayHello").innerHTML = "Hello " + yourName;
    } else {
        alert("Please enter a name next time");
    }
}

function variables() {
    var myName = "Stephen";
    var myAge = 20;
    // myName = 100; - no error
}

function math() {
    // document.write("5 + 4 = " + 5 + 4, "<br />"); - concentation '+'
    document.write("5 + 4 = ", 5 + 4, "<br />");
    document.write("5 - 4 = ", 5 - 4, "<br />");
    document.write("5 * 4 = ", 5 * 4, "<br />");
    document.write("5 / 4 = ", 5 / 4, "<br />");
    document.write("5 % 4 = ", 5 % 4, "<br />");

    document.write("Max Num = ", Number.MAX_VALUE, "<br />");
    document.write("Max Num = ", Number.MIN_VALUE, "<br />");

    // Can only handle 16 digits of precision
    var precisionTest16 = 0.1000000000000001;
    document.write(precisionTest16 + 0.1000000000000001, "<br />");

    var precisionTest17 = 0.10000000000000001;
    document.write(precisionTest17 + 0.10000000000000001, "<br />");

    var balance = 1563.87;
    document.write("Monthly Payment : ", (balance / 12).toFixed(2), "<br />");
    document.write("Monthly Payment : ", (balance / 12), "<br />");

    var randNum = 5;
    document.write("randNum++ = ", randNum++, "<br />");
    document.write("++randNum = ", ++randNum, "<br />");
    document.write("randNum += 5 = ", randNum += 5, "<br />");

    document.write("3 + 2 * 5 = ", 3 + 2 * 5, "<br />");
    document.write("(3 + 2) * 5 = ", (3 + 2) * 5, "<br />");
    document.write("3 + (2 * 5) = ", 3 + (2 * 5), "<br />");

    document.write("Math.E = ", Math.E, "<br />");
    document.write("Math.PI = ", Math.PI, "<br />");
    document.write("Math.abs(-8) = ", Math.abs(-8), "<br/>");
    document.write("Math.cbrt(1000) = ", Math.cbrt(1000), "<br/>");
    document.write("Math.ceil(6.45) = ", Math.ceil(6.45), "<br/>");
    document.write("Math.floor(6.45) = ", Math.floor(6.45), "<br/>");
    document.write("Math.round(6.45) = ", Math.round(6.45), "<br/>");
    document.write("Math.log(10) = ", Math.log(10), "<br/>"); // Natural log
    document.write("Math.log10(10) = ", Math.log10(10), "<br/>"); // Base 10 log
    document.write("Math.max(10,5) = ", Math.max(10, 5), "<br/>");
    document.write("Math.min(10,5) = ", Math.min(10, 5), "<br/>");
    document.write("Math.pow(4,2) = ", Math.pow(4, 2), "<br/>");
    document.write("Math.sqrt(1000) = ", Math.sqrt(1000), "<br/>");

    document.write("Random # (1 - 10) = ", Math.floor((Math.random() * 10) + 1), "<br />")

    document.write("Converted String : ", Number("3.14"), "<br />")
    document.write("Converted Int :", parseInt("5"), "<br />");
    document.write("Converted Int :", parseFloat("3.14"), "<br />");

}

function strings() {
    var randStr = "A long " + "String that " + "goes on and on";
    document.write("randStr : ", randStr, "<br />");
    document.write("String Length : ", randStr.length, "<br />");
    document.write("Index for \"goes\" : ", randStr.indexOf("goes"), "<br />");
    document.write("randStr.slice(19, 23) : ", randStr.slice(19, 23), "<br />");
    document.write("randStr.slice(19) : ", randStr.slice(19), "<br />");
    document.write("randStr.substr(19,4) : ", randStr.substr(19, 4), "<br />");
    document.write("randStr.replace(\"and on\", \"forever\") : ", randStr.replace("and on", "forever"), "<br />");
    document.write("At index 2 : ", randStr.charAt(2), "<br />");

    var randStrArray = randStr.split(" ");
    randStr = randStr.trim();
    document.write("randStr.toUpperCase() : ", randStr.toUpperCase(), "<br />");
    document.write("randStr.toLowerCase() : ", randStr.toLowerCase(), "<br />");

    var strToStyle = "Random String";
    document.write("String: ", strToStyle, "<br />");
    document.write("Big : ", strToStyle.big(), "<br />");
    document.write("Bold : ", strToStyle.bold(), "<br />");
    document.write("Font Color : ", strToStyle.fontcolor("blue"), "<br />");
    document.write("Font Size : ", strToStyle.fontsize("8em"), "<br />");
    document.write("Italics : ", strToStyle.italics(), "<br />");
    document.write("Google : ", strToStyle.link("http://google.com"), "<br />");
    document.write("Small : ", strToStyle.small(), "<br />");
    document.write("Strike : ", strToStyle.strike(), "<br />");
    document.write("Sub : ", strToStyle.sub(), "<br />");
    document.write("Sup : ", strToStyle.sup(), "<br />");
}

function conditionals() {
    // == value equality, === type and value equality

    var age = 20;
    if ((age >= 5) && (age <= 6)) {
        document.write("Go to Kindergarten", "<br />");
    } else if (age > 18) {
        document.write("Go to College", "<br />");
    } else {
        document.write("Go to Grade ", age - 5, "<br />");
    }

    document.write("true || false: ", true || false, "<br />");
    document.write("!true : ", !true, "<br />");
    document.write("\"5\" == 5 : ", ("5" == 5), "<br />");
    document.write("\"5\" === 5 : ", ("5" === 5), "<br />");

    age = 7;
    switch (age) {
        case 5:
        case 6:
            document.write("Go to Kindergarten", "<br />");
            break;
        case 7:
            document.write("Go to 1st Grade", "<br />");
            break;
        default:
            document.write("Go to Grade ", age - 5, "<br />");
    }

    age = 15;
    var canIVote = (age >= 18) ? true : false;
    if (canIVote) {
        document.write("You can Vote!", "<br />");
    } else {
        document.write("You can NOT Vote!", "<br />");
    }
}

function setup() {
    canvas = createCanvas(400, 400);
    canvas.parent('p5Clock');
}

function draw() {
    background(0);
    translate(200, 200);
    let hr = hour();
    let min = minute();
    let sec = second();
    let hr12 = (hr % 12 === 0) ? 12 : hr % 12;

    fill(255);
    noStroke();
    textFont('Courier', 30);
    text(("0" + hr12).slice(-2) + ":" + ("0" + min).slice(-2) + ":" + ("0" + sec).slice(-2), -75, 0);
    if (hr < 12) {
        text("AM", -25, 35);
    } else {
        text("PM", -25, 35);
    }
    rotate(-PI / 2);
    strokeWeight(8);
    noFill();
    stroke(255, 100, 150);
    let secEnd = map(sec, 0, 60, 0, 2 * PI);
    arc(0, 0, 300, 300, 0, secEnd);

    stroke(150, 100, 255);
    let minEnd = map(min, 0, 60, 0, 2 * PI);
    arc(0, 0, 280, 280, 0, minEnd);

    stroke(150, 255, 100);
    let hrEnd = map(hr % 12, 0, 12, 0, 2 * PI);
    arc(0, 0, 260, 260, 0, hrEnd);
}

function loops() {
    var i = 1;
    while (i <= 10) {
        document.write("i: ", i++, "<br />");
    }

    do {
        var guess = prompt("Guess a number between 1 and 20")
    } while (guess != 15) {
        alert("Correct! You Guessed 15!")
    }

    for (j = 0; j <= 20; j++) {
        if ((j % 2) === 0) {
            continue;           // continue looping
        } if (j === 15) {
            break;              // break looping
        }
        document.write("j:", j, "<br />");
    }

    var customer = {
        name: "Bob",
        address: "123 Main st",
        balance: 50.50
    };
    for (k in customer) {
        document.write(customer[k], "<br />");
    }
}

function arrays() {
    var tomSmith = ["Tom Smith", "123 Main St", 120.50];
    document.write("1st Index: ", tomSmith[0], "<br />");
    tomSmith[3] = "tSmith@gmail.com";
    document.write("Array: ", tomSmith.toString(), "<br />");
    tomSmith.splice(2, 1, "Pittsburg", "PA");
    document.write("Array: ", tomSmith.valueOf(), "<br />");
    tomSmith.splice(4, 1);
    document.write("Array: ", tomSmith.join(", "), "<br />");
    delete tomSmith[3];
    tomSmith.sort();
    document.write("Array: ", tomSmith.join(", "), "<br />");

    var numArr = [4, 3, 9, 1, 20, 43];
    numArr.sort(function (x, y) { return x - y; })
    document.write("Number Array: ", numArr.toString(), "<br />");

    var combinedArr = numArr.concat(tomSmith);
    document.write("Combined: ", combinedArr.toString(), "<br />");

    tomSmith.pop();
    tomSmith.push("555-1212", "US");
    tomSmith.shift();
    tomSmith.unshift("Tommy Smith")
    for (i = 0; i < tomSmith.length; i++) {
        document.write(tomSmith[i], "<br />");
    }
}

function funcs() {
    function inArray(arrCheck, value) {
        for (i = 0; i < arrCheck.length; i++) {
            if (arrCheck[i] === value) { return true; }
        }
        return false;
    }
    randArr = [1, 2, 3, 4, 5]
    document.write("In Array: ", inArray(randArr, 4), "<br />");
    document.write("In Array: ", inArray(randArr, 6), "<br />");


    function times2(num1) {
        var num2 = 2;
        return num1 * num2;
    }
    // document.write("Outside Local: ", num2, "<br />");
    function times3(num1) {
        var num2 = 3;
        return num1 * num2;
    }
    function multiply(func, num1) {
        return func(num1);
    }
    document.write("3 * 15 = ", multiply(times3, 15), "<br />");
    var triple = function (num) { return num * 3; }
    document.write("3 * 45 = ", multiply(triple, 45), "<br />");

    function getSum() {
        sum = 0;
        for (i = 0; i < arguments.length; i++) {
            sum += arguments[i];
        }
        return sum;
    }
    document.write("Sum: ", getSum(1, 2, 3, 4, 5, 6), "<br />");

    function times2(arr1) {
        var arr2 = [];
        for (let i = 0; i < arr1.length; i++) {
            arr2.push(arr1[i] * 2);
        }
        return arr2;
    }
    document.write("Array Double: ", times2([1, 2, 3, 4]).toString(), "<br />");

    function factorial(num) {
        if (num <= 1) { return 1; }
        else {
            return num * factorial(num - 1);
        }
    }
    document.write("Factorial(4): ", factorial(4), "<br />");

}

function openAlert(mess) {
    alert(mess);
}
function input() {
    var dataEntered = document.getElementById('randInput').value;
    alert('User Typed: ' + dataEntered);
}

function charClick() {
    function getChar(event) {
        if (event.which == null) {
            return String.fromCharCode(event.keyCode);
        } else if (event.which != 0 && event.charCode != 0) {
            return String.fromCharCode(event.which);
        } else {
            return null;
        }
    }

    document.getElementById('charInput').onkeypress = function (event) {
        var char = getChar(event || window.event);
        if (!char) return false;
        document.getElementById('keyData').innerHTML = char + " was clicked";
        return true;
    };

    document.getElementById('charInput').onfocus = function () {
        document.getElementById('keyData').innerHTML = "Gained Focus!";
    };

    document.getElementById('charInput').onselect = function () {
        document.getElementById('keyData').innerHTML = "Selected!";
    };
}

function imgClick() {
    document.getElementById('logoButton').onclick = function () {
        document.getElementById('logo').className = "show";
    };
    document.getElementById('logo').onclick = function () {
        document.getElementById('logo').className = "hidden";
    };
    document.getElementById('logo').onmouseover = function () {
        document.getElementById('logo').src = "https://miro.medium.com/max/720/1*LjR0UrFB2a__5h1DWqzstA.png";
        document.getElementById('mouseInput').value = "Mouse Over Image";
    };
    document.getElementById('logo').onmouseout = function () {
        document.getElementById('logo').src = "https://cdn.uconnectlabs.com/wp-content/uploads/sites/25/2020/04/J.png";
        document.getElementById('mouseInput').value = "Mouse Out Image";
    };
}

function mouseLoc() {
    document.body.onmousemove = function (e) {
        e = e || window.event;
        var pageX = e.pageX;
        var pageY = e.pageY;
        if (pageX === undefined) {
            pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        document.getElementById('mouseX').value = pageX;
        document.getElementById('mouseY').value = pageY;
    };
}

function clearInput() {
    var inputElements = document.getElementsByTagName('input');
    for (i = 0; i < inputElements.length; i++) {
        if (inputElements[i].type == 'text') { inputElements[i].value = ""; }

    }
}

function backCol() {
    document.getElementById('sampDiv').style.backgroundColor = "#e5c07b"
}

function backImg() {
    document.getElementById('sampDiv').style.backgroundImage = "url('https://luxgoods.ir/media/k2/items/cache/ffee2447b152494b43d9816faaea83c8_L.jpg')"
}

function borderStyle() {
    document.getElementById('sampDiv').style.borderStyle = "solid";
}

function borderWidth() {
    document.getElementById('sampDiv').style.borderWidth = "thick";
}

function borderCol() {
    document.getElementById('sampDiv').style.borderColor = "blue";
}

function getWebpage() {
    document.write("Current Url: ", window.location.href, "<br />");
    document.write("Current Host: ", window.location.hostname, "<br />");
    document.write("Current Path: ", window.location.pathname, "<br />");
}

function goToGoogle() {
    window.location.href = "http://Google.com"
}

function forward() {
    history.forward();
    // history.go(2) forward 2 pages
}

function back() {
    history.back();
    // history.go(-2) back 2 pages
}

function reload() {
    window.location.reload();
}

function cNodes() {
    var pElements = document.getElementsByTagName('p');
    pElements[3].style.backgroundColor = "#e5c07b";

    document.childNodes[1].style.backgroundColor = '#FAEBD7';

    var sampDiv2 = document.getElementById('sampDiv2');
    sampDiv2.childNodes[1].style.backgroundColor = '#528bff';
    sampDiv2.childNodes[1].childNodes[1].style.backgroundColor = '#B31B1B';

    document.getElementById('NodeType').innerHTML = 'Node Type: ' + sampDiv2.childNodes[1].childNodes[0].nodeType + '<br>';

    document.getElementById('NodeName').innerHTML = 'Node Name: ' + sampDiv2.childNodes[1].childNodes[0].nodeName + '<br>';
}

function logo() {
    var logo2 = document.getElementById('logo2');
    document.write("Logo has alt: ", logo2.hasAttribute('alt'), "<br />");
    logo2.setAttribute('alt', 'New Alt');
    document.write("Logo's alt: ", logo2.getAttribute('alt'), "<br />");

    var attributeList = logo2.attributes;
    for (let i = 0; i < attributeList.length; i++) {
        document.write("Attribute ", i, ": ", attributeList[i].nodeName, " - ", attributeList[i].nodeValue, "<br />");
    }
}

function cElement() {
    var para3 = document.createElement('p');
    para3.setAttribute('id', 'paragraph3');
    para3.innerHTML = 'Proin eget turpis eget quam luctus malesuada ut ac nulla.';

    sampDiv2.appendChild(para3);
    sampDiv2.insertBefore(para3, sampDiv2.childNodes[1]);
}

function OOP() {
    var customer1 = {
        name: "John Smith",
        street: "123 Main",
        city: "Pittsburgh",
        state: "PA",
        email: "jsmith@aol.com",
        balance: 120.50,
        payDownBal: function (amtPaid) {
            this.balance -= amtPaid;
        },
        addToBal: function (amtCharged) {
            this.balance += amtCharged;
        }
    };
    document.write("Customer Name: ", customer1.name, "<br />");
    customer1.street = "215 Main St";
    document.write("Customer Street: ", customer1.street, "<br />");
    customer1.country = "US";
    document.write("Customer Country: ", customer1.country, "<br />");
    delete customer1.country;
    for (var prop in customer1) {
        if (customer1.hasOwnProperty(prop)) {
            document.write("Property: ", prop, "<br />");
        }
    }
    document.write("Is there a name in Customer 1: ", "name" in customer1, "<br />");

    function getInfo(customer1) {
        return customer1.name + " lives at " + customer1.street + " in " + customer1.city + " " + customer1.state + " email : " + customer1.email + " and has a balance of $" + customer1.balance;
    }
    document.write(getInfo(customer1), "<br />");
    customer1.payDownBal(20.50);
    customer1.addToBal(10.00);
    document.write(getInfo(customer1), "<br />");

    function Customer(name, street, city, state, email, balance) {
        this.name = name;
        this.street = street;
        this.city = city;
        this.state = state;
        this.email = email;
        this.balance = balance;
        this.payDownBal = function (amtPaid) {
            this.balance -= amtPaid;
        };
        this.addToBal = function (amtCharged) {
            this.balance += amtCharged;
        };
        this.getInfo = function () {
            return this.name + " lives at " + this.street + " in " + this.city + " " + this.state + " email : " + this.email + " and has a balance of $" + this.balance;
        }
    }

    var customer2 = new Customer("Sally Smith", "234 Main", "Pittsburgh", "PA", "ssmith@aol.com", 0.00);
    customer2.addToBal(15.50);
    document.write(customer2.getInfo(), "<br />");

    // shared value for customer type
    Customer.prototype.isCreditAvail = true;
    document.write("Customer has credit: ", customer2.isCreditAvail, "<br />");

    Customer.prototype.toString = function () {
        return this.name + " lives at " + this.street + " in " + this.city + " " + this.state + " email : " + this.email + " and has a balance of $" + this.balance.toFixed(2) + " Creditworthy : " + this.isCreditAvail;
    };
    document.write(customer2, "<br />");
}

function editText(regex, input, helpId, helpMessage) {
    if (!regex.test(input)) {
        if (helpId != null) {
            while (helpId.childNodes[0]) {
                helpId.removeChild(helpId.childNodes[0]);
            }
        }
        helpId.appendChild(document.createTextNode(helpMessage));
    } else {
        if (helpId != null) {
            while (helpId.childNodes[0]) {
                helpId.removeChild(helpId.childNodes[0]);
            }
        }
    }
}

function isTheFieldEmpty(inputField, helpId) {
    return editText(/^A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]$/, inputField.value, helpId, "Please enter a valid name");
}

function exHand() {
    var customerArray = ["Tom", "Bob", "Sally", "Sue"];
    var getCustomer = function(index) {
        if (index >= customerArray.length) {
            throw new RangeError("Index must be >= 0 and < " + customerArray.length);
        } else {
            return customerArray[index];
        }
    };
    try {
        document.write("Customer: ", getCustomer(5), "<br />");
    } catch (ex) {
        if (ex instanceof RangeError) {
            document.write(ex.message, "<br />");
        }
    }

}














