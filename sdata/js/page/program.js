$(document).ready(function(){
	var a=$('.toc li>span'),b=$('.party-rule .t'),lk=!1;
	a.each(function(k,o){
		$(this).click((function(k){return function(){
			if(lk) return;lk=!0;
			var e=$(b.get(k)),t=e.offset().top-120;
			snch=!0;
			$('html').animate({scrollTop:t},500,(function(e){return function(){snch=!1,$('#totop').cls('sh',!0),lk=!1,e.cls('this',!0),e.next('ul').cls('this',!0),setTimeout(function(){$('.this').cls('this',!1)},1e3)}})(e))
		}})(k))
	});
})