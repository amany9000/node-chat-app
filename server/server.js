const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");

const {generateMssg, generateLocationMssg} = require("./utils/message.js");
const {isCorrectString} = require("./utils/validation.js")
const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;
var app = express()
var server = http.createServer(app);
var io = socketIO(server);
console.log(generateMssg("test","yessss"));
app.use(express.static(publicPath));

io.on("connection", (socket) => {
	console.log("New User connected");
	
	socket.emit("welcomeMssg", generateMssg("admin@sabkaBAAP","Welcome to land of Hope - Russia"));

	socket.broadcast.emit("newUserMssg",generateMssg("admin@sabkaBAAP","New user joined Frands"));

	socket.on("createMessage", (mssg,callback) => {
		console.log("Message Created  :\n", mssg);

		socket.broadcast.emit("newMessage",generateMssg(mssg.from,mssg.text));		
		/*
		io.emit("newMessage",generateMssg(mssg.from,mssg.text));
		*/

		callback()
	});
    
    socket.on("join", (param,callback) => {
    	if(!isCorrectString(param.name) || !isCorrectString(param.room)){
    		callback("Name and Room name aren't correct");
    		console.log(param)
    	}
    	callback();
    });

    socket.on("createLocationMessage", (mssg) => {		
		socket.broadcast.emit("newLocationMessage",generateLocationMssg("User ",mssg.latitude,mssg.longitude));
	});
	socket.on("disconnect", () => {
		console.log("And.... 	He's gone!!!! (diconnected)");
	});	
});

server.listen(port, () => {
	console.log(`server listening to port ${port}`);
});