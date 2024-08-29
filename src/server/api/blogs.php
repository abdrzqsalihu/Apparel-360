<?php
  // Allow requests from any origin
header("Access-Control-Allow-Origin: *");
// Allow all the methods
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
// Allow the Content-Type header to be sent
header("Access-Control-Allow-Headers: Content-Type");

include('../config/config.php');
$response = array();

if ($conn) {
    $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
    
if ($id) {
        // Fetchblogs limited by the id
        $sql = "SELECT * FROM blog WHERE id = ? ";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->get_result();
    } else {
        // Fetch all blogs
        $sql = "SELECT * FROM blog ORDER BY id DESC";
        $result = mysqli_query($conn, $sql);
    }

    if (mysqli_num_rows($result) > 0) {
        // output data of each row
        header('Content-Type: application/json');
        $i = 0;
        while($row = mysqli_fetch_assoc($result)) {
            $response[$i]['id'] = $row['id'];
            $response[$i]['title'] = $row['title'];
            $response[$i]['content'] = $row['content'];
            $response[$i]['cover_img'] = $row['cover_img'];
            $response[$i]['product_link'] = $row['product_link'];
            $response[$i]['date'] = $row['date'];
            $i++;
        }
        echo json_encode($response, JSON_PRETTY_PRINT);
    } else {
        echo json_encode([]);
    }
} else {
    echo 'Connection Error';
}
?>
