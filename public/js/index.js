//var myPolygon;
var htmlStr = "";
var triangleCoords = [];
var map;
function initialize() {
  // Polygon Coordinates
  $.ajax({
        url: baseURL + "api/data/showAllDataLocation",
        type: "get",
        success: function (response) {
          if(response.length > 0){
            for(var i=0;i<response.length;i++) 
            {
              triangleCoords.push(new google.maps.LatLng(response[i].lat,response[i].longt));
            }
          }else{
            triangleCoords = [
              new google.maps.LatLng(33.5362475, -111.9267386),
              new google.maps.LatLng(33.5104882, -111.9627875),
              new google.maps.LatLng(33.5004686, -111.9027061)
            ];
          }
          
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    }).done(function(){
      // Map Center
      var myLatLng = triangleCoords[0];
      // General Options
      var mapOptions = {
        zoom: 18,
        center: myLatLng,
        mapTypeId: google.maps.MapTypeId.RoadMap
      };
      map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);

      // Styling & Controls
      myPolygon = new google.maps.Polygon({
        paths: triangleCoords,
        draggable: true, // turn off if it gets annoying
        editable: true,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
      });

      myPolygon.setMap(map);
      //google.maps.event.addListener(myPolygon, "dragend", getPolygonCoords);
      google.maps.event.addListener(myPolygon.getPath(), "insert_at", getPolygonCoords);
      //google.maps.event.addListener(myPolygon.getPath(), "remove_at", getPolygonCoords);
      google.maps.event.addListener(myPolygon.getPath(), "set_at", getPolygonCoords);
    });
}

//Display Coordinates below map
function getPolygonCoords() {
  var len = myPolygon.getPath().getLength();
  var checkLast = len-1;
  htmlStr = "";
  for (var i = 0; i < len; i++) {

    if(i == checkLast){
      htmlStr += myPolygon.getPath().getAt(i).toUrlValue(10);
    }else{
      htmlStr += myPolygon.getPath().getAt(i).toUrlValue(10) + "---";
    }
    //Use this one instead if you want to get rid of the wrap > new google.maps.LatLng(),
    //htmlStr += "" + myPolygon.getPath().getAt(i).toUrlValue(5);
  }
  document.getElementById('info').innerHTML = htmlStr;
}

// $('#saveLocation').click(function(){
//     deleteLocationTable();

//     setTimeout(function(){
//       var getCoordinate = htmlStr.split("---");

//       var i=0;
//       var myTimer = setInterval(function(){
//         saveLocation(getCoordinate[i]); i++;  

//         if(getCoordinate.length == i){
//           console.log(getCoordinate.length + " --- " + i)
//           clearInterval(myTimer);
//         }

//       },1000);
    
//     }, 2000);
// });

$('#defaultLocation').click(function(){
  deleteLocationTable();
  setTimeout(function(){
      location.reload();
    }, 1000);
});

// function saveLocation(latLongt) {

//   var splitCoordinate = latLongt.split(',');

//   data = {
//     'lat' : splitCoordinate[0],
//     'longt' : splitCoordinate[1],
//   }

//   $.ajax({
//         url: baseURL + "api/data/storeLocation",
//         type: "post",
//         data: data ,
//         success: function (response) {
//           console.log(response.message);
//         },
//         error: function(jqXHR, textStatus, errorThrown) {
//            console.log(textStatus, errorThrown);
//         }
//     });
// }

// function deleteLocationTable() {
//   $.ajax({
//         url: baseURL + "api/data/deleteLocationTable",
//         type: "post",
//         success: function (response) {
//           console.log("Success");
//         },
//         error: function(jqXHR, textStatus, errorThrown) {
//            console.log(textStatus, errorThrown);
//         }
//     });
// }
google.maps.event.addDomListener(window, 'load', initialize);