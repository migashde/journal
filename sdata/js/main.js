var snch=!1;
$(document).ready(function(){
	var p=$('.alert-msg'),te=$('#totop').click(function(){var inp=location.pathname.indexOf('program')!==-1,t=0;if(inp){t=$('.toc').offset().top-100;if(t+10>$(window).scrollTop()) t=0}snch=!0,$('html').animate({scrollTop:t},500,function(){snch=!1,!t&&te.cls('sh',!1)})}),ba=$('<div/>').cls('banner').click(function(){location.href='news/handivyn-dans-neegdlee'}).appendTo($('body')),ce=$('.main-body .news-body');
	if(!ce.length) ce=$('.main-body .center');
	if(p.length) p.click(function(e){e.target==this&&$(this).html('').hide()}).children('div').each(function(k){setTimeout(function(){$(this).cls('show',!0)}.bind(this),k*900+50)});
	$(window).scroll(function(){
		if(snch) return;
		var t=$(window).scrollTop();
		te.cls('sh',t>20);
	})
	ba.css({marginLeft:ce.outerWidth()/2+10});
})