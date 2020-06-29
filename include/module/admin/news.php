<?php
defined('ADMIN')&&$this->acc->admin or $this->req->url('@');
setcookie('coder','Otgoo',time()+86400*365,'/','.zuvhunelectorat.mn');
echo '<div class="tab">';
$aCat=$this->cch->set('options',1)->get();
$cat=$this->req->get('cat','int',1);
foreach($aCat as $id=>$s) echo '<a href="'.$this->req->url(['+'=>['cat'=>$id]]).'"'.($id==$cat?' class="active"':'').'>'.$s.'</a>';
echo '</div><div class="tab-content">';
$editKey='md';
$delKey='rm';
$dataKey='data';
$sConfirmMsg=' мэдээг үнэхээр устгах уу';
$sTbl='news';
$del=0;
$edit=$this->req->get($editKey,'int');
if(!$edit) $del=$this->req->get($delKey,'int');
$sAct=$this->req->url('action');
if(isset($_POST['toggle'],$_POST['stat'])){
	while(ob_get_length()) ob_end_clean();
	$id=intval($_POST['toggle']);
	if($id) $this->db->modify($sTbl,['active'=>$_POST['stat']],$id);
	echo $_POST['stat'];
	die();
}
if($edit&&$sAct=='no'){
	$data=$this->db->load($sTbl,$edit);
	if(!$data) $this->req->url(['-'=>$editKey],true);
	$_SESSION['prev_news_img'.$edit]=$data['image'];
}
elseif($del){
	$dat=$this->db->load($sTbl,$del);
	if(!$dat) $this->req->url(['-'=>$delKey],true);
	if(isset($_POST['confirm'])&&$_POST['confirm']=='ok'){
		foreach(['','t/'] as $dir){
			$p=NEWS.$dir.$dat['image'].'.jpg';
			if(file_exists($p)) unlink($p);
		}
		$this->db->modify($sTbl,$del);
		$this->req->url(['-'=>$delKey],true);
	}
	else $this->msg('<form method="post"><input type="hidden" value="ok" name="confirm" /><div class="question"><b>'.$dat['title'].'</b> '.$sConfirmMsg.'?</div><div class="btns"><input type="submit" value="Устгах" class="red" /> <input type="button" value="Болих" onclick="location.href=\''.$this->req->url(['-'=>$delKey]).'\';" /></div></form>','confirm');
}
if(substr($sAct,0,4)=='save'){
	$data=$this->req->get($dataKey);
	if(!$data['title']) $this->msg('Мэдээний гарчгийг оруулна уу','form');
	if(!$this->has()){
		if(!$edit){
			$data['time']=time();
			$data['hits']=0;
			$data['last_hit']=0;
		}
		if(isset($_FILES['image']['tmp_name'])&&$_FILES['image']['tmp_name']){
			if($edit&&isset($_SESSION['prev_news_img'.$edit])){
				foreach(['t/',''] as $dir){
					$p=NEWS.$dir.$_SESSION['prev_news_img'.$edit].'.jpg';
					if(file_exists($p)) unlink($p);
				}
				unset($_SESSION['prev_news_img'.$edit]);
			}
			$d=date('ym');
			$this->load('Image','img',[NEWS]);
			$fn=$this->img->genFn();
			$this->img->name($fn)->dir($d)->size('360:210:f','t')->size('2000:2000:a')->upload('image');
			$data['image']=$d.'/'.$fn;
		}
		if(!isset($data['alias'])||!$data['alias']) $data['alias']=trim(substr(str_replace(['  ',' '],[' ','-'],preg_replace('/[^a-z0-9\s]/','',$this->str->toLatin(mb_strtolower($data['title'],'utf8')))),0,50),'-');
		$data['cat_id']=$cat;
		$id=$this->db->modify($sTbl,$data,$edit);
		if($edit) $id=$edit;
		$rm=$add=[];
		if($sAct=='saveedit') $add[$editKey]=$id;else $rm[]=$editKey;
		$this->req->url(['-'=>$rm,'+'=>$add],true);
	}
}
if(!isset($data)) $data=[];
$sCond='cat_id='.$cat;
if(isset($data['id'])) unset($data['id']);
$this->tit('Мэдээ, мэдээлэл');
$this->js('tm/editor')->both('prv/fm');
if(isset($data['image'])) unset($data['image']);
$content='';
if(isset($data['content'])){
	$content=$data['content'];
	unset($data['content']);
}
?>
<form method="post" enctype="multipart/form-data">
<div class="form">
<div><?if($edit&&isset($_SESSION['prev_news_img'.$edit])&&file_exists(NEWS.'t/'.$_SESSION['prev_news_img'.$edit].'.jpg')) echo '<img src="n/t/'.$_SESSION['prev_news_img'.$edit].'.jpg" style="float:right;width:215px;margin-bottom:-50px;" />';?><label for="img" class="label">Зураг</label><div><input type="file" name="image" id="img" /></div></div>
<div><label for="alias" class="label">Alias</label><div><input type="text" name="<?=$dataKey?>[alias]" class="fld" id="alias" /></div></div>
<div><label for="title" class="label">Гарчиг</label><div><input type="text" name="<?=$dataKey?>[title]" required="true" class="fld" autofocus="true" id="title" /></div></div>
<div><label for="short" class="label">Хураангуй агуулга</label><div><textarea name="<?=$dataKey?>[short]" class="fld" id="short"></textarea></div></div>
<div><label for="content" class="label"><a href="javascript:;" id="push-img" data-type="image" editor="content" forcetype="true">Зураг нэмэх</a>Мэдээний агуулга</label><div><textarea name="<?=$dataKey?>[content]" css="news" class="fld editor" style="height:600px;" id="content"><?=$content?></textarea></div><div id="img-pos" editor="content">Сонгосон зургийг: <a href="javascript:;" rel="r">Баруун талд шахах</a> &nbsp; | &nbsp; <a href="javascript:;" rel="l">Зүүн талд шахах</a> &nbsp; | &nbsp; <a href="javascript:;" rel="c">Голлуулах</a><br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <a href="javascript:;" rel="add">Зурганд тайлбар бичих</a> &nbsp; | &nbsp; <a href="javascript:;" rel="del">Зургийн тайлбар устгах</a></div></div>
<div><label for="tags" class="label">Түлхүүр үгс</label><div><input type="text" name="<?=$dataKey?>[tags]" class="fld" id="tags" /></div></div>
<div><label class="label">Идэвхитэй эсэх</label><div><input type="radio" name="<?=$dataKey?>[active]" value="1"<?=!isset($data['active'])||$data['active']?' checked="true"':''?> id="active-1" /> <label for="active-1">Идэвхитэй</label>&nbsp;&nbsp; <input type="radio" name="<?=$dataKey?>[active]"<?=isset($data['active'])&&!$data['active']?' checked="true"':''?> value="0" id="active-0" /> <label for="active-0">Идэвхигүй</label></div></div>
<div class="buttons<?=$edit?' editing':''?>"><?if($edit):?><a href="<?=$this->req->url(['-'=>$editKey])?>">Шинэ +1</a><?endif?><input type="submit" name="do[save]" class="main" value="<?=$edit?'SAVE':'ADD'?>" /> <input type="submit" name="do[saveedit]" value="Edit" /></div>
</div></form>
<script type="text/javascript">$(document).ready(function(){$('#push-img').fileManager()});$.set(<?=json_encode($data)?>);
function actv(o,i){
	$.post(location.href,{toggle:i,stat:o.checked?1:0},(function(p){return function(r){p.cls('inactive',r!=1)}})($(o).parent()))
}</script>
<div class="datas"><h3>Мэдээ, мэдээллүүд</h3>
<div class="list">
<?
$h=$this->db->fetch('SELECT * FROM '.$this->db->tbl($sTbl).' WHERE '.$sCond.' ORDER BY time DESC');
while($r=$this->db->each($h)){
	echo '<div'.($r['active']?'':' class="inactive"').'>'.($r['image']&&file_exists(NEWS.'t/'.$r['image'].'.jpg')?'<div class="img"><img src="n/t/'.$r['image'].'.jpg" /></div>':'').'<b>'.$r['title'].'</b><input type="checkbox"'.($r['active']?' checked="true"':'').' onchange="actv(this,'.$r['id'].')" /> <a href="'.$this->req->url(['+'=>[$editKey=>$r['id'],'cat'=>$r['cat_id']],'-'=>$delKey]).'">Засах</a> <a href="'.$this->req->url(['+'=>[$delKey=>$r['id']],'-'=>$editKey]).'" class="del">Устгах</a></div>';	
}?>
</div>
</div>
<?='</div>'?>