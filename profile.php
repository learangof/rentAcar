<html>

<head>
    <?php include('public/libraries.html');?>
    
</head>

<body>
<div class="container-fluid p-0">
    <?php 
    
    session_start();
    if(isset($_SESSION['name'])){
    include('public/profile_bar.html');
    include('public/alert.html'); 
    include('public/edit_profile.html');
    
        $name = $_SESSION['name'];
        $permission = $_SESSION['permission'];
        $email = $_SESSION['email'];
        echo ("<script type='text/javascript'>setHeader('$permission','$name');</script>");
        echo ("<script type='text/javascript'>getUserData('$email');</script>");

    } else {
        header('Location: index.php');
    }

    ?>
</div>
</body>
<footer>

</footer>

</html>