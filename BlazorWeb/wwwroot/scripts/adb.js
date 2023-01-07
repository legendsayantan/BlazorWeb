async function connectADB(nameViewId) {
    console.log("Connecting to WebUSB");
    try {
        webusb = await Adb.open("WebUSB");
        adb = await webusb.connectAdb("host::");
    } catch (error) {
        console.error(error);
    }
    let dev = adb.transport.device;
    console.log(adb);
    if (adb) {
        document.getElementById(nameViewId).style.display = "block";
        document.getElementById(nameViewId).innerText = "Connected to " + dev.manufacturer + " " + dev.productName;
    } else {
        document.getElementById(nameViewId).innerText = "Not connected";
    }
}