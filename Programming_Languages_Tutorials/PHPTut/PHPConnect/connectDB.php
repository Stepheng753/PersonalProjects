<?php

require_once('../../../PHPConnect/connectStore.php');

$dbc = @mysqli_connect(DB_HOST, Test_DB_USER, Test_DB_PASSWORD, Test_DB_NAME, DB_PORT)
OR die('Could not connect to MySQL: ' . mysqli_connect_error());

echo "Hello";
?>