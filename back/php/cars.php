<?php

include 'db_connect.php';

$page = isset($_GET['p'])? $_GET['p']:'';
$add = isset($_POST['action'])? $_POST['action']:'';
$table = "cars";
if($page=='view'){
    $result = $conn->query("SELECT * from $table WHERE deleted = 0");
    while($row = $result->fetch_assoc()){
        ?>
        <tr>
            <td><?php echo $row['Cid'] ?></td>
            <td><?php echo $row['model'] ?></td>
            <td><?php echo $row['price'] ?></td>
            <td><?php echo $row['type'] ?></td>
        </tr>
        <?php
    }
}else if($add=='add'){
    $model = $price = $type =  "";
        $model = $_POST['data']["u_model"];
        $price = $_POST['data']["u_price"];
        $type = $_POST['data']["u_type"];

        $query = "INSERT INTO $table (model, price, type)".
        "VALUES($model,$price,'$type')";  
                        
        if ($conn->query($query) === TRUE) {
            $results = array(
                'result' => true,
                'message' =>  'Done'
            );
            echo json_encode($results);  
        } 
        else {
            $results = array(
                'result' => false,
                'message' => 'Registration failure',
                'sql_error' => $conn->error
            );				
            echo json_encode($results);			 
        }

        $conn->close();  
}else{

header('Content-Type: application/json');

$input = filter_input_array(INPUT_POST);

if ($input['action'] == 'edit') {
    $conn->query("UPDATE $table SET model='" . $input['model'] . "', price='" . $input['price'] . "', 
     type='" . $input['type'] ."' WHERE Cid='" . $input['Cid'] . "'");
} else if ($input['action'] == 'delete') {
    $conn->query("UPDATE $table SET deleted = 1 WHERE Cid='" . $input['Cid'] . "'");
}

mysqli_close($conn);
echo json_encode($input);
}

?>