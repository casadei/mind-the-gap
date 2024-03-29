document.addEventListener("deviceready", onDeviceReady, false);

var ACCELEROMETER_OPTIONS, GPS_OPTIONS;
var accelerometerWatcher, gpsWatcher;

function onDeviceReady() {
    ACCELEROMETER_OPTIONS = { frequency : 5000 };
    GPS_OPTIONS = { frequency : 5000, enableHighAccuracy : true };

    bindButtons();
    deviceReady();
}

function bindButtons() {
    $('#accelerometer-watch').bind('change', function(event, ui) { 
        var checked = $('#accelerometer-watch').is(':checked');
        if (checked) {
            startAccelerometerWatcher();
        } else {
            stopAccelerometerWatcher();
        }
    });

    $('#accelerometer-get').bind('click', getAccelerometer);

    $('#gps-watch').bind('change', function(event, ui) { 
        var checked = $('#gps-watch').is(':checked');
        if (checked) {
            startGpsWatcher();
        } else {
            stopGpsWatcher();
        }
    });

    $('#gps-get').bind('click', getGps);
}

function deviceReady() {
    $('#device-name').text(device.name);
    $('#device-cordova').text(device.cordova);
    $('#device-platform').text(device.platform);
    $('#device-uuid').text(device.uuid);
    $('#device-version').text(device.version);
}

function getAccelerometer() {
    navigator.accelerometer.getCurrentAcceleration(accelerometerSuccess, accelerometerError);
}

function startAccelerometerWatcher() {
    if (!accelerometerWatcher) {
        accelerometerWatcher = navigator.accelerometer.watchAcceleration(accelerometerSuccess, accelerometerError, ACCELEROMETER_OPTIONS);
    }
}

function stopAccelerometerWatcher() {
    if (accelerometerWatcher) {
        navigator.accelerometer.clearWatch(accelerometerWatcher);
        accelerometerWatcher = null;        
    }
}

function accelerometerSuccess(acceleration) {
    $('#accelerometer-x').text(acceleration.x);
    $('#accelerometer-y').text(acceleration.y);
    $('#accelerometer-z').text(acceleration.z);
    $('#accelerometer-timestamp').text(new Date(acceleration.timestamp));
}

function accelerometerError() {
    alert('Erro ao tentar obter as informações do aceler&ocirc;metro.');
}

function getGps() {
    navigator.geolocation.getCurrentPosition(gpsSuccess, gpsError, GPS_OPTIONS);
}

function startGpsWatcher() {
    if (!gpsWatcher) {
        gpsWatcher = navigator.geolocation.watchPosition(gpsSuccess, gpsError, GPS_OPTIONS);
    }
}

function stopGpsWatcher() {
    if (gpsWatcher) {
        navigator.geolocation.clearWatch(gpsWatcher);
        gpsWatcher = null;        
    }
}

function gpsSuccess(position) {
    $('#gps-latitude').text(position.coords.latitude);
    $('#gps-longitude').text(position.coords.longitude);
    $('#gps-altitude').text(position.coords.altitude);
    $('#gps-accuracy').text(position.coords.accuracy);
    $('#gps-heading').text(position.coords.heading);
    $('#gps-speed').text(position.coords.speed);
    $('#gps-timestamp').text(new Date(position.timestamp));
    $('#gps-map').attr('src', 'http://maps.google.com/maps/api/staticmap?zoom=14&size=250x250&markers=color:green%7Clabel:A%7C' + 
        position.coords.latitude + ',' + position.coords.longitude + '&sensor=true');;
}

function gpsError() {
    alert('Erro ao tentar obter as informações do GPS.');
}