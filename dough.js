document.addEventListener("DOMContentLoaded", event => { 
    let db = initFireFirebase()
    let counterRef = db.collection("global").doc("counter")
    let hitsCollection = db.collection("hits")

    setCounter(getCounter())

    counterRef.onSnapshot(doc => {
        getGlobalCounter(counterRef).then(result => {
            setGlobalCounter(result)
        })
    })
    
    document.getElementById("tray").addEventListener("click", () => {
        toggleCookieEater()
        changeFavicon("favicon-yummy.ico")

        setTimeout(() => {
            toggleCookieEater()
            changeFavicon("favicon.ico")
            incrementCounter()
            incrementGlobalCounter(db, counterRef)
            saveHit(hitsCollection)
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

function setGlobalCounter(counter) {
    document.getElementById("cookie-counter-global").innerText = buildContent(counter)
}

function incrementCounter() {
    let counter = getCounter()
    localStorage.setItem("counter", ++counter)
    setCounter(counter) 
}

function incrementGlobalCounter(db, ref) {
    db.runTransaction(transaction => {
        return transaction.get(ref).then(doc => {
            if (doc.exists) {
                let counterValue = doc.data().total
                const finalData = {
                    total: ++counterValue,
                }
                transaction.set(ref, finalData)
            } else {
                console.log("No such document!")
            }
        })
    }).catch(err => console.error('Transaction failed: ', err))
}

function getCounter() {
    if (typeof(Storage) !== "undefined") {
        return localStorage.counter ? localStorage.counter : 0
    }
    return 0
}

function getGlobalCounter(ref) {
    return ref.get().then(doc => {
        if (doc.exists) {
            return doc.data().total
        } else {
            console.log("No such document!", doc)
            return 0
        }
    }).catch(error => console.log("Error getting document:", error))
}

function saveHit(collection) {
    collection.add({
        timestamp: firebase.firestore.Timestamp.now()
    }).catch(error => console.error("Error saving a hit: ", error))
}

function buildContent(counter) {
    return (counter === 1) ? "1 cookie" : `${counter} cookies` 
}

function initFireFirebase() {
    firebase.initializeApp({
        apiKey: "AIzaSyBuJUN6DocXhvzE4bVj327a3R80fh1qei8",
        authDomain: "cookie-eater.firebaseapp.com",
        databaseURL: "https://cookie-eater.firebaseio.com",
        projectId: "cookie-eater",
    })

    return firebase.firestore()
}
