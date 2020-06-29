(function(){var pr=$('.news-body'),a={fb:['https://www.facebook.com/sharer/sharer.php?u=','Facebook'],tw:['https://twitter.com/intent/tweet?url=','Twitter']},e=$('<div/>').cls('sharer').appendTo(pr);
$.each(a,function(k,b){
	$('<a/>',{href:'javascript:;'}).click(function(){
		var i=$(this).cls(),w=530,h=760,l,t;
		if(i=='ln') h=380;
		else if(i=='tw') h=452;
		l=(screen.width-w-16)/2,t=(screen.height-h-75)/2;
		open(a[i][0]+encodeURIComponent(location.href)+(i=='tw'?'&text='+encodeURIComponent(document.title):''),'sharer','width='+w+',height='+h+',top='+t+',left='+l+',toolbar=no,statusbar=no,addressbar=no')
	}).text(b[1]).cls(k).appendTo(e);
});
$(window).scroll(function(){
	var st=$(this).scrollTop(),t=st-pr.offset().top+170;
	e.css({top:Math.max(100,t)})
})
function rs(){$('iframe').each(function(){$(this).height($(this).width()*0.4583)})};$(window).resize(function(){rs()}),$(document).ready(function(){rs()})
})()