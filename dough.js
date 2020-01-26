document.addEventListener("DOMContentLoaded", (event) => { 
    setCounter(getCounter())
    
    document.getElementById("tray").addEventListener( "click", () => {
        toggleCookieEater()
        changeFavicon("favicon-yummy.ico")

        setTimeout(() => {
            toggleCookieEater()
            changeFavicon("favicon.ico")
            updateCounter()
        }, 1000)
    }, false )
})

function toggleCookieEater() {
    document.getElementById("cookie").classList.toggle("rotate")
    document.getElementById("after").classList.toggle("transparent")
}

function changeFavicon(name) {
    document.getElementById("favicon").setAttribute("href", name)
}

function setCounter(counter) {
    document.getElementById("cookie-counter").innerText = buildContent(counter)
}

function buildContent(counter) {
    return (counter === 1) ? "1 cookie" : `${counter} cookies` 
}

function updateCounter() {
    let counter = getCounter()
    localStorage.setItem("counter", ++counter)
    setCounter(counter);
}

function getCounter() {
    if (typeof(Storage) !== "undefined") {
        return localStorage.counter ? localStorage.counter : 0
    }
    return 0
}
