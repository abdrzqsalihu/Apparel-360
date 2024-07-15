<?php
// Set a unique session name for each application
session_name('apparel360_session');
// Start the session
session_start();

// Allow requests from any origin
header("Access-Control-Allow-Origin: http://localhost:5174");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json'); // Set the content type to JSON

// Preflight response for OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include('../config/config.php');

// Ensure the user is logged in
$user_email = isset($_SESSION['email']) ? $_SESSION['email'] : '';

if (empty($user_email)) {
    // User is not logged in, send JSON response
    echo json_encode(['success' => false, 'message' => 'User is not logged in']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

// Sanitize input data
$name = htmlspecialchars($input['name'], ENT_QUOTES, 'UTF-8');
$email = htmlspecialchars($input['email'], ENT_QUOTES, 'UTF-8');
$phone = htmlspecialchars($input['phone'], ENT_QUOTES, 'UTF-8');
$address = htmlspecialchars($input['address'], ENT_QUOTES, 'UTF-8');
$city = htmlspecialchars($input['city'], ENT_QUOTES, 'UTF-8');
$apartment = htmlspecialchars($input['apartment'] ?? '', ENT_QUOTES, 'UTF-8');
$deliveryLocation = htmlspecialchars($input['deliveryLocation'], ENT_QUOTES, 'UTF-8');
// $deliveryPrice = floatval($input['deliveryPrice']);
// $totalPrice = floatval($input['totalPrice']);
$date = date("Y-m-d");
// $status = 1;

$user_email = mysqli_real_escape_string($conn, $user_email); // Sanitize the user_id input

// Insert order into customer_orders
$sqr = "INSERT INTO customer_orders (name, email, mobile, address, street, city, state, o_date) 
        VALUES ('$name', '$email', '$phone', '$address', '$apartment', '$city', '$deliveryLocation', '$date')";

if (mysqli_query($conn, $sqr)) {
    // Get the last inserted ID from customer_orders
    $lastInsertedOrderId = mysqli_insert_id($conn);

    // Select products from cartlist
    $selectCartQuery = "SELECT * FROM cartlist WHERE email = '$user_email'";
    if ($cartResult = mysqli_query($conn, $selectCartQuery)) {
        if (mysqli_num_rows($cartResult) > 0) {
            // Loop through each item in the cartlist
            while ($cartData = mysqli_fetch_array($cartResult)) {
                $productname = mysqli_real_escape_string($conn, $cartData['productname']);
                $productprice = mysqli_real_escape_string($conn, $cartData['productprice']);
                $productid = mysqli_real_escape_string($conn, $cartData['productid']);
                $quantity = mysqli_real_escape_string($conn, $cartData['quantity']);
                $size = mysqli_real_escape_string($conn, $cartData['size']);
                $date = date("Y-m-d");
                // Insert product into view_orders with the last inserted orderid
                $insertOrderQuery = "INSERT INTO view_orders (productid, email, productname, productprice, quantity, size, orderid, order_date) 
                                     VALUES ('$productid', '$email', '$productname', '$productprice', '$quantity', '$size', '$lastInsertedOrderId', '$date')";
                if (!mysqli_query($conn, $insertOrderQuery)) {
                    echo json_encode(['success' => false, 'message' => 'Error inserting product into order: ' . mysqli_error($conn)]);
                    exit();
                }
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'No rows found in cartlist for this user email.']);
            exit();
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Error selecting cart data: ' . mysqli_error($conn)]);
        exit();
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Error inserting order: ' . mysqli_error($conn)]);
    exit();
}

// Clear cart for the current user
$sql = "DELETE FROM cartlist WHERE email = '$user_email'";
if (mysqli_query($conn, $sql)) {
    echo json_encode(['success' => true, 'message' => 'Order Placed Successfully!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error clearing cart: ' . mysqli_error($conn)]);
}

$conn->close();
?>
