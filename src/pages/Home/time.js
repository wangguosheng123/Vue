
showTIME();
	function showTIME() {
		let shijian=document.getElementById("#showtime")
		var date1 = new Date();
		var date2 = new Date("2019-2-5 00:00:00");
		var date = date2 - date1;
		var day = Math.floor(date / (1000 * 60 * 60 * 24));
		var hours = Math.floor(date / (1000 * 60 * 60) % 24);
		var min = Math.floor(date / (1000 * 60) % 60);
		var ses = Math.floor(date / 1000 % 60);
		var shijian = day + "天" + hours + "小时" + min + "分" + ses + "秒";
		shijian.innerHTML=shijian
	}
	setInterval(function () {
		showTIME();
	}, 1000);