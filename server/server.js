const path = require("path");
const express = require("express");
const socketIO = require("socket.io")
const http = require("http")

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express()
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
	console.log("New User connected");
	
	socket.emit("welcomeMssg", {
	from : "admin@sabkaBAAP",
	text : "Welcome to land of Hope - Russia",
 	createdAt : new Date().getTime()
 	})

	socket.broadcast.emit("newUserMssg",{
		from : "admin@sabkaBAAP",
		text : "New User Joined Frands",
		joinedAt : new Date().getTime()
	});

	socket.on("createMessage", (mssg) => {
		console.log("Message Created  :\n", mssg);
		
		socket.broadcast.emit("newMessage",{
			from : mssg.from,
			text : mssg.text,
			createdAt : new Date().getTime()
		});
		/*
		io.emit("newMessage",{
			from : mssg.from,
			text : mssg.text,
			createdAt : new Date().getTime()
		});
		*/
	});

	socket.on("disconnect", () => {
		console.log("And.... 	He's gone!!!! (diconnected)");
	});	
});

server.listen(port, () => {
	console.log(`server listening to port ${port}`);
});