<?php
     
    header('Access-Control-Allow-Origin: *'); 
    header('Access-Control-Allow-Headers: *');

    $users = "root";
    $password = "";
    $db = "database";
    $server="localhost";

    $link = mysqli_connect($server,$users,$password,$db);

    $sql = "SELECT * FROM users";
    $result = $link->query($sql);

    $users = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $users[] = $row;
        }
    }

    header('Content-Type: application/json');
    echo json_encode($users);

    $link->close();
?>