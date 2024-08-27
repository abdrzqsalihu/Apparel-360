<?php
// Set a unique session name for each application
session_name('apparel360_admin_session');
session_start();

// INCLUDE CORS SETTINGS 
include('../config/cors_settings.php');

// Include database connection file
include('../config/config.php');

// Preflight response for OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($conn) {
   $email = isset($_SESSION['admin_email']) ? $_SESSION['admin_email'] : '';

    // Fetch all user info
    $sql = "SELECT * FROM admin WHERE email = '$email'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $response = array();
        while($row = mysqli_fetch_assoc($result)) {
            $response = [ 
                'id' => $row['id'],
                'fullname' => $row['fullname'],
                'username' => $row['username'],
                'email' => $row['email'],
                'phone' => $row['phone'],
                'role' => $row['role'],
                'display_img' => $row['img'],
                // 'lastlogin' => $row['last_login'],
                // 'lastip' => $row['last_ip'],
                // 'status' => $row['status'],
            ];
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
