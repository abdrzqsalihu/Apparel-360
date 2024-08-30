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



// Assuming JSON data is sent and decoding it
$data = json_decode(file_get_contents("php://input"));

// Check if the action is for order details or delivery information
$action = isset($data->action) ? $data->action : '';

$order_id = isset($_GET['order_id']) ? (int)$_GET['order_id'] : null;
$delivery_id = isset($_GET['delivery_id']) ? (int)$_GET['delivery_id'] : null;

if ($action === 'order_details') {

if ($conn) {

   if ($order_id) {

    // Fetch all user order info
    $sql = " SELECT vo.*, product_image AS productimage
            FROM view_orders vo
            JOIN products p ON vo.productid = p.id
            WHERE vo.orderid = '$order_id'
            ORDER BY vo.id DESC";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $response = array();
        while($row = mysqli_fetch_assoc($result)) {
            $response[] = array(
                'id' => $row['id'],
                'productid' => $row['productid'],
                'email' => $row['email'],
                'productname' => $row['productname'],
                'productprice' => $row['productprice'],
                'productimage' => $row['productimage'],
                'quantity' => $row['quantity'],
                'size' => $row['size'],
                'orderid' => $row['orderid'],
                'status' => $row['status'],
                'order_date' => $row['order_date'],
                'delivery_date' => $row['delivery_date'],
            );
        }
        header('Content-Type: application/json');
        echo json_encode($response, JSON_PRETTY_PRINT);
    } else {
        echo json_encode([]);
    }
}


} else {
    echo 'Connection Error';
}

}elseif ($action === 'delivery_info') {
 
    if ($delivery_id) {
   // Fetch all user order info by ID
   $sql = "SELECT * FROM customer_orders WHERE id = '$delivery_id'";
   $result = mysqli_query($conn, $sql);

   if (mysqli_num_rows($result) > 0) {
    $response = array();
    while($row = mysqli_fetch_assoc($result)) {
        $response[] = array(
            'id' => $row['id'],
            'name' => $row['name'],
            'email' => $row['email'],
            'mobile' => $row['mobile'],
            'address' => $row['address'],
            'street' => $row['street'],
            'city' => $row['city'],
            'state' => $row['state'],
            'status' => $row['status'],
            'o_date' => $row['o_date'],
            'delivery_date' => $row['delivery_date'],
        );
    }
    header('Content-Type: application/json');
    echo json_encode($response, JSON_PRETTY_PRINT);
} else {
    echo json_encode([]);
}   
 }else {

 }
 
    
}
?>
