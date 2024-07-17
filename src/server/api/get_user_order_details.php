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

$email = isset($_SESSION['email']) ? $_SESSION['email'] : '';
$id = isset($_GET['id']) ? (int)$_GET['id'] : null;

if ($action === 'order_details') {

if ($conn) {

   if ($id) {
  // Fetch all user order info by ID
  $sql = "  SELECT vo.*, product_image AS productimage
            FROM view_orders vo
            JOIN products p ON vo.productid = p.id
            WHERE vo.email = '$email' AND vo.id = $id";
  $result = mysqli_query($conn, $sql);
}  else {
    // Fetch all user order info
    $sql = " SELECT vo.*, product_image AS productimage
            FROM view_orders vo
            JOIN products p ON vo.productid = p.id
            WHERE vo.email = '$email'
            ORDER BY vo.id DESC";
    $result = mysqli_query($conn, $sql);
}

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
} else {
    echo 'Connection Error';
}

}elseif ($action === 'delivery_info') {
 
    if ($id) {
   // Fetch all user order info by ID
   $sql = "SELECT * FROM customer_orders WHERE id = '$id'";
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
