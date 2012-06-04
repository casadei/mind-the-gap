document.addEventListener("deviceready", onDeviceReady, false);

var accelerometerWatcher = null;

function onDeviceReady() {
    bindButtons();
    deviceReady();
}

function bindButtons() {
    $('#accelerometer-watch').bind("change", function(event, ui) { 
        var checked = $('#accelerometer-watch').is(':checked');
        if (checked) {
            startAccelerometerWatcher();
        } else {
            stopAccelerometerWatcher();
        }
    });

    $('#accelerometer-get').bind("click", getAccelerometer);
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
    $('#accelerometer-x').text(acceleration.x);
    $('#accelerometer-y').text(acceleration.y);
    $('#accelerometer-z').text(acceleration.z);
    $('#accelerometer-timestamp').text(acceleration.timestamp);
}

function accelerometerError() {
    alert('Erro ao tentar obter as informações do aceler&ocirc;metro.');
}