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
define('UPLOAD_DIR', __DIR__ . '/../../../../public/displayphotos/');

// Ensure the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    exit();
}

// Retrieve and sanitize inputs
$id = isset($_POST['userid']) ? (int)$_POST['userid'] : null;
$fullname = isset($_POST['fullname']) ? htmlspecialchars(trim($_POST['fullname']), ENT_QUOTES, 'UTF-8') : '';
$username = isset($_POST['username']) ? htmlspecialchars(trim($_POST['username']), ENT_QUOTES, 'UTF-8') : '';
$email = isset($_POST['email']) ? htmlspecialchars(trim($_POST['email']), ENT_QUOTES, 'UTF-8') : '';
$phone = isset($_POST['phone']) ? htmlspecialchars(trim($_POST['phone']), ENT_QUOTES, 'UTF-8') : '';
$file = isset($_FILES['image']) ? $_FILES['image'] : null;
$removeImage = isset($_POST['removeImage']) ? (bool)$_POST['removeImage'] : false;

// Validate User ID
if (!$id) {
    echo json_encode(['success' => false, 'message' => 'User ID is required.']);
    exit();
}

// Prepare SQL query to update admin user
$query = "UPDATE admin SET fullname = ?, username = ?, email = ?, phone = ? WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param('ssssi', $fullname, $username, $email, $phone, $id);

// Execute the update query
if ($stmt->execute()) {
    // Fetch the old image name
    $oldImageQuery = "SELECT img FROM admin WHERE id = ?";
    $oldImageStmt = $conn->prepare($oldImageQuery);
    $oldImageStmt->bind_param('i', $id);
    $oldImageStmt->execute();
    $oldImageStmt->bind_result($oldImageName);
    $oldImageStmt->fetch();
    $oldImageStmt->close();

    // Handle image removal request
    if ($removeImage && $oldImageName) {
        $filePath = UPLOAD_DIR . $oldImageName;
        if (file_exists($filePath)) {
            unlink($filePath);
        }
        // Remove image reference from the database
        $stmt = $conn->prepare("UPDATE admin SET img = NULL WHERE id = ?");
        $stmt->bind_param('i', $id);
        $stmt->execute();
    }

    // Check if a new file was uploaded
    if ($file && $file['error'] === UPLOAD_ERR_OK) {
        // Validate file type (allow only specific image types)
        $allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];
        $fileExtension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

        if (!in_array($fileExtension, $allowedTypes)) {
            echo json_encode(['success' => false, 'message' => 'Invalid image format.']);
            exit();
        }

        // Delete the old image file if it exists
        if ($oldImageName && file_exists(UPLOAD_DIR . $oldImageName)) {
            unlink(UPLOAD_DIR . $oldImageName);
        }

        // Generate a unique name for the new image
        $uniqueFileName = uniqid('img_', true) . '.' . $fileExtension;
        $targetFilePath = UPLOAD_DIR . $uniqueFileName;

        // Move the uploaded file securely
        if (move_uploaded_file($file['tmp_name'], $targetFilePath)) {
            // Update the user record with the new image filename
            $stmt = $conn->prepare("UPDATE admin SET img = ? WHERE id = ?");
            $stmt->bind_param('si', $uniqueFileName, $id);
            $stmt->execute();
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to upload image.']);
            exit();
        }
    }

    echo json_encode(['success' => true, 'message' => 'Details updated successfully.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to update details.']);
}

// Close statement and connection
$stmt->close();
$conn->close();
?>
