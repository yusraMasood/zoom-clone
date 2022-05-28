const socket=io('/')

const videoGrid = document.getElementById('video-grid')
var peer = new Peer(undefined,{
    path: '/peerjs',
    host:'/',
    port:'3030'
});
let myVideoStream;
const myVideo = document.createElement('video')
myVideo.muted = true


navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    myVideoStream = stream
    console.log('im a disco dancer', stream);
    addVideoStream(myVideo, stream)
    
    peer.on('call',call =>{

          call.answer(stream); // Answer the call with an A/V stream.
          console.log('answer call stream', stream);
          const video =document.createElement('video')
          call.on('stream', userVideoStream=>{
              console.log('on Called', userVideoStream);
              addVideoStream(video,userVideoStream)
          })
        }, err=>console.log('error',err))
        socket.on('user-connected',(userId)=>{
            console.log('inside socket',userId);
            connectToNewUser(userId,stream);
        })
})




const connectToNewUser=(userId,stream)=>{
    console.log('new-user',userId);
    const call=peer.call(userId,stream)
    const video =document.createElement('video')
    console.log('Call',call);
    call.on('stream',userVideoStream=>{
        console.log('call is on',userVideoStream);
        addVideoStream(video,userVideoStream)
    })

}
peer.on('open',id=>{
    socket.emit('join-room',ROOM_ID,id)
    
    })
const addVideoStream = (video, stream) => {
    console.log('video should append here');
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoGrid.append(video)
}