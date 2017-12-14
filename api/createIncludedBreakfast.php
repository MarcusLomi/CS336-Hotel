<?php
$data = json_decode(file_get_contents("php://input"));
include "db.php";
$sql = "INSERT INTO includedBreakfast(invoice_No, b_type, hotel_id) VALUES ('$data->invoice_No', '$data->b_type', '$data->hotel_id')";
if($data->invoice_No){
	$qry = $conn->query($sql);
}
$conn->close();
?>