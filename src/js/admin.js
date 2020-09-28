$(document).ready (function(){
    changeData('loading')
});
function changeData(key) { 
    switch (key) {
        case 'bookings':
            $('#id_user_mag').removeClass('active');
            $('#id_car_mag').removeClass('active');
            $('#id_booking_mag').addClass('active');
            
            var url = 'src/js/admin_bookings.js';
            $.getScript(url);
            $("#id_admin_content").load("public/admin_bookings.html");
            break;
        case 'cars':
            $('#id_user_mag').removeClass('active');
            $('#id_car_mag').addClass('active');
            $('#id_booking_mag').removeClass('active');
            
            var url = 'src/js/admin_cars.js';
            $.getScript(url);
            $("#id_admin_content").load("public/admin_cars.html");
            break;
        case 'users':
        default:
            $('#id_user_mag').addClass('active');
            $('#id_car_mag').removeClass('active');
            $('#id_booking_mag').removeClass('active');
            $("#id_admin_content").load("public/admin_users.html");
            var url = "src/js/admin_users.js";
            $.getScript(url);
            

            break;
    }
}