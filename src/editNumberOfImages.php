<?php 
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: *');
    
    $data= "root";
    $password = "";
    $db = "database";
    $server="localhost";

    $link = mysqli_connect($server,$data,$password,$db);
    
    $userID = $_POST["user_id"];
    $carId = $_POST['car_ID'];
    $CarName = $_POST['car_name'];
    $CarNumberOfImages = $_POST['NumberOfImages'];
    $selectedImage = $_FILES['ImagePath']['tmp_name']; 
    $uploadedImageName = $CarName . '.png';
    $destinationPath = "C:/xampp/htdocs/testpage/public/DataImages/{$userID}/"; 
    if (!is_dir($destinationPath)) {
        mkdir($destinationPath, 0755, true); 
    }
    $newName = str_replace('.png', ' ' . ($CarNumberOfImages - 1) . '.png', $uploadedImageName);
    move_uploaded_file($selectedImage,$destinationPath . $newName);

    $sql = "UPDATE data
    SET NumberOfImages = $CarNumberOfImages
    WHERE id = $carId";

    $res = mysqli_query($link, $sql);

    $link->close();
?>