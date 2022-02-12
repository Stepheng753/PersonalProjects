<?php
require_once('mysqli_connect.php');
$query = "SELECT f_name, l_name FROM student";
$response = @mysqli_query($dbc, $query);
if($response){
  while($row = mysqli_fetch_array($response)){
    echo $row['f_name'] . ' ' . $row['l_name'];
  }
}
?>