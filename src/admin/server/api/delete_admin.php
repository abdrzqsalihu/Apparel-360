<?php
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

// Define the path to the uploads directory
define('UPLOAD_DIR', __DIR__ . '/../../../../public/displayphotos/');

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the raw POST data
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Check if ID is provided and is a valid integer
    if (isset($data['id']) && is_numeric($data['id'])) {
        $id = (int)$data['id'];

        // Prepare the statement to fetch the image filename
        $stmt = $conn->prepare('SELECT img FROM admin WHERE id = ?');
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $stmt->bind_result($admin_image);
        $stmt->fetch();
        $stmt->close();
        
        // Prepare and execute the DELETE statement for the admin entry
        $stmt = $conn->prepare('DELETE FROM admin WHERE id = ?');
        $stmt->bind_param('i', $id);
        
        if ($stmt->execute()) {
            // Check if any rows were affected
            if ($stmt->affected_rows > 0) {
                // Attempt to delete the image file if it exists
                if ($admin_image) {
                    $image_path = UPLOAD_DIR . $admin_image;
                    if (file_exists($image_path)) {
                        unlink($image_path);
                    }
                }
                echo json_encode(['status' => 'success', 'message' => 'User deleted successfully.']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'User not found.']);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to delete the User.']);
        }

        // Close the statement
        $stmt->close();
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid ID provided.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}

// Close the connection
$conn->close();
?>
