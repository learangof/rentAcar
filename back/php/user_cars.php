<?php

include 'db_connect.php';

	if($_SERVER['REQUEST_METHOD'] == 'POST'){
        if(isset($_POST["action"])){
            switch ($_POST["action"]){
                case 'listcars':
                    call_user_func('getCars');
                break;
                case 'book_car':
                    call_user_func('book_a_car');
                break;
            }
        }
    }
    function book_a_car(){
        $user = $car = $total = $collec = $drop =  "";
        
        $conn = $GLOBALS['conn'];
        session_start();
        $user = $_SESSION['id'] ;
        $car = $_POST['data']["car"];
        $total = $_POST['data']["total"];
		$collec = $_POST['data']["collec"];
        $drop = $_POST['data']["drop"];

        $query = "call create_booking ($user, $car, $total, '$collec', '$drop')";  
                        
        if ($conn->query($query) === TRUE) {
            $results = array(
                'result' => true,
                'message' =>  'Your booking is successful, please wait until admin accept your booking'
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
    }
    function getCars(){
        $collec = $drop = "";
        $conn = $GLOBALS['conn'];

		$collec = $_POST['data']["collec"];
        $drop = $_POST['data']["drop"];

            $query = "select C.* from cars C
            left join car_booking CB on  CB.Cid = C.Cid
            where CB.Cid is null or CB.cDate not between '$collec' and '$drop';";

            $response = array(
                'result' => false,
                'message' => 'Log In failure',
            );				
            $stmt = $conn->stmt_init();
            
            if(!$stmt->prepare($query))
            {
                $response = array(
					'result' => false,
					'message' => 'Log In failure',
					'sql_error' => $conn->error
				);						
            }
            else
            {
              $stmt->execute();
              $result = $stmt->get_result();		
              while($row = mysqli_fetch_assoc($result)){
                  $response['data'][] = array(
                      "model" => $row['model'],
                      "price" => $row['price'],
                      "id" => $row['Cid'],
                      "type" => $row['type'],
                  ); 
               }
            }
            $stmt->close();
            $conn->close();
            if(!empty($response['data'])){
                $response['result'] = true;
                $response['message'] = 'done';
            }
            echo json_encode($response);     
    }




?>