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

// Connect to the database
include('../config/config.php');

if ($conn) {
    $email = isset($_SESSION['admin_email']) ? $_SESSION['admin_email'] : '';
    
    // Prepare the SQL statement
    $sql = "SELECT * FROM admin WHERE email != ? ORDER BY id DESC";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email); // Bind the email parameter
    
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $response = array();
            while($row = $result->fetch_assoc()) {
                $response[] = array(
                    'id' => $row['id'],
                    'fullname' => $row['fullname'],
                    'email' => $row['email'],
                    'phone' => $row['phone'],
                    'role' => $row['role'],
                    'date_created' => $row['date_created'],
                );
            }
            header('Content-Type: application/json');
            echo json_encode($response, JSON_PRETTY_PRINT);
        } else {
            echo json_encode([]);
        }
    } else {
        echo json_encode(['error' => 'Failed to execute query']);
    }
    
    // Close the statement
    $stmt->close();
} else {
    echo json_encode(['error' => 'Connection Error']);
}

// Close the connection
$conn->close();
?>
