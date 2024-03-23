<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style type="text/css">
			body {
				width: 1000px;
				margin: auto;
				text-align: center;
			}
            a:hover {
				color: blue;
			}
			a:active {
				color: red;
			}
			a:visited {
				color: #000;
			}
			a {
                margin-left: 30px;
                margin-right: 30px;
				text-decoration: underline;
			}
            table, th, td {
                margin-left: auto;
                margin-right: auto;
                border: 1px solid black;
                table-layout: fixed ;
                width: 100% ;
            }
            #highlight-row {
                background-color: lightsalmon;
            }
		</style>
    <script src="https://cdn.jsdelivr.net/npm/p5@1.2.0/lib/p5.min.js"></script>
    <title>Slide Puzzle</title>
</head>
<body>
    <h1 style="padding: 0">Slide Puzzle</h1>
    <a id="Easy" onclick="javascript:reset(100)">Easy</a>
    <a id="Medium" onclick="javascript:reset(1000)">Medium</a>
    <a id="Hard" onclick="javascript:reset(10000)">Hard</a>
    <div style="padding-top: 15px;">
        Size:
        <input type="number" id="sizer" onKeyDown="return false" onchange="setSize()" size="1" style="width: 40px" />
    </div>
    <div style="padding-bottom: 25px; padding-top: 15px;">
        <div id="move-counter" style="display: inline-block; padding-right: 15px;"></div>
        <div id="time-counter" style="display: inline-block; padding-left: 15px;"></div>
    </div>
    <div id="solved"></div>
    <form action="./slidePuzzle.php" id="submitForm" method="POST"">
    </form>
    <?php 
        require_once('../../../PHPConnect/connectStore.php');
        if (isset($_POST) && array_key_exists('submit', $_POST)) {
            $dbc = @mysqli_connect(DB_HOST, LB_DB_USER, LB_DB_PASSWORD, LB_DB_NAME, DB_PORT)
            OR die('Could not connect to MySQL: ' . mysqli_connect_error());

            $name = $_POST['name'];
            $size = $_POST['size'];
            $numMoves = $_POST['numMoves'];
            $timeSecs = $_POST['time'];

            $sql = '';
            if (isset($name) && !empty($name)) {
                $sql = "INSERT INTO `slidePuzzleLB`(`name`, `size`, `numMoves`, `time(secs)`) VALUES ('". $name . "','" . $size . "','" . $numMoves . "','" . $timeSecs . "')";
                if ($dbc->query($sql) === TRUE) {
					echo "New record created successfully";
				} else {
					echo "Error: " . $sql . "<br>" . $dbc->error;
				}
            } else {
                echo "No Name Given";
            }
            echo "<br><br>";
            $query = "SELECT * FROM `slidePuzzleLB` WHERE size='" . $size ."' ORDER BY `time(secs)`";
            $response = @mysqli_query($dbc, $query);
            $count = 1;
            if($response){
                echo "<table style='align'>";
                echo "<tr>";
                echo "<th>Rank</th>";
                echo "<th>Name</th>";
                echo "<th>Moves</th>";
                echo "<th>Time (secs)</th>";
                echo "</tr>";
                while($row = mysqli_fetch_array($response)){
                    if ($row['name'] == $name && $row['numMoves'] == $numMoves && $row['time(secs)'] == $timeSecs) {
                        echo "<tr id='highlight-row'>";
                    } else {
                        echo "<tr>";
                    }
                    echo "<td>" . $count++ . "</td>";
                    echo "<td>" . $row['name'] . "</td>";
                    echo "<td>" . $row['numMoves'] . "</td>";
                    echo "<td>" . $row['time(secs)'] . "</td>";
                    echo "</tr>";
                }
                echo "</table>";
            }
            echo " <div style='padding-bottom: 25px;'></div>";
        }        
    ?>
   

    <script src="slidePuzzle.js""></script>
    <script>
        if ( window.history.replaceState ) {
            window.history.replaceState( null, null, window.location.href );
        }
    </script>
</body>
</html>