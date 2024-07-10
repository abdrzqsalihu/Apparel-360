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

// Include your database configuration file
include('../config/config.php');

// Assuming JSON data is sent and decoding it
$data = json_decode(file_get_contents("php://input"));

// Check if the action is for registration or login
$action = isset($data->action) ? $data->action : '';

// Registration logic
if ($action === 'register') {
    $name = htmlspecialchars($data->name, ENT_QUOTES, 'UTF-8');
    $email = htmlspecialchars($data->email, ENT_QUOTES, 'UTF-8');
    $phone = htmlspecialchars($data->phone, ENT_QUOTES, 'UTF-8');
    $password = htmlspecialchars($data->password, ENT_QUOTES, 'UTF-8');

    // Check if all required fields are provided
    if (!$name || !$email || !$phone || !$password) {
        echo json_encode(["success" => false, "message" => "All fields are required"]);
        exit();
    }

    // Check if the email already exists in the database
    $stmt_check_email = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt_check_email->bind_param("s", $email);
    $stmt_check_email->execute();
    $stmt_check_email->store_result();

    if ($stmt_check_email->num_rows > 0) {
        // Email already exists, return error message
        echo json_encode(["success" => false, "message" => "Email already registered"]);
        exit();
    }

    $stmt_check_email->close();

    // Hash the password
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    // Prepare and execute the INSERT query for users table
    $stmt = $conn->prepare("INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $email, $phone, $hashed_password);

    if ($stmt->execute()) {
        // Store the email in the session
        $_SESSION['email'] = $email;

        // Update cartlist table with registered email if user_id session is set
        if (isset($_SESSION['user_id'])) {
            $user_id = $_SESSION['user_id'];
            
            // Prepare and execute the UPDATE query for cartlist table
            $stmt_update = $conn->prepare("UPDATE cartlist SET email = ? WHERE user_id = ?");
            $stmt_update->bind_param("si", $email, $user_id);

            if ($stmt_update->execute()) {
                echo json_encode(["success" => true, "message" => "Registration successful"]);
            } else {
                // Handle database update error
                echo json_encode(["success" => false, "message" => "Failed to update cart: " . $stmt_update->error]);
            }

            $stmt_update->close();
        } else {
            echo json_encode(["success" => false, "message" => "Session user_id not set"]);
        }

    } else {
        // Handle user registration error
        echo json_encode(["success" => false, "message" => "Registration failed: " . $stmt->error]);
    }

    $stmt->close();
}

// Login logic
elseif ($action === 'login') {
    $email = htmlspecialchars($data->email, ENT_QUOTES, 'UTF-8');
    $password = htmlspecialchars($data->password, ENT_QUOTES, 'UTF-8');

    // Check if all required fields are provided
    if (!$email || !$password) {
        echo json_encode(["success" => false, "message" => "Email and password are required"]);
        exit();
    }

    // Check if the user exists in the database
    $stmt = $conn->prepare("SELECT id, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows == 1) {
        // Retrieve the stored password hash
        $stmt->bind_result($user_id, $hashed_password);
        $stmt->fetch();

        // Verify the password
        if (password_verify($password, $hashed_password)) {
            // Password is correct, set session variables
            $_SESSION['email'] = $email;
            // $_SESSION['user_id'] = $user_id;

            // Update cartlist table with registered email if user_id session is set
            if (isset($_SESSION['user_id'])) {
                $user_id = $_SESSION['user_id'];
                
                // Prepare and execute the UPDATE query for cartlist table
                $stmt_update = $conn->prepare("UPDATE cartlist SET email = ? WHERE user_id = ?");
                $stmt_update->bind_param("si", $email, $user_id);

                if ($stmt_update->execute()) {
                    echo json_encode(["success" => true, "message" => "Login successful", "user_id" => $user_id]);
                } else {
                    // Handle database update error
                    echo json_encode(["success" => false, "message" => "Failed to update cart: " . $stmt_update->error]);
                }

                $stmt_update->close();
            } else {
                echo json_encode(["success" => false, "message" => "Session user_id not set"]);
            }

        } else {
            // Password is incorrect
            echo json_encode(["success" => false, "message" => "Incorrect password"]);
        }
    } else {
        // User does not exist
        echo json_encode(["success" => false, "message" => "User does not exist"]);
    }

    $stmt->close();
}

$conn->close();
?>