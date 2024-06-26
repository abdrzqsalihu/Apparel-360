<?php
// Start the session
session_start();
// Allow requests from any origin
header("Access-Control-Allow-Origin: http://localhost:5174");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// Preflight response for OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include('../config/config.php');

if ($conn) {
   $user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : '';

    // Fetch all cart items
    $sql = "SELECT * FROM cartlist WHERE user_id = '$user_id'";
    // $sql = "SELECT * FROM cartlist";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $response = array();
        while($row = mysqli_fetch_assoc($result)) {
            $response[] = array(
                'id' => $row['id'],
                'productname' => $row['productname'],
                'productprice' => $row['productprice'],
                'productimage' => $row['productimage'],
                'quantity' => $row['quantity'],
                'size' => $row['size']
            );
        }
        header('Content-Type: application/json');
        echo json_encode($response, JSON_PRETTY_PRINT);
    } else {
        echo json_encode([]);
    }
} else {
    echo 'Connection Error';
}
?>
