<?php
// Set a unique session name for each application
session_name('apparel360_admin_session');
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
    // Fetch all orders info
    $sql = "SELECT * FROM customer_orders ORDER by id DESC";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $response = array();
        while($row = mysqli_fetch_assoc($result)) {
            $response[] = array(
                'id' => $row['id'],
                'name' => $row['name'],
                'email' => $row['email'],
                'mobile' => $row['mobile'],
                'status' => $row['status'],
                'o_date' => $row['o_date'],
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
