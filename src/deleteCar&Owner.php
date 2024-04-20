<?php 
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: *');
    
    $users = "root";
    $data = "root";
    $password = "";
    $db = "database";
    $server="localhost";

    $link = mysqli_connect($server,$users,$password,$db);
    $link1 = mysqli_connect($server,$data,$password,$db);
    
    $owner = $_POST['owner_Id'];
    $carID = $_POST['car_ID'];
    $CarImage = $_POST['CarImage'];
    $CarNumberOfImages = $_POST['CarNumberOfImages'];
    $CarName =  $_POST['CarName'];


    $imageDirectory = "C:/xampp/htdocs/testpage/public/DataImages/{$owner}/";
    for ($i = 0; $i < $CarNumberOfImages; $i++) {
        $imagePath = $imageDirectory . $CarName . ' ' . $i . ".png";
        if (file_exists($imagePath)) {
            unlink($imagePath); 
        }
        
    }

    $sql = "UPDATE users SET car_Ids = REPLACE(car_Ids , ',$carID', '') WHERE id = $owner";
    $sql1 = "DELETE FROM data WHERE id = $carID";
    $res = mysqli_query($link, $sql);
    $res1 = mysqli_query($link1, $sql1);

    $response1Data = [
        "carDeleted" => true
    ];
    
    header('Content-Type: application/json');
    echo json_encode($response1Data);

    $link->close();
    $link1->close();
?>