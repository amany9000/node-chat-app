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

	socket.on("disconnect", () => {
		console.log("And.... 	He's gone!!!! (diconnected)")
	})	
});

server.listen(port, () => {
	console.log(`server listening to port ${port}`);
});