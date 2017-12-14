<?php
$data = json_decode(file_get_contents("php://input"));
include "db.php";
$sql = "INSERT INTO roomReservation(in_Date, out_Date, no_Of_Days, room_no, hotel_id, invoice_No) VALUES ('$data->in_Date', '$data->out_Date', '$data->no_Of_Days', '$data->room_no', '$data->hotel_id', '$data->invoice_No')";
if($data->invoice_No){
	$qry = $conn->query($sql);
}
$conn->close();
?>