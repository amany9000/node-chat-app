
const expect = require("expect");

const {isCorrectString} = require("./validation");

describe("isRealString", () => {
	it("should reject non-string values", () => {
		var res = isCorrectString(1234);
		expect(res).toBeFalsy();
	});

	it("should reject string with only spaces", () => {
		var res = isCorrectString("      ");
		expect(res).toBe(false);
	});

	it("should accept string with non space characters", () => {
		var res= isCorrectString("abs");
		expect(res).toBe(true)
	});
}); 