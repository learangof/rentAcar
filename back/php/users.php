<?php

include 'db_connect.php';
if (mysqli_connect_errno()) {
    echo json_encode(array('mysqli' => 'Failed to connect to MySQL: ' . mysqli_connect_error()));
    exit;
  }

$page = isset($_GET['p'])? $_GET['p']:'';
$table = "users";
if($page=='view'){
    $result = $conn->query("SELECT * from $table WHERE deleted = 0");
    while($row = $result->fetch_assoc()){
        ?>
        <tr>
            <td><?php echo $row['Uid'] ?></td>
            <td><?php echo $row['fname'] ?></td>
            <td><?php echo $row['lname'] ?></td>
            <td><?php echo $row['phone'] ?></td>
            <td><?php echo $row['email'] ?></td>
            <td><?php echo $row['pass'] ?></td>
            <td>
                <?php 
                switch ($row['type']) {
                    case 'U':
                        echo "Customer";
                        break;
                    case 'A':
                        echo "Admin";
                        break;
                }
                ?>
            </td>
        </tr>
        <?php
    }
}else{

header('Content-Type: application/json');

$input = filter_input_array(INPUT_POST);

if ($input['action'] == 'edit') {
    $conn->query("UPDATE $table SET fname='" . $input['fname'] . "', lname='" . $input['lname'] . "', 
    phone='" . $input['phone'] .  "', email='" . $input['email'] . "', 
    pass='" . $input['pass'] . "', type='" . $input['type'] ."' WHERE Uid='" . $input['Uid'] . "'");
} else if ($input['action'] == 'delete') {
    $conn->query("UPDATE $table SET deleted = 1 WHERE Uid='" . $input['Uid'] . "'");
} else if ($input['action'] == 'restore') {
    $conn->query("UPDATE $table SET deleted=0 WHERE Uid='" . $input['Uid'] . "'");
}

mysqli_close($conn);

echo json_encode($input);
}

?>