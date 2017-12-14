<?php
$data = json_decode(file_get_contents("php://input"));
include "db.php";
$sql = "INSERT INTO reservation(invoice_No, res_Date, Total_Amt, cid, Cnumber) VALUES ('$data->invoice_No', '$data->res_Date', '$data->Total_Amt', '$data->cid', '$data->Cnumber')";
if($data->invoice_No){
	$qry = $conn->query($sql);
}
$conn->close();
?>