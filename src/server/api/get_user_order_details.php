<?php
// Set a unique session name for each application
session_name('apparel360_session');
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
   $email = isset($_SESSION['email']) ? $_SESSION['email'] : '';

    // Fetch all user order info
    $sql = "SELECT * FROM view_orders WHERE email = '$email'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $response = array();
        while($row = mysqli_fetch_assoc($result)) {
            $response[] = array(
                'id' => $row['id'],
                'productid' => $row['productid'],
                'email' => $row['email'],
                'productname' => $row['productname'],
                'productprice' => $row['productprice'],
                'quantity' => $row['quantity'],
                'size' => $row['size'],
                'orderid' => $row['orderid'],
                'status' => $row['status'],
                'order_date' => $row['order_date'],
                'delivery_date' => $row['delivery_date'],
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
