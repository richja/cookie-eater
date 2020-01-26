document.addEventListener("DOMContentLoaded", (event) => { 
    document.getElementById("tray").addEventListener( "click", () => {
        toggleCookieEater()
        changeFavicon("favicon-yummy.ico")
        setTimeout(() => {
            toggleCookieEater()
        changeFavicon("favicon-yummy.ico")
            changeFavicon("favicon.ico")
        }, 1000)
    }, false );
})

function toggleCookieEater() {
    document.getElementById("cookie").classList.toggle("rotate")
    document.getElementById("after").classList.toggle("transparent")
}

function changeFavicon(name) {
    document.getElementById("favicon").setAttribute("href", name)
}
