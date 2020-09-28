<html>

<head>
    <?php include('public/libraries.html');?>
    
</head>

<body>
<div class="container-fluid p-0">
    <?php 
    

    include('public/profile_bar.html');
    include('public/alert.html'); 
    session_start();
    if(isset($_SESSION['permission'])){
        if($_SESSION['permission'] === 'A'){
            include('public/admin.html'); 
        }
        if($_SESSION['permission'] === 'U'){
            include('public/header.html');
            include('public/cars.html'); 
        }
    }else{
        include('public/header.html');
        include('public/cars.html');
    }
    include('public/footer.html');
    if(isset($_SESSION['name'])){
        $name = $_SESSION['name'];
        $permission = $_SESSION['permission'];
        echo ("<script type='text/javascript'>setHeader('$permission','$name');</script>");
    }
    ?>
</div>
</body>
<footer>

</footer>

</html>