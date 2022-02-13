<?php

DEFINE ('DB_HOST', '5.181.218.155');
DEFINE ('DB_USER', 'u190664279_testStudents');
DEFINE ('DB_PASSWORD', '');
DEFINE ('DB_NAME', 'u190664279_testStudentsDB');
DEFINE ('DB_PORT', '3306');

$dbc = @mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT)
OR die('Could not connect to MySQL: ' . mysqli_connect_error());

$sql = "INSERT INTO student (f_name, l_name) VALUES ('TEST', '#3')";

if ($dbc->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $dbc->error;
}

?>