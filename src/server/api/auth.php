<?php
// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

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

// Include your database configuration file
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

// Registration logic
if ($action === 'register') {
    $name = htmlspecialchars($data->name, ENT_QUOTES, 'UTF-8');
    $email = htmlspecialchars($data->email, ENT_QUOTES, 'UTF-8');
    $phone = htmlspecialchars($data->phone, ENT_QUOTES, 'UTF-8');
    $password = htmlspecialchars($data->password, ENT_QUOTES, 'UTF-8');

    if (!$name || !$email || !$phone || !$password) {
        sendJsonResponse(false, "All fields are required");
    }

    $stmt_check_email = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt_check_email->bind_param("s", $email);
    $stmt_check_email->execute();
    $stmt_check_email->store_result();

    if ($stmt_check_email->num_rows > 0) {
        sendJsonResponse(false, "Email already registered");
    }

    $stmt_check_email->close();
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);
    $stmt = $conn->prepare("INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $email, $phone, $hashed_password);

    if ($stmt->execute()) {
        $_SESSION['email'] = $email;
        

        if (isset($_SESSION['user_id'])) {
            $user_id = $_SESSION['user_id'];    
        }else {
           $user_id = $_SESSION['user_id'] = $stmt->insert_id;
        }

        $stmt_update = $conn->prepare("UPDATE cartlist SET email = ? WHERE user_id = ?");
        $stmt_update->bind_param("ss", $email, $user_id);

        if ($stmt_update->execute() || $stmt_update->affected_rows === 0) {
            sendJsonResponse(true, "Registration successful");
        } else {
            sendJsonResponse(false, "Failed to update cart: " . $stmt_update->error);
        }

        $stmt_update->close();
    } else {
        sendJsonResponse(false, "Registration failed: " . $stmt->error);
    }

    $stmt->close();
}

// Login logic
elseif ($action === 'login') {
    $email = htmlspecialchars($data->email, ENT_QUOTES, 'UTF-8');
    $password = htmlspecialchars($data->password, ENT_QUOTES, 'UTF-8');

    if (!$email || !$password) {
        sendJsonResponse(false, "Email and password are required");
    }

    $stmt = $conn->prepare("SELECT id, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows == 1) {
        $stmt->bind_result($user_id, $hashed_password);
        $stmt->fetch();

        if (password_verify($password, $hashed_password)) {
            $_SESSION['email'] = $email;
            // $_SESSION['user_id'] = $user_id;
            

            if (isset($_SESSION['user_id'])) {
                $user_id = $_SESSION['user_id'];    
            }else {
                $_SESSION['user_id'] = $user_id;
            }

            $stmt_update = $conn->prepare("UPDATE cartlist SET email = ? WHERE user_id = ?");
            $stmt_update->bind_param("ss", $email, $user_id);

            if ($stmt_update->execute() || $stmt_update->affected_rows === 0) {
                sendJsonResponse(true, "Login successful", ["user_id" => $user_id]);
            } else {
                sendJsonResponse(true, "Login successful", ["user_id" => $user_id]); // Allow login even if update fails
            }

            $stmt_update->close();
        } else {
            sendJsonResponse(false, "Incorrect password");
        }
    } else {
        sendJsonResponse(false, "User does not exist");
    }

    $stmt->close();
}

$conn->close();
?>
