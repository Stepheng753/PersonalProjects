<?php
    $f_name   = "Stephen";
    $l_name   = "Giang";
    $age      = 21;
    $height   = 1.87;
    $can_vote = true;
    $address  = array('street' => '123 Main St', 'city' => 'San Diego');
    $state    = null;
    define('PI', 3.1415);
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style type="text/css">
            h1, h2, h3 {
                text-decoration: underline;
            }
            body {
                margin: auto;
                margin-top: 50px;
                background: white;
                width: 1000px;
                padding-bottom: 500px;
            }
        </style>
        <title>PHP Tutorial</title>
    </head>
    <body>
        <div style="border: 0.1em solid black;">
            <h1>PHP Tutorial</h1>
            <h3><a href="https://www.youtube.com/watch?v=NihZYkNpslE&t=618s&ab_channel=DerekBanas">Derek Banas</a></h3>
        </div>


        <h2>Variables, Inputs, Forms, Get Requests</h2>
        <?php echo "Name : " . $f_name . ' ' . $l_name; ?>
        <br><br>
        <form action="PhpTut.php" method="GET">
            <label>Your State : </label>
            <input type="text" name="state"/>
            <br>

            <label>Number 1 : </label>
            <input type="number" name="num-1"/>
            <br>

            <label>Number 2 : </label>
            <input type="number" name="num-2"/>
            <br>

            <input type="submit" value="Submit"/>
        </form>
        <br>
        <?php
            if (isset($_GET) && array_key_exists('state', $_GET)) {
                echo "Get Request: ";
                print_r($_GET);
                echo '<br>';
                $state = $_GET['state'];
                if (isset($state) && !empty($state)) {
                    echo "$f_name lives in $state <br>";
                } else {
                    echo "State not given <br>";
                }
                if (count($_GET) >= 3) {
                    $num_1 = $_GET['num-1'];
                    $num_2 = $_GET['num-2'];
                    echo "$num_1 + $num_2 = " . ($num_1 + $num_2) . "<br>";
                    echo "$num_1 - $num_2 = " . ($num_1 - $num_2) . "<br>";
                    echo "$num_1 * $num_2 = " . ($num_1 * $num_2) . "<br>";
                    echo "$num_1 / $num_2 = " . ($num_1 / $num_2) . "<br>";
                    echo "$num_1 % $num_2 = " . (intdiv($num_1, $num_2)) . "<br>";
                    echo "Increment $num_1 = " . (++$num_1) . "<br>";
                    echo "Decrement $num_1 = " . (--$num_1) . "<br>";
                }
            }
        ?>

        <h2>Built in math functions</h2>
        <?php
            echo "abs(-5) = " . abs(-5) . "<br>";
            echo "ceil(4.45) = " . ceil(4.45) . "<br>";
            echo "floor(4.45) = " . floor(4.45) . "<br>";
            echo "round(4.45) = " . round(4.45) . "<br>";
            echo "max(4,5) = " . max(4, 5) . "<br>";
            echo "min(4,5) = " . min(4, 5) . "<br>";
            echo "pow(4,2) - 4^2 = " . pow(4, 2) . "<br>";
            echo "sqrt(16) = " . sqrt(16) . "<br>";
            echo "exp(1) - e^1 = " . exp(1) . "<br>";
            echo "abs(-5) = " . abs(-5) . "<br>";
            echo "ceil(4.45) = " . ceil(4.45) . "<br>";
            echo "floor(4.45) = " . floor(4.45) . "<br>";
            echo "round(4.45) = " . round(4.45) . "<br>";
            echo "max(4,5) = " . max(4, 5) . "<br>";
            echo "min(4,5) = " . min(4, 5) . "<br>";
            echo "pow(4,2) = " . pow(4, 2) . "<br>"; # 4 raised to the power of 2
            echo "sqrt(16) = " . sqrt(16) . "<br>"; # Square Root
            echo "exp(1) = " . exp(1) . "<br>"; # Exponent of e
            echo "log(e) = " . log(exp(1)) . "<br>"; # Logarithm
            echo "log10(10) = " . log10(exp(10)) . "<br>"; # Base 10 Logarithm
            echo "PI = " . pi() . "<br>"; # PI
            echo "hypot(10,10) = " . hypot(10, 10) . "<br>"; # Hypotenuse
            echo "deg2rad(90) = " . deg2rad(90) . "<br>"; # Degrees to radians
            echo "rad2deg(1.57) = " . rad2deg(1.57) . "<br>";
            echo "mt_rand(1,50) = " . mt_rand(1, 50) . "<br>"; # Fast random num
            echo "rand(1,50) = " . rand(1, 50) . "<br>"; # Original random num
            echo "Max Random = " . mt_getrandmax() . "<br>"; # Max random num
            echo "is_finite(10) = " . is_finite(10) . "<br>";
            echo "is_infinite(log(0)) = " . is_infinite(log(0)) . "<br>";
            echo "is_numeric(\"10\") = " . is_numeric("10") . "<br>";
            # sin, cos, tan, asin, acos, atan, asinh, acosh, atanh, atan2
            echo "sin(0) = " . sin(0) . "<br>";
            echo number_format(12345.6789, 2) . "<br>";
        ?>


        <h2>Conditionals</h2>
        <?php
            $num_oranges = 4;
            $num_bananas = 36;
            if ($num_oranges > 25 && $num_bananas > 30) {
                echo "25% Discount <br>";
            } elseif ($num_oranges > 30 || $num_bananas > 35) {
                echo "15% Discount <br>";
            } elseif ( !($num_oranges < 5) || !($num_bananas < 5)) {
                echo "15% Discount <br>";
            } else {
                echo "No Discount <br>";
            }
            $request = "Coca Cola";
            switch ($request) {
                case "Coca Cola":
                    echo "Here is your Coke <br>";
                    break;
                case "Pepsi":
                    echo "Here is your Pepsi <br>";
                    break;
                default:
                    echo "Here is your Water <br>";
                    break;
            }
            $age = 12;
            switch (TRUE) {
                case $age < 5:
                    echo "Stay Home <br>";
                    break;
                case $age == 5:
                    echo "Go to Kindergarten <br>";
                    break;
                case in_array($age, range(6, 17)):
                    $grade = $age - 5;
                    echo "Go to Grade $grade <br>";
                    break;
                default:
                    echo "Go to College <br>";
                    break;
            }
            $can_vote = ($age >= 18) ? "Can Vote" : "Can't Vote";
            echo "Vote? : $can_vote <br>";

            if ("10" == 10) {
                echo "They are Equal <br>";
            } else {
                echo "They are not Equal <br>";
            }
        ?>
    </body>
</html>