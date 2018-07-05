var socket = io();

socket.on("connect", function () {
	console.log("Connected to the Server.");
});

socket.on("disconnect", function () {
	console.log("disconnect from the server.");
});

//socket.emit("createMessage",{from : "beta@dipu", text : "Aa gye"});
function scrollToBottom(){
	var message = jQuery("#messages");
	var newMessage = message.children("li:last-child");

	var clientHeight = message.prop("clientHeight");
	var scrollHeight = message.prop("scrollHeight");
	var scrollTop = message.prop("scrollTop");
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();

	if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
		message.scrollTop(scrollHeight)
	}
}

socket.on("welcomeMssg" ,function (mssg) {
	console.log("Initial Message from sever - " , mssg);

	var formattedTime = moment(mssg.createdAt).format("h:mm a");  
	
	var li = jQuery('<li></li>');
	li.text(`${mssg.from} ${formattedTime}: ${mssg.text}`);
	jQuery("#messages").append(li);
	scrollToBottom();
});

socket.on("newUserMssg" , function (mssg) {
	console.log("New User Connected Message - ", mssg)

	var formattedTime = moment(mssg.createdAt).format("h:mm a");  

	var li = jQuery('<li></li>');
	li.text(`${mssg.from} ${formattedTime}: ${mssg.text}`);
	jQuery("#messages").append(li);
	scrollToBottom();
});

socket.on("newMessage", function (mssg) {
	console.log("Recieved this message - ",mssg)

	var formattedTime = moment(mssg.createdAt).format("h:mm a");  

	var li = jQuery('<li></li>');
	li.text(`${mssg.from} ${formattedTime}: ${mssg.text}`);
	jQuery("#messages").append(li);
	scrollToBottom();
});

socket.on("newLocationMessage", function (mssg) {
	console.log("Recieved this message - ",mssg)

	var formattedTime = moment(mssg.createdAt).format("h:mm a");  

	var li = jQuery('<li></li>');
	var a  =jQuery('<a target="_blank"> My current location.</a>');
	li.text(`${mssg.from} ${formattedTime}:`);
	a.attr('href', mssg.url);
	li.append(a);
	jQuery("#messages").append(li);
	scrollToBottom();
});

jQuery("#message-form").on("submit",function (e) {
	e.preventDefault();
	var messageTextBox = jQuery('[name=message]');
	socket.emit("createMessage",{
		from : "User",
		text : messageTextBox.val()
	}, function () {
		messageTextBox.val("")
	});
})

var locationButton = jQuery("#send-location");
locationButton.on("click", function () {
	if(!navigator.geolocation){
		return alert("Geolocation not supported by your browser.");
	}

	locationButton.attr("disabled", "disabled").text("Sending Location...")
	navigator.geolocation.getCurrentPosition(function (position){
		
		locationButton.removeAttr("disabled").text("Send Location");
		
		socket.emit('createLocationMessage',{
			latitude: position.coords.latitude, 
			longitude: position.coords.longitude, 
		});
	}, function () {
			locationButton.removeAttr("disabled").text("Send Location");
			alert("unable to fetch location");
		});
});