<?php 
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: *');
    
    $users = "root";
    $password = "";
    $db = "database";
    $server="localhost";

    $link = mysqli_connect($server,$users,$password,$db);
    
    $userID = $_POST['userID'];

    $sql = "SELECT car_Ids FROM users WHERE id = $userID";
    $res = mysqli_query($link, $sql);

    
    if ($res) {
        $row = mysqli_fetch_assoc($res);
        $carIds = $row['car_Ids']; 

        echo json_encode($carIds);
    } else {
        echo json_encode(null);
    }
    $link->close();
?>