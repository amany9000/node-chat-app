var moment  = require("moment");

var generateMssg = function (from,text){
return{
	from,
	text,
	createdAt : new moment().valueOf()
};
};

var generateLocationMssg = function (from,lat,long){
return{
	from,
	url : `https://www.google.com/maps?q=${lat},${long}`,
	createdAt : new moment().valueOf()
};
};

module.exports = {generateMssg,generateLocationMssg};