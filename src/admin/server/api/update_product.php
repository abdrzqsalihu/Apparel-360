<?php
// Enable error reporting (disable in production)
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
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    exit();
}

// Retrieve and sanitize inputs
$id = isset($_POST['editid']) ? (int)$_POST['editid'] : null;
$product_name = isset($_POST['product_name']) ? htmlspecialchars(trim($_POST['product_name']), ENT_QUOTES, 'UTF-8') : '';
$product_desc = isset($_POST['product_desc']) ? htmlspecialchars(trim($_POST['product_desc']), ENT_QUOTES, 'UTF-8') : '';
$price = isset($_POST['price']) ? (float)$_POST['price'] : 0;
$quantity = isset($_POST['quantity']) ? (int)$_POST['quantity'] : 0;
$sizes = isset($_POST['sizes']) ? htmlspecialchars(trim($_POST['sizes']), ENT_QUOTES, 'UTF-8') : '';
$category = isset($_POST['category']) ? htmlspecialchars(trim($_POST['category']), ENT_QUOTES, 'UTF-8') : '';
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
    // Check if a file was uploaded
    if ($file && $file['error'] === UPLOAD_ERR_OK) {
        // Validate file type (allow only specific image types)
        $allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];
        $fileExtension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

        if (!in_array($fileExtension, $allowedTypes)) {
            echo json_encode(['success' => false, 'message' => 'Invalid image format.']);
            exit();
        }

        // Fetch the old image name
        $oldImageQuery = "SELECT product_image FROM products WHERE id = ?";
        $oldImageStmt = $conn->prepare($oldImageQuery);
        $oldImageStmt->bind_param('i', $id);
        $oldImageStmt->execute();
        $oldImageStmt->bind_result($oldImageName);
        $oldImageStmt->fetch();
        $oldImageStmt->close();
        
        // Delete the old image file if it exists
        if ($oldImageName && file_exists(UPLOAD_DIR . $oldImageName)) {
            unlink(UPLOAD_DIR . $oldImageName);
        }

        // Generate a unique name for the new image
        $uniqueFileName = uniqid('img_', true) . '.' . $fileExtension;
        $targetFilePath = UPLOAD_DIR . $uniqueFileName;

        // Move the uploaded file securely
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

// Close statement and connection
$stmt->close();
$conn->close();
?>
