$(document).on('click','form#id_rent',function(){
    var data = $(this).serializeArray();
    data = objectifyForm(data);
    console.log(data);
    var temp  = $(this).parents('#id_card');
    request2DB("back/php/user_cars.php",data,"book_car",function(resultData){
        if(resultData.result === true){
            showSuccessAlert(resultData.message,3000);
            console.log(resultData);
            temp.addClass("d-none");
        }
    });
 });
$(document).ready(function () {
    $("#id_select_cars").submit(function (e) { 
        e.preventDefault();
        var data = $(this).serializeArray();
        data = objectifyForm(data);
        window.collec = new Date($('#collec').val());
        window.drop = new Date($('#drop').val());
        request2DB("back/php/user_cars.php",data,"listcars",function(resultData){
            if(resultData.result === true){
                var data = resultData.data;
                var body = $("#id_containt");
                var model = $("#id-car-model");
                if(window.user != "U"){
                    model.find("#id_rent").addClass("d-none");
                }
                body.html("");
                var drop = window.drop;
                var collec = window.collec
                var days = Math.round((drop-collec)/ (1000 * 3600 * 24));
                for(var i=0; i<data.length;i++ ){
                    model.find("#days").attr('value', days);  
                    var total = days * data[i].price;   
                    model.find("#total").attr('value', total);
                    model.find("#car").attr('value', data[i].id);
                    model.find("#price").html(data[i].price);
                    model.find("#model").html(data[i].model);
                    model.find("#type").attr('src', "img/cars/"+data[i].type+".jpg");
                    model.find("#pricecar").attr('value', data[i].price);
                    body.html(body.html()+model.html());
                }
                $('[id="collec"]').val(collec.toDateInputValue());
                $('[id="collec"]').attr('min', collec.toDateInputValue());
                $('[id="drop"]').val(drop.toDateInputValue());
                $('[id="drop"]').attr('min', drop.toDateInputValue());  
            }
        })
    });
    $("#collec").change(function (e) { 
        e.preventDefault();
        var collec = new Date($('#collec').val());
        var drop = new Date();
        drop.setDate(collec.getDate()+1.5);
        $('[id="collec"]').val(collec.toDateInputValue());
        $('[id="collec"]').attr('min', collec.toDateInputValue());
        $('[id="drop"]').val(drop.toDateInputValue());
        $('[id="drop"]').attr('min', drop.toDateInputValue());
        $('[id="days"]').attr('value', Math.round((drop-collec)/ (1000 * 3600 * 24)));        
    });
    $("#drop").change(function (e) { 
        e.preventDefault();
        var collec = new Date($('#collec').val());
        var drop = new Date($('#drop').val());
        $('[id="drop"]').val(drop.toDateInputValue());
        $('[id="days"]').attr('value', Math.round((drop-collec)/ (1000 * 3600 * 24)));          
    });
    setToday();
});
function setToday(){    
    var collec = new Date();
    var drop = new Date();
    drop.setDate(collec.getDate()+1);
    $('[id="collec"]').val(collec.toDateInputValue());
    $('[id="collec"]').attr('min', collec.toDateInputValue());
    $('[id="drop"]').val(drop.toDateInputValue());
    $('[id="drop"]').attr('min', drop.toDateInputValue());
    $('[id="days"]').attr('value', Math.round((drop-collec)/ (1000 * 3600 * 24)));  
}
Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});