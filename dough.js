document.addEventListener("DOMContentLoaded", (event) => { 
    document.getElementById("tray").addEventListener( "click", () => {
        toggleCookieEater();
        setTimeout(() => {
            toggleCookieEater();
        }, 1000)
    }, false );
})

function toggleCookieEater() {
    document.getElementById("cookie").classList.toggle("rotate");
    document.getElementById("after").classList.toggle("transparent");
}

console.log("ready")