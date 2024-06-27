<?php

// Start the session
session_start();
// Allow requests from any origin
header("Access-Control-Allow-Origin: http://localhost:5174");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true"); // Allow credentials
// header('Content-Type: application/json');

// Preflight response for OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include('../config/config.php');

// Check if user has an existing cart, if not, create a new one
if (!isset($_SESSION['cart'])) {
     $_SESSION['cart'] = array();
}

// Generate a unique ID for the user if it doesn't exist
if (!isset($_SESSION['user_id'])) {
    $_SESSION['user_id'] = uniqid('user_');
}


$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['id']) && isset($input['productname']) && isset($input['productprice']) && isset($input['quantity']) && isset($input['size']) && isset($input['productimage']))  {
    $productid = $input['id'];
    $productname = $input['productname'];
    $productprice = $input['productprice'];
    $productimage = $input['productimage'];
    $quantity = $input['quantity'];
    $size = $input['size'];

    // Create an array representing the product
    $product = array(
        'id' => $productid,
        'name' => $productname,
        'price' => $productprice,
        'image' => $productimage,
        'quantity' => $quantity,
        'size' => $size
    );

    // Add the product to the user's cart session
    $_SESSION['cart'][] = $product;

    // Add the product to the database
    $date = date("Y-m-d");
    $user_id = $_SESSION['user_id'];

    $sqr = "INSERT INTO cartlist (productid, user_id, productname, productprice, productimage, quantity, size, o_date) VALUES ('$productid', '$user_id', '$productname', '$productprice', '$productimage', '$quantity', '$size', '$date')";
    if (mysqli_query($conn, $sqr)) {
        echo json_encode(['success' => true, 'message' => 'Product added to cart!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error adding product to database']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Missing product information']);
}
?>
