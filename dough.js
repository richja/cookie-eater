
document.addEventListener("DOMContentLoaded", (event) => { 
    let db = initFireFirebase()
    let counterRef = db.collection("hits").doc("counter")

    setCounter(getCounter())
    getGlobalCounter(counterRef).then((result) => {
        // use the result here
        setCounter(result)
        console.log(result)
    })

    counterRef.onSnapshot((doc) => {
        const source = doc.metadata.hasPendingWrites ? "Local" : "Server"
        console.log(source, " data: ", doc.data())
    })
    
    document.getElementById("tray").addEventListener("click", () => {
        toggleCookieEater()
        changeFavicon("favicon-yummy.ico")

        setTimeout(() => {
            toggleCookieEater()
            changeFavicon("favicon.ico")
            updateCounter()
            incrementGlobalCounter(counterRef)
        }, 1000)
    }, false)
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
    setCounter(counter) 
}

function getCounter() {
    if (typeof(Storage) !== "undefined") {
        return localStorage.counter ? localStorage.counter : 0
    }
    return 0
}

function initFireFirebase() {
    firebase.initializeApp({
        apiKey: "AIzaSyBuJUN6DocXhvzE4bVj327a3R80fh1qei8",
        authDomain: "cookie-eater.firebaseapp.com",
        databaseURL: "https://cookie-eater.firebaseio.com",
        projectId: "cookie-eater",
    })

    // Initialize Firebase
    return firebase.firestore()
}

function getGlobalCounter(ref) {
    return ref.get().then((doc) => {
        if (doc.exists) {
            console.log(doc.data().total)
            return doc.data().total
        } else {
            console.log("No such document!")
            return 0
        }
    }).catch((error) => {
        console.log("Error getting document:", error)
    })
}

function incrementGlobalCounter(ref) {
    ref.get().then((doc) => {
        if (doc.exists) {
            let counterValue = doc.data().total
            console.log("Document data:", doc.data().total)

            ref.set({
                total: ++counterValue
            }).then(() => {
                console.log("Document successfully updated!")
            })
        } else {
            console.log("No such document!")
        }
    }).catch((error) => {
        console.log("Error getting document:", error)
    })
}
