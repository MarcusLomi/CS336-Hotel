<?php
$data = json_decode(file_get_contents("php://input"));
include "db.php";
$sql = "INSERT INTO customer(cid, email, address, phone_no, customer_name, pass) VALUES ('$data->cid', '$data->email', '$data->address', '$data->phone_no', '$data->customer_name', '$data->pass')";
if($data->cid){
	$qry = $conn->query($sql);
}
$conn->close();
?>