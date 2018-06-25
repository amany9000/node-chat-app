var socket = io();

socket.on("connect", function () {
	console.log("Connected to the Server.");
});

socket.on("disconnect", function () {
	console.log("disconnect from the server.");
});

socket.emit("createMessage",{
	to : "dipu@delhi",
	text : "ACCHA!!"
});

socket.on("newMessage", function (mssg) {
	console.log("Recieved this message - ",mssg)
});