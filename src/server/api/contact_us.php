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

$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['name']) && isset($input['email']) && isset($input['phone']) && isset($input['message'])) {
    // Sanitize input data
    $name = htmlspecialchars($input['name'], ENT_QUOTES, 'UTF-8');
    $email = htmlspecialchars($input['email'], ENT_QUOTES, 'UTF-8');
    $phone = htmlspecialchars($input['phone'], ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars($input['message'], ENT_QUOTES, 'UTF-8');
    $date = date("Y-m-d");

    // Prepare an SQL statement
    $stmt = $conn->prepare("INSERT INTO contact_us (name, email, phone, message, date) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $name, $email, $phone, $message, $date);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Message received!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error saving message to database']);
    }

    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Missing contact information']);
}

$conn->close();
?>
