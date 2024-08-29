<?php
// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

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

// Include database connection
include('../config/config.php');

// Assuming JSON data is sent and decoding it
$data = json_decode(file_get_contents("php://input"));

// Check if the action is for registration or login
$action = isset($data->action) ? $data->action : '';

// Function to send JSON response
function sendJsonResponse($success, $message, $extra = []) {
    echo json_encode(array_merge(["success" => $success, "message" => $message], $extra));
    exit();
}

// Debugging: Log received data
file_put_contents('php://stderr', print_r($data, TRUE));

// create user logic
if ($conn) {
    $name = htmlspecialchars($data->name, ENT_QUOTES, 'UTF-8');
    $username = htmlspecialchars($data->username, ENT_QUOTES, 'UTF-8');
    $email = htmlspecialchars($data->email, ENT_QUOTES, 'UTF-8');
    $phone = htmlspecialchars($data->phone, ENT_QUOTES, 'UTF-8');
    $role = htmlspecialchars($data->role, ENT_QUOTES, 'UTF-8');
    $password = htmlspecialchars($data->password, ENT_QUOTES, 'UTF-8');

    if (!$name || !$email || !$username || !$password) {
        sendJsonResponse(false, "All fields are required");
    }

    $stmt_check_email = $conn->prepare("SELECT id FROM admin WHERE email = ?");
    $stmt_check_email->bind_param("s", $email);
    $stmt_check_email->execute();
    $stmt_check_email->store_result();

    if ($stmt_check_email->num_rows > 0) {
        sendJsonResponse(false, "Email already in use");
    }

    $stmt_check_email->close();
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);
    $date_created = date("Y-m-d");
    $stmt = $conn->prepare("INSERT INTO admin (fullname, username, email, phone, role, password, date_created) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssss", $name, $username, $email, $phone, $role, $hashed_password, $date_created);

    if ($stmt->execute()) {
            sendJsonResponse(true, "Account creation successful");
        $stmt_update->close();
    } else {
        sendJsonResponse(false, "Account creation failed " . $stmt->error);
    }

    $stmt->close();
}

$conn->close();
?>
