<?php
$data = json_decode(file_get_contents("php://input"));
include "db.php";
$sql = "INSERT INTO roomReview(review_id, hotel_id, rating, room_no, text_comment, cid) VALUES ('$data->review_id', '$data->hotel_id', '$data->rating', '$data->room_no', '$data->text_comment', '$data->cid')";
if($data->review_id){
	$qry = $conn->query($sql);
}
$conn->close();
?>