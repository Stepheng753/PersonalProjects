<?php

require_once('connectDB.php');

$sql = "INSERT INTO testTable (f_name, l_name) VALUES ('TEST', '#3')";
if ($dbc->query($sql) === TRUE) {
  	echo "New record created successfully";
} else {
	echo "Error: " . $sql . "<br>" . $dbc->error;
}

?>