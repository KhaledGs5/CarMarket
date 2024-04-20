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
    $CarID = $_POST['car_ID'];

    $sql = "UPDATE data
    SET brand = '$selectedBrand',
        name = '$eneterdName',
        Price = '$enteredPrice',
        Currency = '$enteredCurrency',
        Year = '$selectedYear',
        color = '$selectedColor',
        mileage = '$eneterdMiles',
        description = '$enteredDescription',
        fuel = '$enteredFuel',
        cylinder = '$enteredCylinder',
        fiscalpower = '$enteredFiscalPower'
    WHERE id = $CarID";
    $res = mysqli_query($link, $sql);


    $responseData  = [
        "carModified" => true
    ];
    
    echo json_encode($responseData);
    $link->close();
?>