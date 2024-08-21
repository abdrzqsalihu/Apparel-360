<?php
// Set a unique session name for each application
session_name('apparel360_admin_session');
session_start();

// INCLUDE CORS SETTINGS 
include('../config/cors_settings.php');

// Include database connection file
include('../config/config.php');

// Function to fetch count from a table
function getCount($conn, $table, $condition = "") {
    $query = "SELECT COUNT(*) FROM $table $condition";
    $result = $conn->query($query);

    if ($result) {
        $row = $result->fetch_row();
        return $row[0];
    } else {
        return 0;
    }
}

// Function to sum a specific column (e.g., view_count)
function getSum($conn, $table, $column, $condition = "") {
    $query = "SELECT SUM($column) FROM $table $condition";
    $result = $conn->query($query);

    if ($result) {
        $row = $result->fetch_row();
        return $row[0] ?? 0; // Return 0 if there's no result
    } else {
        return 0;
    }
}

// Fetch counts and sums
$pageViews = getSum($conn, 'pageviews', 'view_count'); // Sum the view_count column
$pendingMessages = getCount($conn, 'contact_us', 'WHERE status = "0"'); // Count rows where status is "0"
$totalOrders = getCount($conn, 'customer_orders');
$totalProducts = getCount($conn, 'products');

// Output the results
$response = [
    "pageViews" => $pageViews,
    "pendingMessages" => $pendingMessages,
    "totalOrders" => $totalOrders,
    "totalProducts" => $totalProducts
];

// Set content type to JSON and return the result
header('Content-Type: application/json');
echo json_encode($response);
?>
