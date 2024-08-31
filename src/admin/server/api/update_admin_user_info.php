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

// Function to send JSON response
function sendJsonResponse($success, $message, $extra = []) {
    echo json_encode(array_merge(["success" => $success, "message" => $message], $extra));
    exit();
}

// Debugging: Log received data
file_put_contents('php://stderr', print_r($data, TRUE));

// Update user logic
if ($conn) {
    $userId = htmlspecialchars($data->userId, ENT_QUOTES, 'UTF-8');
    $name = htmlspecialchars($data->name, ENT_QUOTES, 'UTF-8');
    $username = htmlspecialchars($data->username, ENT_QUOTES, 'UTF-8');
    $email = htmlspecialchars($data->email, ENT_QUOTES, 'UTF-8');
    $phone = htmlspecialchars($data->phone, ENT_QUOTES, 'UTF-8');
    $role = htmlspecialchars($data->role, ENT_QUOTES, 'UTF-8');
    $password = isset($data->password) ? htmlspecialchars($data->password, ENT_QUOTES, 'UTF-8') : null;

    if (!$userId || !$name || !$email || !$username) {
        sendJsonResponse(false, "All required fields must be provided");
    }

    // Check if the email is already in use by another user
    $stmt_check_email = $conn->prepare("SELECT id FROM admin WHERE email = ? AND id != ?");
    $stmt_check_email->bind_param("si", $email, $userId);
    $stmt_check_email->execute();
    $stmt_check_email->store_result();

    if ($stmt_check_email->num_rows > 0) {
        sendJsonResponse(false, "Email already in use by another account");
    }

    $stmt_check_email->close();

    // Prepare the update statement
    if ($password) {
        $hashed_password = password_hash($password, PASSWORD_BCRYPT);
        $stmt_update = $conn->prepare("UPDATE admin SET fullname = ?, username = ?, email = ?, phone = ?, role = ?, password = ? WHERE id = ?");
        $stmt_update->bind_param("ssssssi", $name, $username, $email, $phone, $role, $hashed_password, $userId);
    } else {
        $stmt_update = $conn->prepare("UPDATE admin SET fullname = ?, username = ?, email = ?, phone = ?, role = ? WHERE id = ?");
        $stmt_update->bind_param("sssssi", $name, $username, $email, $phone, $role, $userId);
    }

    if ($stmt_update->execute()) {
        sendJsonResponse(true, "Account update successful");
    } else {
        sendJsonResponse(false, "Account update failed: " . $stmt_update->error);
    }

    $stmt_update->close();
}

$conn->close();
?>
