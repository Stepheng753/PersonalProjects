<?php

require_once('connectDB.php');

$query = "SELECT f_name, l_name FROM testTable";
$response = @mysqli_query($dbc, $query);
$count = 1;

if($response){
	while($row = mysqli_fetch_array($response)){
		echo $count . ": " . $row['f_name'] . ' ' . $row['l_name'] . "<br>";
		$count++;
	}
}
?>