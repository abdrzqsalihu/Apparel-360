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

// Ensure the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    exit();
}

// Decode the incoming JSON request body
$data = json_decode(file_get_contents('php://input'), true);
$action = isset($data['action']) ? $data['action'] : null;
$blogId = isset($data['blogId']) ? (int)$data['blogId'] : null;

if (!$conn) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit();
}

$response = [];

if ($action === 'getBlogByID' && $blogId) {
    // Fetch a specific blog by ID
    $stmt = $conn->prepare("SELECT * FROM blog WHERE id = ?");
    $stmt->bind_param("i", $blogId);

    if ($stmt->execute()) {
        $result = $stmt->get_result();
        if ($row = $result->fetch_assoc()) {
            $response = [
                'id' => $row['id'],
                'title' => $row['title'],
                'content' => $row['content'],
                'cover_img' => $row['cover_img'],
                'product_link' => $row['product_link'],
                'date' => $row['date'],
            ];
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Blog not found']);
            exit();
        }
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Database query failed']);
        exit();
    }
    $stmt->close();
} else {
    // Fetch all blogs
    $sql = "SELECT * FROM blog ORDER BY id DESC";
    $result = mysqli_query($conn, $sql);

    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            $response[] = [
                'id' => $row['id'],
                'title' => $row['title'],
                'content' => $row['content'],
                'cover_img' => $row['cover_img'],
                'product_link' => $row['product_link'],
                'date' => $row['date'],
            ];
        }
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Database query failed']);
        exit();
    }
}

header('Content-Type: application/json');
echo json_encode($response, JSON_PRETTY_PRINT);

$conn->close();
?>
