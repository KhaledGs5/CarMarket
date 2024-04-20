<?php 
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: *');
    include "cnx.php";

    $userName = $_POST['firstname'];
    $userLastName = $_POST['lastname'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $gendre = $_POST['gendre'];
    $phoneNumber = $_POST['phoneNumber'];
   
    if($userName != '' && $userLastName != '' && $email != '' && $password != '' && $gendre != '' && $phoneNumber != ''){
        $sql = "INSERT INTO users(gender,firstname,lastname,email,password, phonenumber) VALUES('$gendre','$userName','$userLastName','$email','$password','$phoneNumber');";
        $res = mysqli_query($link, $sql);
        
        if($res){
            $userId = mysqli_insert_id($link);
            $data = [
                "isLoggedIn" => true,
                "userId" => $userId
            ];
        }
        else{
            $data = [
                "isLoggedIn" => false,
                "userId" => null
            ];
        }
        echo json_encode($data);
    }else{
        $data = [
            "isLoggedIn" => false,
            "userId" => null
        ];
        echo json_encode($data);
    }
    
    $link->close();
?>