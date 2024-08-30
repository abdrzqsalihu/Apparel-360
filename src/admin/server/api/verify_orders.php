<?php
// Enable error reporting (disable in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Set a unique session name for each application
session_name('apparel360_session');
session_start();

// INCLUDE CORS SETTINGS
include('../config/cors_settings.php');

// Preflight response for OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include database configuration and connection
include('../config/config.php');

// Ensure the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    exit();
}

// Retrieve and decode JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Validate and sanitize inputs
$order_id = isset($input['order_id']) ? (int)$input['order_id'] : null;
$status = isset($input['status']) ? htmlspecialchars(trim($input['status']), ENT_QUOTES, 'UTF-8') : '';
$delivery_date = isset($input['delivery_date']) ? htmlspecialchars(trim($input['delivery_date']), ENT_QUOTES, 'UTF-8') : '';

// Validate inputs
if (!$order_id || !$status) {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
    exit();
}

// Prepare SQL queries
if ($status === 'cancelled') {
    $update_view_orders = "UPDATE view_orders SET status = ?, delivery_date = NULL WHERE orderid = ?";
    $update_customer_orders = "UPDATE customer_orders SET status = ? WHERE id = ?";
} else {
    $update_view_orders = "UPDATE view_orders SET status = ?, delivery_date = ? WHERE orderid = ?";
    $update_customer_orders = "UPDATE customer_orders SET status = ?, delivery_date = ? WHERE id = ?";
}

// Update view_orders table
$stmt1 = $conn->prepare($update_view_orders);
if ($status === 'cancelled') {
    $result1 = $stmt1->execute([$status, $order_id]);
} else {
    $result1 = $stmt1->execute([$status, $delivery_date, $order_id]);
}

if (!$result1) {
    echo json_encode(['success' => false, 'message' => 'Failed to update view_orders']);
    exit();
}

// Update customer_orders table
$stmt2 = $conn->prepare($update_customer_orders);
if ($status === 'cancelled') {
    $result2 = $stmt2->execute([$status, $order_id]);
} else {
    $result2 = $stmt2->execute([$status, $delivery_date, $order_id]);
}

if (!$result2) {
    echo json_encode(['success' => false, 'message' => 'Failed to update customer_orders']);
    exit();
}

// Return success response if both updates succeed
echo json_encode([
    'success' => true,
    'message' => 'Order updated successfully.'
]);

// Close statement and connection
$stmt1->close();
$stmt2->close();
$conn->close();
?>
