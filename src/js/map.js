function initialize() {
    var x = -36.8454268;
    var y = 174.7629916;
    var mapProp = {
        center: new google.maps.LatLng(x, y),
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("id_map"), mapProp);
    var marker = new google.maps.Marker({
        title: "Rent A Car",
        position: new google.maps.LatLng(x, y),
        animation: google.maps.Animation.DROP
    });

    marker.setMap(map);
    const video = '<div class="container-fluid text-center">'+
    '<h5 class="border-2 border-bottom">Rent A Car</h5>'+
    '<div class="embed-responsive embed-responsive-16by9 video">'+
        '<iframe class="embed-responsive-item" src="https://www.youtube.com/embed/_Om38MuNupk" frameborder="0"'+
            'allowfullscreen autoplay></iframe></div></div>';
    var infowindow = new google.maps.InfoWindow({
        content: video, 
        maxWidth: 800,
    });
    marker.addListener("click", () => {
        map.setZoom(18);
        map.setCenter(marker.getPosition());
        infowindow.open(map, marker);
    });

    //infowindow.open(map, marker);
}

google.maps.event.addDomListener(window, 'load', initialize);