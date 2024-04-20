<?php 
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: *');
    
    $users = "root";
    $password = "";
    $db = "database";
    $server="localhost";

    $link = mysqli_connect($server,$users,$password,$db);
    
    $userID = $_POST['user_id'];
    $carID = $_POST['car_id'];

    $sql = "UPDATE users SET car_Ids = CONCAT(car_Ids, ',', $carID) WHERE id = $userID";
    $res = mysqli_query($link, $sql);

    
    $link->close();
?>