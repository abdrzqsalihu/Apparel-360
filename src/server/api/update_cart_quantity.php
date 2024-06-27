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

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['id']) && isset($input['quantity'])) {
        $id = $input['id'];
        $quantity = $input['quantity'];

        $user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : '';

        // Update the quantity in the database
        $sql = "UPDATE cartlist SET quantity = '$quantity' WHERE id = '$id' AND user_id = '$user_id'";
        if (mysqli_query($conn, $sql)) {
            echo json_encode(['success' => true, 'message' => 'Quantity updated']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to update quantity']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid input']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
