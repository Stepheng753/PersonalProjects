<?php
DEFINE ('DB_USER', 'u190664279_testStudents');
DEFINE ('DB_PASSWORD', '');
DEFINE ('DB_HOST', '5.181.218.155');
DEFINE ('DB_NAME', 'u190664279_testStudentsDB');
DEFINE ('DB_PORT', '3306');

$dbc = @mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT)
OR die('Could not connect to MySQL: ' .
mysqli_connect_error());


// if (!$dbc) {
//     die('Connect Error: ' . mysqli_connect_error());
// }
// else {
//     echo 'Success... ' . mysqli_get_host_info($dbc) . "\n";
// }
?>
