<?php
// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Set a unique session name for each application
session_name('apparel360_admin_session');
session_start();

// INCLUDE CORS SETTINGS
include('../config/cors_settings.php');

// Preflight response for OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include('../config/config.php');

// Define the path to the uploads directory
define('UPLOAD_DIR', __DIR__ . '/../../../../public/products/');

// Ensure the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    exit();
}

// Retrieve product ID and other details from the request
$id = isset($_POST['editid']) ? (int)$_POST['editid'] : null;
$product_name = isset($_POST['product_name']) ? $_POST['product_name'] : '';
$product_desc = isset($_POST['product_desc']) ? $_POST['product_desc'] : '';
$price = isset($_POST['price']) ? $_POST['price'] : '';
$quantity = isset($_POST['quantity']) ? $_POST['quantity'] : '';
$sizes = isset($_POST['sizes']) ? $_POST['sizes'] : '';
$category = isset($_POST['category']) ? $_POST['category'] : '';
$file = isset($_FILES['image']) ? $_FILES['image'] : null;

// Validate product ID
if (!$id) {
    echo json_encode(['success' => false, 'message' => 'Product ID is required.']);
    exit();
}

// Prepare SQL query to update product
$query = "UPDATE products SET productname = ?, productprice = ?, product_desc = ?, quantity_available = ?, sizes = ?, category = ? WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param('ssssssi', $product_name, $price, $product_desc, $quantity, $sizes, $category, $id);

if ($stmt->execute()) {
    if ($file && $file['error'] === UPLOAD_ERR_OK) {
        $oldImageQuery = "SELECT product_image FROM products WHERE id = ?";
        $oldImageStmt = $conn->prepare($oldImageQuery);
        $oldImageStmt->bind_param('i', $id);
        $oldImageStmt->execute();
        $oldImageStmt->bind_result($oldImageName);
        $oldImageStmt->fetch();
        $oldImageStmt->close();
        
        // Delete old image file if it exists
        if ($oldImageName && file_exists(UPLOAD_DIR . $oldImageName)) {
            unlink(UPLOAD_DIR . $oldImageName);
        }

        // Generate a unique name for the new image
        $fileExtension = pathinfo($file['name'], PATHINFO_EXTENSION);
        $uniqueFileName = uniqid('img_', true) . '.' . $fileExtension;
        $targetFilePath = UPLOAD_DIR . $uniqueFileName;

        // Move the uploaded file
        if (move_uploaded_file($file['tmp_name'], $targetFilePath)) {
            // Update the product record with the new image filename
            $stmt = $conn->prepare("UPDATE products SET product_image = ? WHERE id = ?");
            $stmt->bind_param('si', $uniqueFileName, $id);
            $stmt->execute();
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to upload image.']);
            exit();
        }
    }
    echo json_encode(['success' => true, 'message' => 'Product updated successfully.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to update the product.']);
}

$stmt->close();
$conn->close();
?>
