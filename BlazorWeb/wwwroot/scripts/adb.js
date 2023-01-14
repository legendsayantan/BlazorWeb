console.log('initialising adb.js');
var adbInstance = null, dev = null;
var connectBtn, nameView, container;
async function connectADB(connectBtnId, nameViewId, controlViewId) {
    console.log("Connecting to WebUSB");
    let adb;
    try {
        webusb = await Adb.open("WebUSB");
        document.getElementById(nameViewId).innerText = "5. Click 'Allow' in your Android device.";
        adb = await webusb.connectAdb("host::");
    } catch (error) {
        console.error(error);
    }
    if (adb) {
        dev = adb.transport.device;
        connectBtn = document.getElementById(connectBtnId);
        nameView = document.getElementById(nameViewId);
        container = document.getElementById(controlViewId);
        connectBtn.style.display = "none";
        nameView.innerText = "Connected to " + dev.manufacturerName + " " + dev.productName;
        container.style.display = "block";
        adbInstance = adb;
    } else {
        document.getElementById(nameViewId).innerText = "Failed to connect";
    }
}
async function executeOnShell(data) {
    data = "am force-stop com.heytap.themestore; am force-stop com.nearme.themestore; " + data;
    let shell = await adbInstance.shell(data.replace("\n", ";"));
    console.log(await shell.receive());
    connectBtn.style.display = "block";
    nameView.innerText = "The selected material should be unlocked.";
    container.style.display = "none";
    dev.close();
}
