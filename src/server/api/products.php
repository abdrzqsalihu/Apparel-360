<?php
  // Allow requests from any origin
header("Access-Control-Allow-Origin: *");
// Allow all the methods
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
// Allow the Content-Type header to be sent
header("Access-Control-Allow-Headers: Content-Type");

include('../config/config.php');
$response = array();
if ($conn) {
    $sql = "SELECT * FROM products";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        // output data of each row
        header('Content-Type: JSON');
        $i = 0;
        while($row = mysqli_fetch_assoc($result)) {
            $response[$i]['id'] = $row['id'];
            $response[$i]['productname'] = $row['productname'];
            $response[$i]['productprice'] = $row['productprice'];
            $response[$i]['product_desc'] = $row['product_desc'];
            $response[$i]['product_image'] = $row['product_image'];
            $response[$i]['quantity_available'] = $row['quantity_available'];
            $response[$i]['category'] = $row['category'];
            $i++;
        }
        echo json_encode($response, JSON_PRETTY_PRINT);
    }
}else {
    echo'Connection Error';
}
?>

