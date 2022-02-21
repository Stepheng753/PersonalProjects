<?php

require_once('../../../PHPPasswords/passStore.php');
DEFINE ('DB_HOST', '5.181.218.155');
DEFINE ('DB_PORT', '3306');
DEFINE ('DB_USER', 'u190664279_test');
DEFINE ('DB_NAME', 'u190664279_testDB');

$dbc = @mysqli_connect(DB_HOST, DB_USER, TESTDB_PASSWORD, DB_NAME, DB_PORT)
OR die('Could not connect to MySQL: ' . mysqli_connect_error());
?>