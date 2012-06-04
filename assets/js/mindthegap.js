document.addEventListener("deviceready", onDeviceReady, false);

var accelerometerWatcher = null;

function onDeviceReady() {
    bindButtons();
    deviceReady();
}

function bindButtons() {
    $('#accelerometer-watch').bind("change", function(event, ui) { 
        if ($('#accelerometer-watch').is(':checked')) {
            startAccelerometerWatcher();
        } else {
            stopAccelerometerWatcher();
        }
    });

    $('#accelerometer-get').bind("click", getAccelerometer);
}

function deviceReady() {
    $('#device-name').innerHTML = device.name;
    $('#device-cordova').innerHTML = device.cordova;
    $('#device-platform').innerHTML = device.platform;
    $('#device-uuid').innerHTML = device.uuid;
    $('#device-verrsion').innerHTML = device.version;
}

function getAccelerometer() {
    navigator.accelerometer.getCurrentAcceleration(accelerometerSuccess, accelerometerError);
}

function startAccelerometerWatcher() {
    if (!accelerometerWatcher) {
        accelerometerWatcher = navigator.accelerometer.watchAcceleration(accelerometerSuccess, accelerometerError, { frequency: 5000 });
    }
}

function stopAccelerometerWatcher() {
    if (accelerometerWatcher) {
        navigator.accelerometer.clearWatch(accelerometerWatcher);
        accelerometerWatcher = null;        
    }
}

function accelerometerSuccess(acceleration) {
    $('#accelerometer-x').innerHTML = acceleration.x;
    $('#accelerometer-y').innerHTML = acceleration.y;
    $('#accelerometer-z').innerHTML = acceleration.z;
    $('#accelerometer-timestamp').innerHTML = acceleration.timestamp;
}

function accelerometerError() {
    alert('Erro ao tentar obter as informações do aceler&ocirc;metro.');
}