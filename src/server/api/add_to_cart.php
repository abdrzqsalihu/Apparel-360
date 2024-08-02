<?php
// Set a unique session name for each application
session_name('apparel360_session');

// Start the session
session_start();

// INCLUDE CORS SETTINGS 
include('../config/cors_settings.php');

// Preflight response for OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include('../config/config.php'); // Ensure this file exists and contains your database connection

// Check if user has an existing cart, if not, create a new one
if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = array();
}

// Generate a unique ID for the user if it doesn't exist
if (!isset($_SESSION['user_id'])) {
    $_SESSION['user_id'] = uniqid('user_', true);
}

// echo $_SESSION['user_id'];

$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['id'], $input['productname'], $input['productprice'], $input['quantity'], $input['size'], $input['productimage'])) {
    $productid = htmlspecialchars($input['id'], ENT_QUOTES, 'UTF-8');
    $productname = htmlspecialchars($input['productname'], ENT_QUOTES, 'UTF-8');
    $productprice = htmlspecialchars($input['productprice'], ENT_QUOTES, 'UTF-8');
    $productimage = htmlspecialchars($input['productimage'], ENT_QUOTES, 'UTF-8');
    $quantity = htmlspecialchars($input['quantity'], ENT_QUOTES, 'UTF-8');
    $size = htmlspecialchars($input['size'], ENT_QUOTES, 'UTF-8');

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

    // Debugging session cart
    error_log("Session cart: " . print_r($_SESSION['cart'], true));

    // Add the product to the database
    $date = date("Y-m-d");
    $user_id = $_SESSION['user_id'];
    $email = isset($_SESSION['email']) ? $_SESSION['email'] : ''; // Ensure email is set

    // Prepare the SQL statement (Consider using prepared statements for security)
    $sqr = "INSERT INTO cartlist (email, productid, user_id, productname, productprice, productimage, quantity, size, o_date) VALUES ('$email', '$productid', '$user_id', '$productname', '$productprice', '$productimage', '$quantity', '$size', '$date')";
    
    // Execute the SQL statement
    if (mysqli_query($conn, $sqr)) {
        // Retrieve the cart item count from the database
        $result = mysqli_query($conn, "SELECT COUNT(*) as cart_count FROM cartlist WHERE user_id='$user_id'");
        $row = mysqli_fetch_assoc($result);
        $cartItemCount = $row['cart_count'];

        // Debugging database entries
        error_log("Database cart count for user $user_id: " . $cartItemCount);

        echo json_encode(['success' => true, 'message' => 'Product added to cart!', 'cartItemCount' => $cartItemCount]);
    } else {
        // Log and return error message
        error_log("Error adding product to database: " . mysqli_error($conn));
        echo json_encode(['success' => false, 'message' => 'Error adding product to database']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Missing product information']);
}
?>
