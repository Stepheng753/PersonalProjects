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
		</style>
    <script src="https://cdn.jsdelivr.net/npm/p5@1.2.0/lib/p5.min.js"></script>
    <title>Slide Puzzle</title>
</head>
<body>
    <div style="padding-top: 25px;"/>
    <a id="Easy" onclick="javascript:reset(100)">Easy</a>
    <a id="Medium" onclick="javascript:reset(1000)">Medium</a>
    <a id="Hard" onclick="javascript:reset(10000)">Hard</a>
    <div style="padding-top: 15px;">
        Size:
        <input type="number" id="sizer" onKeyDown="return false" onchange="setSize()" value="4" min="3" max="9" size="1" style="width: 40px" />
    </div>
    <div style="padding-bottom: 25px; padding-top: 15px;">
        <div id="move-counter" style="display: inline-block; padding-right: 15px;"></div>
        <div id="time-counter" style="display: inline-block; padding-left: 15px;"></div>
    </div>
    <div id="solved"></div>
    <form action="./slidePuzzle.php" method="POST" style="padding-bottom: 25px">
        <label>Enter in Name for Leaderboard:</label>
        <br>
        <input type="text" name="name" />
        <input type="hidden" name="numMoves" id="numMoves" />
        <input type="hidden" name="time" id="time" />
        <br><br>
        <input type="submit" name="submit"/>
    </form>
    <?php 
        require_once('../../../PHPConnect/connectStore.php');
        $dbc = @mysqli_connect(DB_HOST, LB_DB_USER, LB_DB_PASSWORD, LB_DB_NAME, DB_PORT)
        OR die('Could not connect to MySQL: ' . mysqli_connect_error());
        
        $name = $_POST['name'];
        $numMoves = $_POST['numMoves'];
        $timeSecs = $_POST['time'];

        $sql = '';
        if (isset($name) && !empty($name)) {
            $sql = "INSERT INTO slidePuzzleLB ('name', 'numMoves', 'time(secs)') VALUES ('". $name . "','" . $numMoves . "','" . $timeSecs . "')";
            $query = "SELECT * FROM `slidePuzzleLB`";
            $response = @mysqli_query($dbc, $query);

            $count = 1;
            if($response){
                while($row = mysqli_fetch_array($response)){
                    echo $count . ": " . $row['name'] . ' --- ' . $row['numMoves'] . ' --- ' . $row['time(secs)'] . "<br>";
                    $count++;
                }
            }
        } else {
            echo "No Name Given";
        }

        
    ?>

    <script src="slidePuzzle.js""></script>
</body>
</html>