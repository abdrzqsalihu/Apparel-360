<?php
// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

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

// Include your database configuration file
include('../config/config.php');

// Assuming JSON data is sent and decoding it
$data = json_decode(file_get_contents("php://input"));

// Check if the action is for login
$action = isset($data->action) ? $data->action : '';

// Function to send JSON response
function sendJsonResponse($success, $message, $extra = []) {
    echo json_encode(array_merge(["success" => $success, "message" => $message], $extra));
    exit();
}

// Debugging: Log received data
file_put_contents('php://stderr', print_r($data, TRUE));

// Login logic
if ($action === 'login') {
    $email = htmlspecialchars($data->email, ENT_QUOTES, 'UTF-8');
    $password = htmlspecialchars($data->password, ENT_QUOTES, 'UTF-8');

    if (!$email || !$password) {
        sendJsonResponse(false, "Email and password are required");
    }

    $stmt = $conn->prepare("SELECT id, password FROM admin WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows == 1) {
        $stmt->bind_result($user_id, $hashed_password);
        $stmt->fetch();

        if (password_verify($password, $hashed_password)) {
            // Generate a token
            $token = bin2hex(random_bytes(32));
            
            // Store token in session
            $_SESSION['authToken'] = $token;
            $_SESSION['user_id'] = $user_id;
            $_SESSION['email'] = $email;

            sendJsonResponse(true, "Login successful", ["user_id" => $user_id, "token" => $token]);
        } else {
            sendJsonResponse(false, "Incorrect password");
        }
    } else {
        sendJsonResponse(false, "User does not exist");
    }

    $stmt->close();
} else {
    sendJsonResponse(false, "Invalid action");
}

$conn->close();
?>
