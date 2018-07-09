
const expect  = require("expect");

const {Users} = require("./users.js") 

describe("Users" , () => {
	var users;

	beforeEach(() => {
		users  = new Users();
		users.users = [{
			id: '1',
			name: "Mark",
			room: "Marvel"
		},{
			id: '2',
			name: "Robert",
			room: "Marvel"
		},{
			id: '3',
			name: "Christian",
			room: "DC"
		}];		
	});
	it("Should add a new user", () => {
		var users = new Users();
		var user = {
			id: '4',
			name: "Henry",
			room: "DC"
		}
		var resUser  = users.addUser(user.id, user.name, user.room);
		expect(users.users).toEqual([user]);
 	});

 	it("should remove a user", () => {
 		var userId = '2';
 		var user  = users.removeUser(userId);
 		//console.log("user",user)
 		expect(user.id).toBe(userId);
 		expect(users.users.length).toBe(2);
 	});

 	it("shouldn't find a user", () =>{
 		var userID = 99;
 		var user  =users.getUser(userID);

 		expect(user).toBeFalsy();
 	});

 	it("should return DC names", () => {
 		var userList = users.getUserList("DC");
 		//console.log(userList)
 		expect(userList).toEqual(["Christian"]);
 	});
})
