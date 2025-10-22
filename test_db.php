<?php
include 'assets/db.php';

// Test database connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    echo "Database connection successful!<br>";
    
    // Check if books table exists
    $result = $conn->query("SHOW TABLES LIKE 'books'");
    if ($result->num_rows > 0) {
        echo "Books table exists.<br>";
        
        // Show table structure
        $table_info = $conn->query("DESCRIBE books");
        if ($table_info) {
            echo "Books table structure:<br>";
            while($row = $table_info->fetch_assoc()) {
                echo "Field: " . $row['Field'] . " | Type: " . $row['Type'] . "<br>";
            }
        }
    } else {
        echo "Books table does not exist. You need to create it in PHP MyAdmin.<br>";
    }
}

$conn->close();
?>
