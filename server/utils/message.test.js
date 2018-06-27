const expect = require("expect.js");

var {generateMssg,generateLocationMssg} = require("./message.js");

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

describe("Generate Location Mesaage" , () => {
	it("should generate correct location object" , ()=> {
		from = "Ramsey Snow";
		lat = 44;
		long = 11.11;
		var message = generateLocationMssg(from,lat,long);
		expect(message.createdAt).to.be.a('number');
		expect(message.from).to.be(from);
		expect(message.url).to.be(`https://www.google.com/maps?q=44,11.11`);
	});
});