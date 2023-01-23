const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost',
  optionsSuccessStatus: 200 
};
const io = require("socket.io")(9999, { cors: corsOptions });
const users={};                                                     
io.on("connection", socket => {                                     
    socket.on("new-user-joined",name=>{                             
        users[socket.id]=name;                                      
        socket.broadcast.emit("user-joined",name)                   
    });                                                             
    socket.on("send",message=>{                                     
        socket.broadcast.emit("receive",{message: message, name: users[socket.id]}) 
    })                                                              
	socket.on("disconnect", () => {
		socket.broadcast.emit("user-left",users[socket.id])
		delete users[socket.id] 
	})

}) 

