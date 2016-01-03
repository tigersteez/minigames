var jsEncode = {
	encode: function (s, k) {
		var enc = "";
		var str = "";
		// make sure that input is string
		str = s.toString();
		for (var i = 0; i < s.length; i++) {
			// create block
			var a = s.charCodeAt(i);
			// bitwise XOR
			var b = a ^ k;
			enc = enc + String.fromCharCode(b);
		}
		return enc;
	},
	base64ify: function(s) {
		var base64data = new Buffer(s, 'binary').toString('base64');
		return base64data;
	},
	unBase64: function(s) {
		var originaldata = new Buffer(s, 'base64');
		return originaldata.toString();
	}
};

module.exports = jsEncode;

// var message = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur maximus augue vitae porttitor. Pellentesque ac massa quis felis ullamcorper eleifend. Fusce hendrerit enim in metus elementum, sit amet fermentum ex lacinia. Suspendisse a consectetur velit. Phasellus placerat risus at nisi varius, sit amet feugiat massa feugiat. Curabitur pretium facilisis magna. Nulla tincidunt dignissim enim at aliquam. Nullam lobortis pellentesque arcu. Nulla sem sapien, porttitor nec semper vitae, placerat suscipit neque. Quisque ac bibendum arcu. Quisque convallis maximus finibus. Donec eu dignissim turpis. Vestibulum tincidunt, tellus eget viverra malesuada, tortor velit sagittis ipsum, ut condimentum nibh urna id purus. Ut eget molestie turpis, quis elementum ex. Suspendisse potenti. Sed vel eros nec libero tempor bibendum quis a dui. Vestibulum eget nunc sed est malesuada gravida vel pretium orci. Integer dolor nunc, semper sit amet risus at, accumsan interdum sapien. Mauris mauris nisl, accumsan vitae lobortis vel, faucibus at ligula. Donec vel augue vestibulum, semper urna in, bibendum eros. Vivamus sed augue convallis, laoreet ante eu, luctus libero. Curabitur aliquam, tellus id ultrices euismod, purus nulla placerat metus, non convallis turpis lectus non massa. Aliquam at eleifend purus. Donec quam nisl, molestie nec eros non, feugiat mattis augue. Nunc non placerat ipsum. In aliquam erat sit amet quam lobortis, eget faucibus est ultricies. Duis orci ante, tempus id semper quis, mattis sit amet leo. Aenean venenatis elit in libero pulvinar, id vestibulum sem luctus. Aenean eu ornare mi. Proin non purus et eros commodo facilisis id non odio. Cras eget pharetra leo. Duis cursus quis ipsum at iaculis. Donec in felis sit amet sapien ultricies cursus. Morbi arcu justo, consectetur vitae suscipit nec, viverra porta felis. Nullam risus nunc, venenatis volutpat purus id, euismod fermentum quam. Duis ut neque in velit tristique lacinia. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed porttitor, justo eget placerat lobortis, elit velit hendrerit ipsum, vitae dapibus magna enim nec tellus. Pellentesque id nisi in elit interdum finibus. Sed ut eros sit amet metus vulputate varius. Fusce felis nisi, tristique eu augue at, aliquet volutpat nibh. Cras ut porta leo. Sed eu mi vitae dolor sodales congue ac sit amet nisi. Maecenas sollicitudin hendrerit sem, sit amet suscipit magna volutpat ut. Praesent suscipit lacus diam, ut dapibus enim mattis sed. Mauris molestie turpis est, ac vehicula velit auctor congue. Donec finibus ex eu tincidunt convallis. Nulla facilisi. Nam in semper metus. Pellentesque iaculis, libero quis venenatis dapibus, elit mauris euismod sapien, in consectetur mi velit at tellus. Sed ut pretium massa. Integer venenatis, quam rutrum sollicitudin feugiat, dui nunc bibendum eros, non tincidunt urna elit a dui. Donec id accumsan justo. Morbi hendrerit ipsum nunc, nec consectetur felis congue ac. Duis eu porttitor orci. Fusce vitae mi sit amet est condimentum dictum. Donec sit amet porttitor velit, eget mollis tellus. In fermentum eget purus semper viverra. Fusce vitae venenatis nisi, quis porta mauris. Sed eget lorem bibendum, suscipit justo eu, tristique eros. Donec eu consectetur nunc. Duis facilisis vehicula felis, vitae.";
// var key = "123";

// var e = jsEncode.encode(message,key);
// console.log(e);
// var base64data = jsEncode.base64ify(e);
// console.log(base64data);
// var originaldata = jsEncode.unBase64(base64data);
// var d = jsEncode.encode(originaldata,key);
// console.log(d);
