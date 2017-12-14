<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$servername = "hoteldb04.cilb5i9tuujb.us-east-1.rds.amazonaws.com";
$username = "cs336";
$password = "cs336iscool";
$dbname = "HotelDB";
$conn = new mysqli($servername, $username, $password, $dbname);
?>