<?php 
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: *');
    
    $data= "root";
    $password = "";
    $db = "database";
    $server="localhost";

    $link = mysqli_connect($server,$data,$password,$db);
    
    $selectedBrand = $_POST['brand'];
    $eneterdName = $_POST['name'];
    $enteredPrice = $_POST['Price'];
    $enteredCurrency = $_POST['Currency'];
    $selectedYear = $_POST['Year'];
    $selectedColor = $_POST['color'];
    $eneterdMiles = $_POST['mileage'];
    $enteredDescription = $_POST['description'];
    $enteredFuel = $_POST['Fuel'];
    $enteredCylinder = $_POST['cylinder'];
    $enteredFiscalPower = $_POST['FiscalPower'];
    $userID = $_POST['userid'];
    $selectedImage = $_FILES['ImagePath']['tmp_name']; 
    $uploadedImageName = $_FILES['ImagePath']['name'];
    $uploadedImageName = $eneterdName . '.png';
    $destinationPath = "C:/xampp/htdocs/testpage/public/DataImages/{$userID}/"; 
    if (!is_dir($destinationPath)) {
        mkdir($destinationPath, 0755, true); 
    }
    $newName = str_replace('.png', ' 0.png' , $uploadedImageName);
    move_uploaded_file($selectedImage,$destinationPath . $newName);
    $targetPath = "DataImages/{$userID}/";
    $targetPath = $targetPath . $newName;
    $sql = "INSERT INTO data(brand,name,Price,Currency,Year,color,mileage,fiscalpower,cylinder,fuel,description,ImagePath,OwnerId) VALUES('$selectedBrand','$eneterdName','$enteredPrice','$enteredCurrency','$selectedYear','$selectedColor','$eneterdMiles','$enteredFiscalPower','$enteredCylinder','$enteredFuel','$enteredDescription','$targetPath','$userID');";
    $res = mysqli_query($link, $sql);
    $carId = mysqli_insert_id($link);   

    $responseData  = [
            "carAdded" => true,
            "car_id" => $carId,
    ];
    echo json_encode($responseData);
    $link->close();
?>