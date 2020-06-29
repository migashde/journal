$.fn.fileManager=function(){
	$(this).click(function(){
		var oFm=new FileManager();
		oFm.init($(this).data('type')||'',!!$(this).attr('forcetype'),$(this).attr('editor'));
	});
}
var FileManager=function(){};
FileManager.prototype={
	id:'fm-layer',
	layer:null,
	fadeSpeed:200,
	filter:'all',
	files:[],
	uploading:false,
	filterLock:false,
	key:'',
	sort:'',
	asc:false,
	target:'',
	uri:'',
	init:function(filter,lock,target){
		var fldr=$('base').attr('href').split('/').slice(3).join('/').trim('/');
		this.uri=location.pathname.replace(fldr,'').trim('/').split('/').shift()+'/file',
		this.filter=filter,
		this.filterLock=lock,
		this.target=target;
		if(!this.isCreated()) this.create();
		this.show();
	},
	isCreated:function(){
		if(this.layer) return true;
		var e=$('#'+this.id);
		if(e.length){
			this.layer=e;
			return true;
		}
		return false;
	},
	create:function(){
		this.layer=$('<div/>',{id:this.id}).click((function(o){return function(e){if(e.target==this) o.hide()}})(this)).hide().appendTo($('body'));
		if($('.admin-body').length) this.layer.cls('in-admin',true);
		$.post(this.uri,{cmd:'tpl',noFilter:this.filterLock?1:0,filter:this.filter},(function(o){return function(h){
			var fs;
			o.layer.html(h),
			$('<span/>').click((function(o){return function(){o.hide()}})(o)).prependTo(o.layer.children('div')),
			fs=o.layer.find('#fm-file').change((function(o){return function(){$.each(this.files,function(k,v){o.files.push(v)}),o.upload()}})(o)),
			o.layer.find('#fm-fbtn').click((function(o){return function(){o.trigger('click')}})(fs)),
			o.layer.find('#fm-filter').change((function(o){return function(){o.filter=this.value,o.load()}})(o)),
			o.layer.find('#fm-search').change((function(o){return function(){o.key=this.value,o.load()}})(o)),
			o.sort=o.layer.find('#fm-sort').change((function(o){return function(){o.sort=this.value,o.load()}})(o)).val(),
			o.layer.find('#fm-sorttype').change((function(o){return function(){o.asc=this.checked,o.load()}})(o)),
			o.load()
		}})(this));
		return this
	},
	show:function(){if(!this.isCreated()) this.create();this.layer.fadeIn(this.fadeSpeed);return this},
	hide:function(){if(this.isCreated()) this.layer.fadeOut(this.fadeSpeed);return this},
	load:function(){
		$.post(this.uri,{cmd:'list',filter:this.filter,fl:this.filterLock,search:this.key,sort:this.sort,asc:this.asc?1:0},(function(o){return function(h){var pr=o.layer.find('.fm-list').html(h),a=$('.file',pr),l=a.length;o.layer.find('#fm-files').html(l),a.click((function(o){return function(){
			tinymce&&tinymce.get(o.target).insertContent($(this).cls('isimg','?')?'<p>&nbsp;</p><div class="img c"><img src="f/'+$(this).attr('rel')+'" /></div><p>&nbsp;</p>':'<a href="f/'+$(this).attr('rel')+'" class="bttn">Татаж авах</a>'),o.hide(),$.post(o.uri,{cmd:'hit',id:$(this).data('id')});
		}})(o))}})(this))
	},
	upload:function(){
		var e=this.layer.find('.fm-toolbar').cls('fm-toolbar uploading');
		this.uploading=!!this.files.length;
		if(!this.uploading){
			e.cls('uploading',false);
			this.load();
			return;
		}
		setTimeout((function(o,e){return function(){
			var v=o.files.shift(),r=$.ajaxSettings.xhr(),d=new FormData();
			d.append('file',v);
			d.append('cmd','upload');
			d.append('filter',o.filter);
			d.append('fl',o.filterLock);
			r.onreadystatechange=(function(o,e){return function(){e.cls('lvl'+this.readyState,'+');if(4==this.readyState){if(this.responseText) alert(this.responseText);else setTimeout(function(){o.upload()},200)}}})(o,e);
			r.open('post',o.uri,true);
			r.send(d)
		}})(this,e),20)
	}
}
$('#img-pos>a').click(function(){
	var ed=tinymce.get($(this).parent().attr('editor')),el=ed.selection.getNode(),rel=$(this).attr('rel'),im='img',e;
	if(el.tagName.toLowerCase()!=im){
		e=$(el).find(im);
		if(!e||!e.length) e=$(el).closest('.'+im).children(im);
	}
	else e=$(el);
	if(e&&e.length){
		var pr=e.parent();
		if(!pr.cls(im,'?')){
			e.wrap('<div class="'+im+' c"></div>');
			pr=e.parent();
		}
		if('lrc'.indexOf(rel)!==-1){
			if(pr.cls(im,'?')){
				e=pr;
				rel=im+' '+rel;
			}
			$(e).cls(rel);
		}
		else if(pr.cls(im,'?')){
			if(rel=='del') pr.find('p').remove();
			else if(!pr.find('p').length) $('<p/>').html('Энд зургийн тайлбарыг бичнэ үү').appendTo(pr).select();
		}
	}
	else alert('Зургаа сонгоно уу');
});