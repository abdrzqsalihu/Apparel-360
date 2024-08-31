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


// Ensure the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    exit();
}

// Decode the incoming JSON request body
$data = json_decode(file_get_contents('php://input'), true);
$action = isset($data['action']) ? $data['action'] : null;
$userId = isset($data['userId']) ? (int)$data['userId'] : null;

if (!$conn) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit();
}


if ($action === 'getUserByID' && $userId) {
  // Fetch a specific user by ID
  $stmt = $conn->prepare("SELECT * FROM admin WHERE id = ?");
  $stmt->bind_param("i", $userId);

  if ($stmt->execute()) {
      $result = $stmt->get_result();
      if ($row = $result->fetch_assoc()) {
          $response = [
            'id' => $row['id'],
            'fullname' => $row['fullname'],
            'username' => $row['username'],
            'email' => $row['email'],
            'phone' => $row['phone'],
            'role' => $row['role'],
          ];
      } else {
          http_response_code(404);
          echo json_encode(['error' => 'User not found']);
          exit();
      }
  } else {
      http_response_code(500);
      echo json_encode(['error' => 'Database query failed']);
      exit();
  }
  $stmt->close();
} else {
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
          
        } else {
            echo json_encode([]);
        }
    } else {
        echo json_encode(['error' => 'Failed to execute query']);
    }
    
    // Close the statement
    $stmt->close();
}

header('Content-Type: application/json');
echo json_encode($response, JSON_PRETTY_PRINT);

// Close the connection
$conn->close();
?>
