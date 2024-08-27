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

include('../config/config.php');

// Ensure the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    exit();
}

// Decode the incoming JSON request body
$data = json_decode(file_get_contents('php://input'), true);
$action = isset($data['action']) ? $data['action'] : null;
$productId = isset($data['productId']) ? (int)$data['productId'] : null;

if (!$conn) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit();
}

$response = [];

if ($action === 'getProductByID' && $productId) {
    // Fetch a specific blog by ID
    $stmt = $conn->prepare("SELECT * FROM products WHERE id = ?");
    $stmt->bind_param("i", $productId);

    if ($stmt->execute()) {
        $result = $stmt->get_result();
        if ($row = $result->fetch_assoc()) {
            $response = [
                'id' => $row['id'],
                'productname' => $row['productname'],
                'productprice' => $row['productprice'],
                'productdesc' => $row['product_desc'],
                'productimage' => $row['product_image'],
                'qty_available' => $row['quantity_available'],
                'sizes' => $row['sizes'],
                'category' => $row['category'],
                'date_added' => $row['date_added'],
            ];
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Product not found']);
            exit();
        }
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Database query failed']);
        exit();
    }
    $stmt->close();
} else {
    // Fetch all product from the db 
    $sql = "SELECT * FROM products ORDER by id DESC";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $response = array();
        while($row = mysqli_fetch_assoc($result)) {
            $response[] = array(
                'id' => $row['id'],
                'productname' => $row['productname'],
                'productprice' => $row['productprice'],
                'productdesc' => $row['product_desc'],
                'productimage' => $row['product_image'],
                'qty_available' => $row['quantity_available'],
            );
        }
    } else {
        echo json_encode([]);
    }

}

header('Content-Type: application/json');
echo json_encode($response, JSON_PRETTY_PRINT);

$conn->close();
?>
