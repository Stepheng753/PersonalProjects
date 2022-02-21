<?php

DEFINE ('DB_HOST', '5.181.218.155');
DEFINE ('DB_PORT', '3306');
DEFINE ('DB_USER', 'u190664279_test');
DEFINE ('DB_NAME', 'u190664279_testDB');

if (isset($_POST) && array_key_exists('password', $_POST)) {
	$DB_PASSWORD = $_POST['password'];
	$post_data = $_POST['post_data'];
	$get_data = $_POST['get_data'];
	$f_name = $_POST['f_name'];
	$l_name = $_POST['l_name'];

	$dbc = @mysqli_connect(DB_HOST, DB_USER, $DB_PASSWORD, DB_NAME, DB_PORT) OR 
		die('Could not connect to MySQL: ' . mysqli_connect_error());

	if ($post_data == 'TRUE') {
		$sql = '';
		if (isset($f_name) && !empty($f_name) && isset($l_name) && !empty($l_name)) {
			$sql = "INSERT INTO testTable (f_name, l_name) VALUES ('". $f_name . "','" . $l_name . "')";
		} else {
			$sql = "INSERT INTO testTable (f_name, l_name) VALUES ('NO NAME', 'GIVEN')";
		}
		if ($dbc->query($sql) === TRUE) {
			echo "New record created successfully";
		} else {
			echo "Error: " . $sql . "<br>" . $dbc->error;
		}
		echo "<br>";
	}
	if ($get_data == 'TRUE') {
		$query = "SELECT f_name, l_name FROM testTable";
		$response = @mysqli_query($dbc, $query);

		$count = 1;
		if($response){
			while($row = mysqli_fetch_array($response)){
				echo $count . ": " . $row['f_name'] . ' ' . $row['l_name'] . "<br>";
				$count++;
			}
		}
	}
} 
else {
  	echo 'INCORRECT PASSWORD!';
}

?>