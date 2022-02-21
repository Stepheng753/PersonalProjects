<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<style type="text/css">
			h1,
			h2,
			h3 {
				text-decoration: underline;
			}
			body {
				margin: auto;
				margin-top: 50px;
				background: white;
				width: 1000px;
				padding-bottom: 500px;
			}
		</style>
		<title>Post Data</title>
	</head>
	<body>
		<form action="get_post_data_NO_REDIRECT.php" method="POST">
			<label>Enter in Password : </label>
			<input type="password" name="password" />
			<br />

			<label>Would you like to POST data : </label>
			<input type="radio" name="post_data" value="TRUE" />
			<label for="TRUE">YES</label>
			<input type="radio" name="post_data" value="FALSE" />
			<label for="FALSE">NO</label>
			<br />

			<label>Would you like to GET data : </label>
			<input type="radio" name="get_data" value="TRUE" />
			<label for="TRUE">YES</label>
			<input type="radio" name="get_data" value="FALSE" />
			<label for="FALSE">NO</label>
			<br />

			<label>First Name : </label>
			<input type="text" id="f_name" name="f_name" />
			<br />
			<label>Last Name : </label>
			<input type="text" id="l_name" name="l_name" />
			<br />
			<input type="submit" value="Submit" />
		</form>
		<br><br>
		<?php
		require_once('../../../PHPConnect/connectStore.php');
		if (isset($_POST) && array_key_exists('password', $_POST)) {
			$DB_PASSWORD = $_POST['password'];
			$post_data = $_POST['post_data'];
			$get_data = $_POST['get_data'];
			$f_name = $_POST['f_name'];
			$l_name = $_POST['l_name'];

			$dbc = @mysqli_connect(DB_HOST, Test_DB_USER, $DB_PASSWORD, Test_DB_NAME, DB_PORT) OR 
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
		?>

<!-- 		<script src="getName.js"></script> -->
	</body>
</html>
