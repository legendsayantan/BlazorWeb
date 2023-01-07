
function animatePage() {
    var observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    });
    var sections = document.querySelectorAll('.hidden');
    sections.forEach((section) => observer.observe(section));
    var sections2 = document.querySelectorAll('.hidden2');
    sections2.forEach((section) => observer.observe(section));
    var sections2 = document.querySelectorAll('.hiddenY');
    sections2.forEach((section) => observer.observe(section)); 2
    var fades = document.querySelectorAll('.fade');
    fades.forEach((fade) => observer.observe(fade));
    var smalls = document.querySelectorAll('.small');
    smalls.forEach((small) => observer.observe(small));
}
function animatePageObserve() {
    var callback = function (mutationsList) {
        animatePage();
    };
    treeObserver(callback);
}
async function treeObserver(callback) {
    // Callback function to execute when mutations are observed
    var targetNode = document.getElementsByTagName('html')[0];
    if (!targetNode) targetNode = document.getElementsByTagName('body')[0];
    var config = {
        attributes: false,
        childList: true,
        subtree: true
    };
    var observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}
async function connectADB(connectBtnId,nameViewId,controlViewId) {
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
        document.getElementById(nameViewId).innerText = "Not connected";
    }
}
async function executeOnShell(data) {
    data = "am force-stop com.heytap.themestore; am force-stop com.nearme.themestore; " + data;
    let shell = await adbInstance.shell(data.replace("\n",";"));
    console.log(await shell.receive());
    connectBtn.style.display = "block";
    nameView.innerText = "The selected material should be unlocked.";
    container.style.display = "none";
    dev.close();
}
