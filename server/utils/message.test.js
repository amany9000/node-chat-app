const expect = require("expect.js");

var {generateMssg} = require("./message.js");

describe("Generate Mesaage" , () => {
	it("should generate the correct message object" , ()=> {
		text = "heloo";
		from = "Lord Bolton";
		var message = generateMssg(from,text);
		expect(message.createdAt).to.be.a('number');
		expect(message.from).to.be(from);
		expect(message.text).to.be(text);
	});
});