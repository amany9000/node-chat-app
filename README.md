# node-chat-app
A socket.io based server-client chat application.

## To Run 
* Clone the repository.  
 ``` cd node-chat-app ```
* Inlucde the dependecies - 
``` node
npm install
```
* To run the server - 
``` node
node server/server.js
```
## Notes  
* The API has been deployed at Heroku, here is the <a href = "https://lit-ocean-71769.herokuapp.com/"> link</a>.
* Along with <a href = "https://www.npmjs.com/package/socket.io">socket.io</a>, the app also uses npm's <a href = "https://www.npmjs.com/package/http">http</a> package.

* The function used from socket.io are :  
``` node
 + Socket.on(event,(message) => {});           // Event listener function
 + Socket.emit(event, message);             //  Event Emitter function 
 + Scoket.broadcast.emit(event, message);   //  Function for broadcasting events 
```
* The testing is through mocha and expect.
* The froms used for input and output are created using jQuery.
* The styles are created using css.
