$(document).ready(function(){
	var p=$('.alert-msg');
	$('.editor').each(function(){
		if(!this.innerHTML){
			var s=new $.mem();
			s.key('editor-'+this.id);
			this.innerHTML=s.get()||'';
		}
	});
	if(p.length) p.click(function(e){e.target==this&&$(this).html('').hide()}).children('div').each(function(k){setTimeout(function(){$(this).cls('show',!0)}.bind(this),k*900+50)});
});
function order(o,id){$.post(location.href,{id:id,order:o.value});}
function upload(s){
	$.post(location.href,{filedata:s},function(u){if(u) document.execCommand('insertImage',false,u);else alert('Upload failed')})
}
$('.editor').bind('paste',function(e){
	var o=e.clipboardData||e.originalEvent.clipboardData,a=o.items,i,d,r;
	for(i in a){
		if(a[i].kind=='string'){
			document.execCommand("insertHTML",false,o.getData("text/plain"));
		}
		if(a[i].kind!=='file') continue;
		r=new FileReader();
		r.onload=function(e){upload(e.target.result)};
		r.readAsDataURL(a[i].getAsFile());
	}
	$(this).next('textarea').val(this.innerHTML);
	return false
}).keydown(function(e){
	var c=e.which||e.keyCode,o=window.getSelection(),s,v=null,f=!1,C={bold:66,italic:73,underline:85,strikethrough:68,insertHorizontalRule:82,insertOrderedList:49,insertUnorderedList:79,subscript:40,superscript:38,decreaseFontSize:188,increaseFontSize:190,backColor:72,insertParagraph:80,removeFormat:46};
	if(c==13) document.execCommand('formatBlock',false,'p');
	if(e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey&&o.rangeCount){
		if(c==76){var b=$(o.focusNode).closest('a');if(b.length){$(o.focusNode).unwrap();return f}s='createLink',o.type=='Range'&&(v=prompt('LINK','http://'));if(!v) return f;}
		else if(c==77){s='insertImage',v=prompt('Image URL','http://');if(!v) return f;document.execCommand('enableObjectResizing',f,f);}
		else{var i=Object.values(C).indexOf(c);if(i===-1) return;s=Object.keys(C)[i],c==72&&(v='#f4ffba')}
		if(s) return document.execCommand(s,f,v),f
	}
}).keyup(function(){
	var s=new $.mem(),h=$(this).html();
	s.set(h,'editor-'+this.id),$(this).next('textarea').val(h)
});