<?php
// Set a unique session name for each application
session_name('apparel360_session');
// Start the session if it's not already started
session_start();

// INCLUDE CORS SETTINGS 
include('../config/cors_settings.php');

// Initialize response array
$response = array("success" => false, "message" => "User not logged in.");

if (isset($_SESSION['email'])) {
    // Unset the email session variable
    // unset($_SESSION['email']);
    session_destroy();

    // Update response
    $response = array("success" => true, "message" => "Email session variable unset.");
} else {
    $response = array("success" => false, "message" => "Email session variable not set.");
}

// Send JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>
