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

// Handle POST request for updating quantity
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['id']) && isset($input['quantity'])) {
        $id = $input['id'];
        $quantity = $input['quantity'];

        $user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : '';
        // $email = isset($_SESSION['email']) ? $_SESSION['email'] : '';

        // Update the quantity in the database
        $sql = "UPDATE cartlist SET quantity = '$quantity' WHERE id = '$id'";
        if (mysqli_query($conn, $sql)) {
            header('Content-Type: application/json');
            echo json_encode(['success' => true, 'message' => 'Quantity updated']);
        } else {
            header('Content-Type: application/json');
            echo json_encode(['success' => false, 'message' => 'Failed to update quantity']);
        }
    } else {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => 'Invalid input']);
    }
}

// Handle DELETE request for deleting item
if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $id = $_GET['id']; // Assuming the id is sent as a query parameter

    $user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : '';
    // $email = isset($_SESSION['email']) ? $_SESSION['email'] : '';

    // Delete item from the cart
    $sql = "DELETE FROM cartlist WHERE id = '$id'";

    if (mysqli_query($conn, $sql)) {
        header('Content-Type: application/json');
        echo json_encode(['success' => true, 'message' => 'Item deleted from cart']);
    } else {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => 'Failed to delete item from cart']);
    }
}

// Handle invalid request method
if ($_SERVER['REQUEST_METHOD'] !== 'POST' && $_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
