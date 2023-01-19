console.log('init adb.js');
var adbInstance = null, dev = null;
var connectBtn, nameView, container;
async function connectADB(connectBtnId, nameViewId, controlViewId) {
    console.log("Connecting to WebUSB");
    let adb;
    try {
        webusb = await Adb.open("WebUSB");
        document.getElementById(nameViewId).innerText = "5. Click 'Allow' in your Android device.";
        adb = await webusb.connectAdb("host::");
        if (!webusb) {
            document.getElementById(nameViewId).innerText = "No device selected.";
        }
    } catch (error) {
        console.error(error);
    }
    if (adb) {
        dev = await adb.transport.device;
        connectBtn = document.getElementById(connectBtnId);
        nameView = document.getElementById(nameViewId);
        container = document.getElementById(controlViewId);
        connectBtn.style.display = "none";
        nameView.innerText = "Connected to " + dev.manufacturerName + " " + dev.productName;
        container.style.display = "block";
        adbInstance = adb;
    } else if (webusb) {
        document.getElementById(nameViewId).innerText = "Failed to connect";
    }
}
async function executePatch(data) {
    let str = await executeForResult(data);
    console.log(str);
    await disconnect();
    connectBtn.style.display = "block";
    nameView.innerText = "The selected material should be unlocked.";
    container.style.display = "none";
}
async function executeForResult(data) {
    let shell = await adbInstance.shell(data.replace("\n", ";"));
    let response = await shell.receive();
    let decoder = new TextDecoder("utf-8");
    let str;
    try {
        str = decoder.decode(response.data);
    } catch (error) {
        str = response;
    }
    return str;
}
async function disconnect() {
    dev.close();
}