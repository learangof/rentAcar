<?php

include 'db_connect.php';

	if($_SERVER['REQUEST_METHOD'] == 'POST'){
        if(isset($_POST["action"])){
            switch ($_POST["action"]){
                case 'login':
                    call_user_func('logIn');
                break;
                case 'register':
                    call_user_func('register');
                break;
                case 'select':
                    call_user_func('select_by_email');
                break;
                case 'update':
                    call_user_func('update');
                break;
            }
        }
    }
    function register(){
        $fname = $lname = $phone = $email = $password =  "";
        
        $conn = $GLOBALS['conn'];

        $fname = $_POST['data']["u_fName"];
        $lname = $_POST['data']["u_lName"];
        $phone = $_POST['data']["u_phone"];
		$email = $_POST['data']["u_email"];
        $password = $_POST['data']["u_pass"];
        $type = "U";

        $query = "INSERT INTO users(`fname`,`lname`,`phone`,`email`,`pass`,`type`)".
        "VALUES('$fname','$lname',$phone,'$email','$password','$type')";  
                        
        if ($conn->query($query) === TRUE) {
            $results = array(
                'result' => true,
                'message' =>  'Hi, ' . $fname . " ". $lname . ' your registration is successful'
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

    function logIn(){
        $name = $email = $password = "";
        $conn = $GLOBALS['conn'];

		$email = $_POST['data']["u_email"];
        $password = $_POST['data']["u_pass"];

            $query = "select type, fname, Uid from users where email = '$email' and pass = '$password' and deleted = 0";  
                        
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
                      "type" => $row['type'],
                      "name" => $row['fname'],
                      "id" => $row['Uid'],
                  ); 
               }
            }
            $stmt->close();
            $conn->close();
            if(!empty($response['data'])){
                $response['result'] = true;
                $response['message'] = 'done';
                session_start();
                $_SESSION['permission'] = $response['data'][0]["type"];
                $_SESSION['name'] = $response['data'][0]["name"];
                $_SESSION['id'] = $response['data'][0]["id"];
                $_SESSION['email'] = $email;
            }
            echo json_encode($response);                      
    }

    function update(){
        $email  = "";
        $conn = $GLOBALS['conn'];

        $fname = $_POST['data']["u_fName"];
        $lname = $_POST['data']["u_lName"];
        $phone = $_POST['data']["u_phone"];
		$email = $_POST['data']["u_email"];
        $password = $_POST['data']["u_pass"];


        $query = ("UPDATE users SET fname='" . $fname . "', lname='" . $lname . "', 
        phone='" . $phone .  "', email='" . $email . "', 
        pass='" . $password . "' WHERE email='" . $email . "'"); 
                        
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
                                'message' => 'Update failure',
                                'sql_error' => $conn->error
                            );				
                            echo json_encode($results);			 
                        }
                
                        $conn->close();    
    }


    function select_by_email(){
        $email  = "";
        $conn = $GLOBALS['conn'];

		$email = $_POST['data'];

            $query = "select * from users where email = '$email'";  
                        
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
                    "fname" => $row['fname'],
                    "lname" => $row['lname'],
                    "phone" => $row['phone'],
                    "email" => $row['email'],
                      "pass" => $row['pass']
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