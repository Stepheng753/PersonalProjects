<?php
DEFINE ('DB_HOST', '5.181.218.155');
DEFINE ('DB_PORT', '3306');
DEFINE ('DB_USER', 'u190664279_testStudents');
DEFINE ('DB_PASSWORD', '');
DEFINE ('DB_NAME', 'u190664279_testStudentsDB');

$dbc = @mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT)
OR die('Could not connect to MySQL: ' . mysqli_connect_error());
?>