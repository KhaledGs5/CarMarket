<?php
     
    header('Access-Control-Allow-Origin: *'); 
    header('Access-Control-Allow-Headers: *');

    $data = "root";
    $password = "";
    $db = "database";
    $server="localhost";

    $link = mysqli_connect($server,$data,$password,$db);

    $sql = "SELECT * FROM data";
    $result = $link->query($sql);

    $data = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }

    header('Content-Type: application/json');
    echo json_encode($data);

    $link->close();
?>