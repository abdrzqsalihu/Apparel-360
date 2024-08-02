<?php
// Set a unique session name for each application
session_name('apparel360_session');
// Start the session
session_start();

// INCLUDE CORS SETTINGS 
include('../config/cors_settings.php');

// Preflight response for OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include('../config/config.php');

if ($conn) {
   $user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : '';
   $email = isset($_SESSION['email']) ? $_SESSION['email'] : '';

    // Fetch all cart items
    // $sql = "SELECT * FROM cartlist WHERE email = '$email' OR user_id = '$user_id'";
    $sql = "SELECT * FROM cartlist WHERE (email = '$email' AND email != '') OR (user_id = '$user_id' AND user_id != '')";
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
