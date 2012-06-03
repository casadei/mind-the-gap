document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    loadDevice();
}

function loadDevice() {
    document.getElementById('device-name').innerHTML = device.name;
    document.getElementById('device-cordova').innerHTML = device.cordova;
    document.getElementById('device-platform').innerHTML = device.platform;
    document.getElementById('device-uuid').innerHTML = device.uuid;
    document.getElementById('device-verrsion').innerHTML = device.version;
}