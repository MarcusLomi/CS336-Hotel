<?php
$data = json_decode(file_get_contents("php://input"));
include "db.php";
//insert into creditCard(Cnumber, cid, billing_Addr, cardholder_name, sec_Code, card_type, exp_date)
//values('123','test','hello', 'marcus','888','amex','2018-12-30')
$sql = "INSERT INTO creditCard(Cnumber, cid, billing_Addr, cardholder_name, sec_Code, card_type, exp_date) VALUES ('$data->Cnumber', '$data->cid', '$data->billing_Addr', '$data->cardholder_name', '$data->sec_Code', '$data->card_type', '$data->exp_date')";
if($data->cid){
	$qry = $conn->query($sql);
}
$conn->close();
?>