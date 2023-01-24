const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost',
  optionsSuccessStatus: 200 
};
const io = require("socket.io")(9999, { cors: corsOptions });
const users={};
io.on("connection", socket => {

    socket.on("new-user-joined",obj=>{  
		users[socket.id]={}
        users[socket.id]["name"]=obj.name;
		users[socket.id]["room"]=obj.room;
		socket.join(obj.room)
		socket.broadcast.to(obj.room).emit("user-joined",obj.name)  
    });
    socket.on("send",message=>{
        try { socket.broadcast.to(users[socket.id]["room"]).emit("receive",{message: message, name: users[socket.id]["name"]}) }
		catch (err) { console.log("[!] Data Structure error in send event") }
    })
	socket.on("disconnect", () => {
		try { socket.broadcast.to(users[socket.id]["room"]).emit("user-left",users[socket.id]["name"]) } 
		catch (err) { console.log("[!] Data Structure error in disconnect event") }
		delete users[socket.id]
	})
})

