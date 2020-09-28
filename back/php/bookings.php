<?php

include 'db_connect.php';

$page = isset($_GET['p'])? $_GET['p']:'';
$table = "bookings";
if($page=='view'){
    $result = $conn->query("select * from $table B 
    left join car_booking CB on CB.Bid = B.Bid
    left join cars C on C.Cid = CB.Cid
    left join users U on U.Uid = B.Uid
    where B.request = 'N' and B.deleted = 0;");
    while($row = $result->fetch_assoc()){
        ?>
        <tr>
            <td><?php echo $row['Bid'] ?></td>
            <td><?php echo $row['fname'] ?></td>
            <td><?php echo $row['lname'] ?></td>
            <td><?php echo $row['email'] ?></td>
            <td><?php echo $row['Cid'] ?></td>
            <td><?php echo $row['model'] ?></td>
            <td><?php echo $row['type'] ?></td>
            <td><?php echo $row['price'] ?></td>
            <td><?php echo $row['total'] ?></td>
            <td><?php echo $row['cDate'] ?></td>
            <td><?php echo $row['Ddate'] ?></td>
        </tr>
        <?php
    }
}else{

header('Content-Type: application/json');

$input = filter_input_array(INPUT_POST);

if ($input['action'] == 'edit') {
    $conn->query("UPDATE $table SET model='" . $input['model'] . "', price='" . $input['price'] . "', 
     type='" . $input['type'] ."' WHERE Cid='" . $input['Cid'] . "'");
} else if ($input['action'] == 'accept') {
    $conn->query("UPDATE $table SET request = 'A' WHERE Bid='" . $input['Bid'] . "'");
} else if ($input['action'] == 'reject') {
    $conn->query("DELETE FROM car_booking WHERE Bid='" . $input['Bid'] . "'");
    $conn->query("DELETE FROM $table WHERE Bid='" . $input['Bid'] . "'");
}

mysqli_close($conn);
echo json_encode($input);
}

?>