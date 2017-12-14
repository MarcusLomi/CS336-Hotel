<?php
$data = json_decode(file_get_contents("php://input"));
include "db.php";
$sql = "INSERT INTO breakfastReview(review_id, hotel_id, rating, b_type, text_comment, cid) VALUES ('$data->review_id', '$data->hotel_id', '$data->rating', '$data->b_type', '$data->text_comment', '$data->cid')";
if($data->review_id){
	$qry = $conn->query($sql);
}
$conn->close();
?>