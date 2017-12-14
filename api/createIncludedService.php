<?php
$data = json_decode(file_get_contents("php://input"));
include "db.php";
$sql = "INSERT INTO includedService(invoice_No,s_type,hotel_id) VALUES ('$data->invoice_No', '$data->s_type', '$data->hotel_id')";
if($data->invoice_No){
	$qry = $conn->query($sql);
}
$conn->close();
?>