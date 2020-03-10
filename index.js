window.mediaObject = undefined
navigator.mediaDevices.getUserMedia({
    video:true,
    audio:false
}).then(stream=>{
    const Peer = require("simple-peer");
    var peer = new Peer(
        {
        initiator: location.hash === "#1",
        trickle: false,
        stream: stream
    }
    )
    window.mediaObject = stream
    peer.on('signal', data=>{
        console.log('SIGNAL', data)
        document.getElementById("ourId").value = JSON.stringify(data)
    })
    document.querySelector("#connect").addEventListener("click", function(event){
        otherId = JSON.parse(document.getElementById("otherId").value)
        peer.signal(otherId)
    })
    document.getElementById("send").addEventListener("click", function(event){
        message = document.getElementById("message").value
        peer.send(message)
    })
    peer.on('stream', stream=> {
        document.querySelector("video").srcObject = stream
    })
    peer.on('data', data=>{
        document.getElementById("messages").textContent += data + '\n'
    })
})

    
