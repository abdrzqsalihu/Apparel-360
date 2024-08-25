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
    $blogTitle = htmlspecialchars($_POST['blog_title'] ?? '', ENT_QUOTES, 'UTF-8');
    $blogContent = htmlspecialchars($_POST['blog_content'] ?? '', ENT_QUOTES, 'UTF-8');
    $promotionalLink = htmlspecialchars($_POST['promotional_link'] ?? '', ENT_QUOTES, 'UTF-8');

    // Validate input data
    if (empty($blogTitle) || empty($blogContent) || empty($promotionalLink)) {
        echo json_encode(['success' => false, 'message' => 'Please fill all required fields.']);
        exit;
    }

    // Handle the image upload
    $imagePath = '';
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = '../../../../public/blogscover/';
        // $allowedTypes = ['image/jpeg', 'image/png'];
        $allowedTypes = ['image/jpeg', 'image/png', 'image/webp']; // Allowed MIME types
        $fileType = $_FILES['image']['type'];
        $fileSize = $_FILES['image']['size'];
        $maxFileSize = 3 * 1024 * 1024; // 3 MB

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
            echo json_encode(['success' => false, 'message' => 'File size exceeds the maximum limit of 3 MB.']);
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

    $dateAdded = date('F d, Y'); 

    // Prepare an SQL statement
    $stmt = $conn->prepare("INSERT INTO blog (title, content, cover_img, product_link, date) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $blogTitle, $blogContent, $imageName, $promotionalLink, $dateAdded);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Blog added successfully.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error adding blog: ' . $stmt->error]);
    }

    $stmt->close();
    $conn->close();

} else {
    echo json_encode(['success' => false, 'message' => 'Only POST requests are accepted.']);
    exit;
}
?>
