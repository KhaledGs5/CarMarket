<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: *');
    include "cnx.php";
    if (isset($_POST["email"]) && isset($_POST["password"])){
        $email = $_POST["email"];
        $password = $_POST["password"];
        $result = mysqli_query($link, "SELECT * FROM users WHERE email = '$email'");
        if (mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);
            $storedPassword = $row['password'];
            if ($password == $storedPassword) {
                $data = [
                    "isLoggedIn" => true,
                    "userName" => $row['firstname'],
                    "userLastName" => $row['lastname'],
                    "userId" => $row['id']
                ];
            } else {
                $data = [
                    "isLoggedIn" => false,
                    "userName" => $row['firstname'],
                    "userLastName" => $row['lastname'],
                    "userId" => $row['id']
                ];
            }
            echo json_encode($data);
        } else {
            $data = [
                "isLoggedIn" => false,
                "userName" => $row['firstname'],
                "userLastName" => $row['lastname'],
                "userId" => $row['id']
            ];
            echo json_encode($data);
        }
    }
?>