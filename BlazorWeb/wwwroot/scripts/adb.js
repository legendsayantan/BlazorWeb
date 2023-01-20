console.log('init adb.js');
var adb;
var adbInstance = null, dev = null, webusb = null;
var connectBtn, nameView, container;
async function connectADB(connectBtnId, nameViewId, controlViewId) {
    console.log("Connecting to WebUSB");
    connectBtn = document.getElementById(connectBtnId);
    nameView = document.getElementById(nameViewId);
    container = document.getElementById(controlViewId);
    await usbConnection();
}
async function usbConnection() {
    try {
        webusb = await Adb.open("WebUSB");
    } catch (error) { }
    if (webusb == null) {
        nameView.innerText = "No device selected.";
        console.log('usb fail');
    } else {
        nameView.innerText = "Click 'Allow' in your Android device.";
        await askForAdb();
        await adbConnection();
    }
}
async function askForAdb() {
    try {
        adbInstance = await webusb.connectAdb("host::");
    } catch (error) {
        console.log(error);
        await askForAdb();
    }
}
async function adbConnection() {
    console.log("checking adb connection");
    if (adbInstance == null) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await adbConnection();
    } else {
        dev = await adbInstance.transport.device;
        console.log("ADB connection ready " + adbInstance);
        connectBtn.style.display = "none";
        nameView.innerText = "Connected to " + dev.manufacturerName + " " + dev.productName;
        container.style.display = "block";
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
    console.log("execution ready");
    let response = await shell.receive();
    let str;
    try {
        let decoder = new TextDecoder("utf-8");
        str = decoder.decode(response.data);
    } catch (error) {
        str = response;
    }
    return str;
}
async function disconnect() {
    webusb = null;
    adbInstance = null;
    try {
        dev.close();
    } catch (error) { }
}
async function getPackages() {
    if (webusb && adbInstance) return await executeForResult('pm list packages -f');
    else return '';
}
async function checkConnection() {
    console.log(webusb != null ? "webusb ok" : "webusb null");
    console.log(adbInstance != null ? "adb ok" : "adb null");
    return (webusb != null && adbInstance != null);
}
async function fetchAppInfo(view) {
    let txt = view.innerText;
    view.innerText = "Loading information on apps, please wait...";
    let data;
    await fetch('https://rawcdn.githack.com/0x192/universal-android-debloater/749820ca8616df97b81a2b51e0422f3ae7cd593c/resources/assets/uad_lists.json').then(async function (response) {
        return await response.text();
    })
        .then(async function (body) {
            data = body;
        });
    view.innerText = txt;
    return data;
}