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

// Display incoming form data for debugging
header('Content-Type: application/json');

// Include database connection file
include('../config/config.php');

// Check if it's a POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Capture and sanitize the data sent from the form
    $productName = htmlspecialchars($_POST['product_name'] ?? '', ENT_QUOTES, 'UTF-8');
    $productDesc = htmlspecialchars($_POST['product_desc'] ?? '', ENT_QUOTES, 'UTF-8');
    $price = filter_var($_POST['price'] ?? '', FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
    $quantity = filter_var($_POST['quantity'] ?? '', FILTER_SANITIZE_NUMBER_INT);
    $sizes = htmlspecialchars($_POST['sizes'] ?? '', ENT_QUOTES, 'UTF-8');
    $category = htmlspecialchars($_POST['category'] ?? '', ENT_QUOTES, 'UTF-8');

    // Validate input data
    if (empty($productName) || empty($productDesc) || empty($price) || empty($quantity)) {
        echo json_encode(['success' => false, 'message' => 'Please fill all required fields.']);
        exit;
    }

    // Handle the image upload
    $imagePath = '';
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = '../../../../public/products/';
        // $allowedTypes = ['image/jpeg', 'image/png'];
        $allowedTypes = ['image/jpeg', 'image/png', 'image/webp']; // Allowed MIME types
        $fileType = $_FILES['image']['type'];
        $fileSize = $_FILES['image']['size'];
        $maxFileSize = 2 * 1024 * 1024; // 2 MB

        // Check if the directory exists and is writable
        if (!is_dir($uploadDir)) {
            echo json_encode(['success' => false, 'message' => 'Upload directory does not exist.']);
            exit;
        }

        if (!is_writable($uploadDir)) {
            echo json_encode(['success' => false, 'message' => 'Upload directory is not writable.']);
            exit;
        }

        // Validate file type
        if (!in_array($fileType, $allowedTypes)) {
            echo json_encode(['success' => false, 'message' => 'Invalid file type. Only image files are allowed.']);
            exit;
        }

        // Validate file size
        if ($fileSize > $maxFileSize) {
            echo json_encode(['success' => false, 'message' => 'File size exceeds the maximum limit of 2 MB.']);
            exit;
        }

        $imageName = uniqid('img_', true) . '.' . pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
        $imagePath = $uploadDir . $imageName;

        // Move the uploaded file to the target directory
        if (!move_uploaded_file($_FILES['image']['tmp_name'], $imagePath)) {
            echo json_encode(['success' => false, 'message' => 'Failed to upload image.']);
            exit;
        }
    } else if (isset($_FILES['image']) && $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
        echo json_encode(['success' => false, 'message' => 'Image upload failed with error code: ' . $_FILES['image']['error']]);
        exit;
    }

    $dateAdded = date('Y-m-d H:i:s');

    // Prepare an SQL statement
    $stmt = $conn->prepare("INSERT INTO products (productname, productprice, product_desc, product_image, quantity_available, sizes, category, date_added) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssss", $productName, $price, $productDesc, $imageName, $quantity, $sizes, $category, $dateAdded);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Product added successfully.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error adding product: ' . $stmt->error]);
    }

    $stmt->close();
    $conn->close();

} else {
    echo json_encode(['success' => false, 'message' => 'Only POST requests are accepted.']);
    exit;
}
?>
