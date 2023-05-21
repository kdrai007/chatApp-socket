const socket=io("http://localhost:3000");
const messageForm=document.querySelector(".submit-conversation");
const messageInput =document.querySelector("#message-input");
const chatConversatioin =document.querySelector("#chat-conversation");

const Username=prompt("Enter your name");
appendMessage("you joined");
socket.emit("new-user",Username);

socket.on("chat-message",data=>{
    console.log(data);
    appendMessage(`${data.user}:${data.msg}`);
})
socket.on("user-name",name=>{
    appendMessage(`${name} connected`);
})
socket.on("user-disconnected",name=>{
    appendMessage(`${name} disconnected`);
})

messageForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    appendMessage(`you:${message}`);
    socket.emit("send-chat-message",message);
    messageInput.value="";
})

function appendMessage(message){
    const messageElm=document.createElement("div");
    messageElm.innerText=message;
    chatConversatioin.appendChild(messageElm);
}