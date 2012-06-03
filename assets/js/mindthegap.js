document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    loadDeviceProperties();
}

function loadDeviceProperties() {
    var element = document.getElementById('deviceProperties');

    element.innerHTML = 'Device Name: '     + device.name     + '<br />' + 
                        'Device Cordova: '  + device.cordova  + '<br />' + 
                        'Device Platform: ' + device.platform + '<br />' + 
                        'Device UUID: '     + device.uuid     + '<br />' + 
                        'Device Version: '  + device.version  + '<br />';
}