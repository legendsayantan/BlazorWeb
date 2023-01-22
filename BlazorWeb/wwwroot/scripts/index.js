
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
//get the current domain
var domain = window.location.host;
document.getElementById('switch_domain').setAttribute('href', 'https://' + (domain.includes('github.io') ? domain.replace('github.io', 'is-a.dev') : domain.replace('is-a.dev', 'github.io')) + window.location.pathname);