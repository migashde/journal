<?php
defined('ADMIN')&&$this->acc->admin or $this->req->url('@');
$p=CONF.'rule.php';
$this->css('page/program');
if(isset($_POST['rule'])){
	$h=fopen($p,'w+');
	fwrite($h,trim($_POST['rule']));
	fclose($h);
	die();
}
?>
<style type="text/css">
.editor-help{position:fixed;top:40px;left:900px;padding:10px;background:#0066b3;color:#fff;}
.editor-help>h3{margin:0;text-transform:uppercase;font-size:18px;margin-bottom:10px;border-bottom:1px solid #fff;padding-bottom:10px;}
.editor-help>ul{list-style:none;padding:0;margin:0;}
.editor-help>ul>li{padding-bottom:15px;}
.editor-help>ul>li>span{color:#333;}
.editor-help>ul>li>div{text-align:right;}
</style>
<div class="party-rule" style="max-width:900px;">
<div class="rule-body" id="oule" contenteditable="true">
<?=file_get_contents($p)?>
</div>
</div>
<div class="chup">Хадгалах</div>
<div class="editor-help">
<h3>Hotkeys</h3>
<ul>
<li><span>CTRL+B</span><div><b>Bold</b></div></li>
<li><span>CTRL+I</span><div><i>Italic</i></div></li>
<li><span>CTRL+U</span><div><u>Underline</u></div></li>
<li><span>CTRL+D</span><div><del>Strikethrough</del></div></li>
<li><span>CTRL+R</span><div><hr />Зааглагч шугам</div></li>
<li><span>CTRL+O</span><div><ul><li>Bullet list</li></ul></div></li>
<li><span>CTRL+1</span><div><ol><li>Number list</li></ol></div></li>
<li><span>CTRL+UP ARROW</span><div>Super<sup>script</sup></div></li>
<li><span>CTRL+DOWN ARROW</span><div>Sub<sub>script</sub></div></li>
</ul>
</div>
<script type="text/javascript">
$('.chup').click(function(){$.post(location.href,{rule:$('#oule').cls('drng',!0).html()},function(){$('#oule').cls('drng',!1)})});
$('#oule').bind('paste',function(e){
	var o=e.clipboardData||e.originalEvent.clipboardData,a=o.items,i,d,r;
	for(i in a){
		if(a[i].kind=='string'){
			document.execCommand("insertHTML",false,o.getData("text/plain"));
			break;
		}
		if(a[i].kind!=='file') continue;
		r=new FileReader();
		r.onload=function(e){upload(e.target.result)};
		r.readAsDataURL(a[i].getAsFile());
	}
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
</script>