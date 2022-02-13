<?php

DEFINE ('DB_USER', 'u190664279_testStudents');
DEFINE ('DB_PASSWORD', '');
DEFINE ('DB_HOST', '5.181.218.155');
DEFINE ('DB_NAME', 'u190664279_testStudentsDB');
DEFINE ('DB_PORT', '3306');

$dbc = @mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT)
OR die('Could not connect to MySQL: ' . mysqli_connect_error());

$query = "SELECT f_name, l_name FROM student";

$response = @mysqli_query($dbc, $query);

$count = 1;

if($response){
  while($row = mysqli_fetch_array($response)){
    echo $count . ": " . $row['f_name'] . ' ' . $row['l_name'] . "<br>";
    $count++;
  }
}
?>