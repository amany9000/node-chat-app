var socket = io();

socket.on("connect", function () {
	console.log("Connected to the Server.");
});

socket.on("disconnect", function () {
	console.log("disconnect from the server.");
});

//socket.emit("createMessage",{from : "beta@dipu", text : "Aa gye"});

socket.on("welcomeMssg" ,function (mssg) {
	console.log("Initial Message from sever - " , mssg);

	var li = jQuery('<li></li>');
	li.text(`${mssg.from}: ${mssg.text}`);
	jQuery("#messages").append(li);
});

socket.on("newUserMssg" , function (mssg) {
	console.log("New User Connected Message - ", mssg)

	var li = jQuery('<li></li>');
	li.text(`${mssg.from}: ${mssg.text}`);
	jQuery("#messages").append(li);
});

socket.on("newMessage", function (mssg) {
	console.log("Recieved this message - ",mssg)

	var li = jQuery('<li></li>');
	li.text(`${mssg.from}: ${mssg.text}`);
	jQuery("#messages").append(li);
});

jQuery("#message-form").on("submit",function (e) {
	e.preventDefault();
	socket.emit("createMessage",{
		from : "User",
		text : jQuery('[name=message]').val()
	}, function () {

	});
})

var locationButton = jQuery("#send-location");
locationButton.on("click", function () {
	if(!navigator.geolocation){
		return alert("Geolocation not supported by your browser.");
	}

	navigator.geolocation.getCurrentPosition(function (position){
		socket.emit('createLocationMessage',{
			latitude: position.coords.latitude, 
			longitude: position.coords.longitude, 
		});
	}, function () {
			alert("unable to fetch location");
		});
});