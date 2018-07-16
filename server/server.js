const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");

const {generateMssg, generateLocationMssg} = require("./utils/message.js");
const {isCorrectString} = require("./utils/validation.js")
const publicPath = path.join(__dirname, '../public');
const {Users} = require("./utils/users")
const port = process.env.PORT || 3000;
var app = express()
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

const users = new Users();

io.on("connection", (socket) => {
	console.log("New User connected");
	
	socket.on("createMessage", (mssg,callback) => {
		console.log("Message Created  :\n", mssg);
		var user = users.getUser(socket.id);
		socket.broadcast.to(user.room).emit("newMessage",generateMssg(user.name,mssg.text));		
		/*
		io.emit("newMessage",generateMssg(mssg.from,mssg.text));
		*/

		callback()
	});
    
    socket.on("join", (param,callback) => {
    	if(!isCorrectString(param.name) || !isCorrectString(param.room)){
	    	return callback("Name and Room name aren't correct");
    	}
    	
    	socket.join(param.room);
    	users.removeUser(socket.id);
    	users.addUser(socket.id, param.name, param.room);

    	io.to(param.room).emit("updateUserList", users.getUserList(param.room));
    	socket.emit("welcomeMssg", generateMssg("admin","Welcome to land of Hope - Russia"));

		socket.broadcast.to(param.room).emit("newUserMssg",generateMssg("admin@sabkaBAAP",`New user - ${param.name} joined, Frands`));
    	callback();
    });

    socket.on("createLocationMessage", (mssg) => {		
		var user = users.getUser(socket.id);
		socket.broadcast.to(user.room).emit("newLocationMessage",generateLocationMssg(user.name,mssg.latitude,mssg.longitude));
	});
	socket.on("disconnect", () => {
		var user = users.removeUser(socket.id);
		if(user){
			io.to(user.room).emit("updateUserList", users.getUserList(user.room));
			io.to(user.room).emit("newMessage", generateMssg("admin", `${user.name} has left.`));
		}
	});	
});

server.listen(port, () => {
	console.log(`server listening to port ${port}`);
});