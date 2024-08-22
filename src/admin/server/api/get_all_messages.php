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

if ($conn) {
      // Get JSON data from the request body
      $data = json_decode(file_get_contents('php://input'), true);

    // $message_id = isset($_GET['message_id']) ? (int)$_GET['message_id'] : null;
    $message_id = isset($data['message_id']) ? (int)$data['message_id'] : null;
     $action = isset($data['action']) ? $data['action'] : null;

    // Fetch messages
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        if ($message_id) {
            // Fetch a single message by id
            $sql = "SELECT * FROM contact_us WHERE id = $message_id";
        } else {
            // Fetch all messages
            $sql = "SELECT * FROM contact_us ORDER BY id DESC";
        }
        $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) > 0) {
            $response = array();
            while($row = mysqli_fetch_assoc($result)) {
                $response[] = array(
                    'id' => $row['id'],
                    'name' => $row['name'],
                    'email' => $row['email'],
                    'phone' => $row['phone'],
                    'message' => $row['message'],
                    'status' => $row['status'],
                    'date' => $row['date'],
                );
            }
            header('Content-Type: application/json');
            echo json_encode($response, JSON_PRETTY_PRINT);
        } else {
            echo json_encode([]);
        }
    }

    // Delete a message
    if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
        if ($message_id) {
            $sql = "DELETE FROM contact_us WHERE id = $message_id";
            if (mysqli_query($conn, $sql)) {
                http_response_code(200);
                echo json_encode(['message' => 'Message deleted successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to delete the message']);
            }
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'No message ID provided']);
        }
    }

    // Update a message (e.g., mark as resolved)
    if ($_SERVER['REQUEST_METHOD'] == 'POST' && $action == 'update_status') {
        if ($message_id) {
            $status = isset($data['status']) ? (int)$data['status'] : 0;
            $sql = "UPDATE contact_us SET status = $status WHERE id = $message_id";
            if (mysqli_query($conn, $sql)) {
                http_response_code(200);
                echo json_encode(['message' => 'Message status updated successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to update the message status']);
            }
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'No message ID provided']);
        }
    }
} else {
    echo 'Connection Error';
}
?>
