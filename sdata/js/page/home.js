$(document).ready(function() {
    $('#greeting .content').overlayScrollbars({
		className:"os-theme-thin-dark",
		overflowBehavior:{x:"hidden",y:"scroll"},
		scrollbars:{visibility:"auto",autoHide:'l',autoHideDelay:2e3,dragScrolling:true,clickScrolling:false,touchSupport:true,snapHandle:true}
	});
	var a=[10,10,4,20],ww=$(window).width();
	if(ww<1000){a=[7,10,3,10];if(ww<800){a=[6,10,3,10];if(ww<700){a=[5,10,3,10];if(ww<600){a=[4,10,2,10];if(ww<500){a=[2,6,2,6];if(ww<400) a=[1,0,1,0]}}}}}
    new Swiper('#swipeit',{slidesPerView:a[0],slidesPerGroup:a[0],spaceBetween:a[1],pagination:{el:'#swipeit .controls',clickable:true}});
    new Swiper('.events .list',{slidesPerView:a[2],spaceBetween:a[3],pagination:{el:'.events .controls',clickable:true}});
});