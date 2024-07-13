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
    
    
        // Fetch all delivery locations
        $sql = "SELECT * FROM delivery_locations";
        $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        // output data of each row
        header('Content-Type: application/json');
        $i = 0;
        while($row = mysqli_fetch_assoc($result)) {
            $response[$i]['id'] = $row['id'];
            $response[$i]['name'] = $row['name'];
            $response[$i]['price'] = $row['price'];
            $i++;
        }
        echo json_encode($response, JSON_PRETTY_PRINT);
    } else {
        echo json_encode([]);
    }
} else {
    echo 'Connection Error';
}
?>
