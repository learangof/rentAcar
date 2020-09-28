<html>

<head>
    <?php include('public/libraries.html'); ?>
</head>

<body class="bg-primary">
<div class="container-fluid p-0">
    <?php 
        include('public/alert.html'); 
        if($_SERVER['REQUEST_METHOD'] == 'GET'){
            switch ($_GET['action']) {
                case 'signup':
                    include('public/signup.html');
                    break;
                default:
                include('public/login.html');
                    break;
            }
        }     
    ?>

</div>
</body>
<footer>

</footer>

</html>