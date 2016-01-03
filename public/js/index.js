var crypto = require('crypto'),
    algorithm = 'aes-256-ctr';
var jsEncode = {
	encrypt: function(text, pass){
  	var cipher = crypto.createCipher(algorithm,pass)
  	var crypted = cipher.update(text,'utf8','hex')
  	crypted += cipher.final('hex');
  	return crypted;
	},
	decrypt: function(text, pass){
  	var decipher = crypto.createDecipher(algorithm,pass)
  	var dec = decipher.update(text,'hex','utf8')
  	dec += decipher.final('utf8');
  	return dec;
	}
};

// var hw = jsEncode.encrypt("hello world", "test key")
// console.log(hw);
// // outputs hello world
// console.log(jsEncode.decrypt(hw, "test key"));

$('#encrypt').click(function() {
	var message = $("#toE").val();
	var key = $("#key").val();
  var e = jsEncode.encrypt(message,key);
  $("#ecrypted").html(e);
});

$('#decrypt').click(function() {
	var e = $("#ecrypted").val();
	var key = $("#key").val();
  var e = jsEncode.decrypt(message,key);
  $("#ecrypted").html(e);
});
