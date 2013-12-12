$(window).load(function(){
	var socket = io.connect('http://hailstan.com');
	var time = 0;
	jQuery.fn.center = function () {
		this.css("position", "absolute");
		this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
		this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
		return this;
	}
	$('#loader').center();
	$(window).resize(function () {
		$('#loader').center();
	});
	setTimeout(function() {
		$('#extra').text('... Damn it.')
		$('#loader').center();
	}, 10000);
	socket.on('connect',function(){
		$('#cover').fadeOut(400,function(){
			$('#cover').remove();
		});
	});
	socket.on('news', function (data) {
		$('#stans').text(data.num);
		$(':root, html, body').css('background', '#'+Math.floor(Math.random()*16777215).toString(16));
	});
	socket.on('news2', function (data) {
		$('#stans').text(data.num);
		$(':root, html, body').css('background', '#'+Math.floor(Math.random()*16777215).toString(16));
		time=data.next;
		console.log(time);
	});
	$('button').on('click', function() {
		currtime= Date.now();
		console.log(time);
		console.log(currtime);
		console.log(currtime-time);
		if(currtime-time>0){
			socket.emit('clicked', { t: currtime});
		}else{
			console.log('no');
		}
	});

});