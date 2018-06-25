var socket = io();

socket.on("connect", function () {
	console.log("Connected to the Server.");
});

socket.on("disconnect", function () {
	console.log("disconnect from the server.");
});

/*
socket.emit("createMessage",{
	from : "dipu@delhi",
	text : "ACCHA!!"
});
*/
socket.on("welcomeMssg" ,function (mssg) {
	console.log("Initial Message from sever - " , mssg);
});

socket.on("newUserMssg" , function (mssg) {
	console.log("New User Connected Message - ", mssg)
});

socket.on("newMessage", function (mssg) {
	console.log("Recieved this message - ",mssg)
});