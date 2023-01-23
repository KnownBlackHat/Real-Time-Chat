const socket = io("http://127.0.0.1:9999")

const form = document.querySelector("#form")
const chat_box = document.querySelector("#chat-box")
const msg_inp = document.querySelector("#msg_inp")

// Security-Flaw: Null name is able to join the cat fix it
const name = prompt("Enter Your Name: ")
socket.emit("new-user-joined",name)
const self_name = document.createElement("div")
self_name.innerText=`Logged In As: ${name}`
chat_box.append(self_name)


const msg=(message,position)=>{
	const new_element = document.createElement("div")
	new_element.classList.add("rounded", "bg-green-500", `float-${position}`, "p-2", "m-2", "clear-both", "w-fit", "max-w-sm")
	new_element.innerText=message
	chat_box.append(new_element)
}

const warn = (message,color)=>{
const alert_msg = document.createElement("div")
    alert_msg.innerText=message
    alert_msg.classList.add("rounded", color , "p-2", "m-2", "clear-both")
    chat_box.append(alert_msg)

}

socket.on("user-joined",name=>{
warn(`${name} Joined`,"bg-red-700")
})

form.addEventListener("submit",()=>{
	msg(`You: ${msg_inp.value}`,"right");
	socket.emit("send",msg_inp.value)
	msg_inp.value=""
})

socket.on("receive",data => {
	msg(`${data.name}: ${data.message}`,"left")
})

socket.on("user-left",name => {
warn(`${name} Left`,"bg-yellow-500")
})
