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
define('UPLOAD_DIR', __DIR__ . '/../../../../public/blogscover/');

// Ensure the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    exit();
}

// Retrieve blog ID and other details from the request
$id = isset($_POST['editid']) ? (int)$_POST['editid'] : null;
$blogTitle = isset($_POST['blog_title']) ? $_POST['blog_title'] : '';
$blogContent = isset($_POST['blog_content']) ? $_POST['blog_content'] : '';
$promotionalLink = isset($_POST['promotional_link']) ? $_POST['promotional_link'] : '';
$file = isset($_FILES['image']) ? $_FILES['image'] : null;

// Validate blog ID
if (!$id) {
    echo json_encode(['success' => false, 'message' => 'Blog ID is required.']);
    exit();
}

// Prepare SQL query to update blog
$query = "UPDATE blog SET title = ?, content = ?, product_link = ? WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param('sssi', $blogTitle, $blogContent, $promotionalLink, $id);

if ($stmt->execute()) {
    if ($file && $file['error'] === UPLOAD_ERR_OK) {
        $oldImageQuery = "SELECT cover_img FROM blog WHERE id = ?";
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
            // Update the blog record with the new image filename
            $stmt = $conn->prepare("UPDATE blog SET cover_img = ? WHERE id = ?");
            $stmt->bind_param('si', $uniqueFileName, $id);
            $stmt->execute();
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to upload image.']);
            exit();
        }
    }
    echo json_encode(['success' => true, 'message' => 'Blog updated successfully.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to update the blog.']);
}

$stmt->close();
$conn->close();
?>
