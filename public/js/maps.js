var map;
var drawingManager;
var shapes = [];
var myPolygon;
var drawShapes = [];
var checkLocation;

function initialize() {
    var myLatlng = new google.maps.LatLng(51.51686166794058, 3.5945892333984375);
    var mapOptions = {
        zoom: 9,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    //Getting map DOM element
    var mapElement = document.getElementById('map-canvas');

    map = new google.maps.Map(mapElement, mapOptions);

    drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [google.maps.drawing.OverlayType.POLYGON]
        },
        polygonOptions: {
            editable: true,
            // draggable: true
        }
    });

    drawingManager.setMap(map);

    $.ajax({
        url: baseURL + "api/data/showAllDataLocation",
        type: "get",
        success: function (response) {
            if (response.length > 0) {
                for (var i = 0; i < response.length; i++) {
                    drawShapes.push(new google.maps.LatLng(response[i].lat, response[i].longt));
                }
            } else {
                checkLocation = "No Data";
                console.log("No Data");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    }).done(function (response) {
        myPolygon = new google.maps.Polygon({
            path: drawShapes,
            editable: true,
            // draggable: true
        });

        if(checkLocation == "No Data"){
            myLatlng = new google.maps.LatLng(51.51686166794058, 3.5945892333984375);
        }else{
            myLatlng = new google.maps.LatLng(response[0].lat, response[0].longt);
        }
        mapOptions = {
            zoom: 18,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        map = new google.maps.Map(mapElement, mapOptions);

        myPolygon.setMap(map);
        drawingManager.setDrawingMode(null);
        drawingManager.setMap(map);

        google.maps.event.addListener(myPolygon.getPath(), "insert_at", getPolygonCoordsFirst);
        google.maps.event.addListener(myPolygon.getPath(), "set_at", getPolygonCoordsFirst);
    });

    // Add a listener for creating new shape event.
    google.maps.event.addListener(drawingManager, "overlaycomplete", function (event) {

        var newShape = event.overlay;
        newShape.type = event.type;
        shapes.push(newShape);
        if (drawingManager.getDrawingMode()) {
            drawingManager.setDrawingMode(null);
        }
        getPolygonCoords(event.overlay);
    });

    // add a listener for the drawing mode change event, delete any existing polygons
    google.maps.event.addListener(drawingManager, "drawingmode_changed", function () {
        if (drawingManager.getDrawingMode() != null) {
            myPolygon.setMap(null);
            for (var i = 0; i < shapes.length; i++) {
                shapes[i].setMap(null);
            }
            shapes = [];
        }
    });


    // Add a listener for the "drag" event.
    google.maps.event.addListener(drawingManager, "overlaycomplete", function (event) {
        overlayDragListener(event.overlay);
        $('#vertices').val(event.overlay.getPath().getArray());
    });
}

function overlayDragListener(overlay) {
    google.maps.event.addListener(overlay.getPath(), 'set_at', function (event) {
        $('#vertices').val(overlay.getPath().getArray());
        getPolygonCoords(overlay);
    });
    google.maps.event.addListener(overlay.getPath(), 'insert_at', function (event) {
        $('#vertices').val(overlay.getPath().getArray());
        getPolygonCoords(overlay);
    });
}

//Display Coordinates below map
function getPolygonCoordsFirst() {
    var len = myPolygon.getPath().getLength();
    var checkLast = len - 1;
    htmlStr = "";
    for (var i = 0; i < len; i++) {

        if (i == checkLast) {
            htmlStr += myPolygon.getPath().getAt(i).toUrlValue(10);
        } else {
            htmlStr += myPolygon.getPath().getAt(i).toUrlValue(10) + "---";
        }
        //Use this one instead if you want to get rid of the wrap > new google.maps.LatLng(),
        //htmlStr += "" + myPolygon.getPath().getAt(i).toUrlValue(5);
    }
    document.getElementById('info').innerHTML = htmlStr;

    var stringMD5 = "";
    var split = htmlStr.split("---");
    var checkLastSplit = split.length - 1;
    stringMD5 += "[";

    for (var i = 0; i < split.length; i++) {
        if (i == checkLastSplit) {
            stringMD5 += "lat/lng: (" + split[i] + ")";
        } else {
            stringMD5 += "lat/lng: (" + split[i] + "), ";
        }
    }
    stringMD5 += "]";
    $.ajax({
        url: baseURL + "api/data/storeMd5Location",
        type: "post",
        data: {'md5': stringMD5},
        success: function (response) {
            console.log(response.message);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}

//Display Coordinates below map
function getPolygonCoords(overlay) {
    var len = overlay.getPath().getLength();
    var checkLast = len - 1;
    htmlStr = "";
    for (var i = 0; i < len; i++) {

        if (i == checkLast) {
            htmlStr += overlay.getPath().getAt(i).toUrlValue(10);
        } else {
            htmlStr += overlay.getPath().getAt(i).toUrlValue(10) + "---";
        }
        //Use this one instead if you want to get rid of the wrap > new google.maps.LatLng(),
        //htmlStr += "" + myPolygon.getPath().getAt(i).toUrlValue(5);
    }
    document.getElementById('info').innerHTML = htmlStr;

    var stringMD5 = "";
    var split = htmlStr.split("---");
    var checkLastSplit = split.length - 1;
    stringMD5 += "[";

    for (var i = 0; i < split.length; i++) {
        if (i == checkLastSplit) {
            stringMD5 += "lat/lng: (" + split[i] + ")";
        } else {
            stringMD5 += "lat/lng: (" + split[i] + "), ";
        }
    }
    stringMD5 += "]";

    $.ajax({
        url: baseURL + "api/data/storeMd5Location",
        type: "post",
        data: {'md5': stringMD5},
        success: function (response) {
            console.log(response.message);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}

$('#saveLocation').click(function () {
    deleteLocationTable();

    setTimeout(function () {
        var getCoordinate = htmlStr.split("---");

        var i = 0;
        var myTimer = setInterval(function () {
            saveLocation(getCoordinate[i]);
            i++;

            if (getCoordinate.length == i) {
                clearInterval(myTimer);
            }

        }, 900);

    }, 1000);
});

function saveLocation(latLongt) {
    var splitCoordinate = latLongt.split(',');

    data = {
        'lat': splitCoordinate[0],
        'longt': splitCoordinate[1],
    }

    $.ajax({
        url: baseURL + "api/data/storeLocation",
        type: "post",
        data: data,
        success: function (response) {
            console.log(response.message);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}

function deleteLocationTable() {
    $('.reload').css('display', 'block');
    $.ajax({
        url: baseURL + "api/data/deleteLocationTable",
        type: "post",
        success: function (response) {
            console.log("Success");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });

    setTimeout(function () {
        $('.reload').css('display', 'none');
    }, 6000);
}


google.maps.event.addDomListener(window, 'load', initialize);