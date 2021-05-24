<?php

$name = $_GET["name"];
$to = "StephenG753@Gmail.com";
$from = $_GET["emailAddress"];
$subject = "Comment From StephenG753.com";
$message = "Name: " .$name ."\nEmail: " .$from ."\nMessage: " .$_GET["comments"];
$headers = "From: " .$from;
if (empty($_GET['emailAddress']) ) {
    $headers = "From: NoEmail";
}

if ( !empty($_GET['comments'])  ) {
	mail($to, $subject, $message, $headers);
	echo 'Email Has Been Sent! <br>';
}
else {
    echo 'Email Has NOT Been Sent <br>';
}

$home = "https://stepheng753.com/Website/Home.html";
echo "<br><a href = " .$home .">Back Home</a>";

?>