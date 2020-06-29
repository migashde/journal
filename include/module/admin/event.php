<?php
defined('ADMIN')&&$this->acc->admin or $this->req->url('@');
echo '<div class="tab-content">';
$editKey='md';
$delKey='rm';
$dataKey='data';
$sConfirmMsg=' арга хэмжээг үнэхээр устгах уу';
$sTbl='events';
$del=0;
$edit=$this->req->get($editKey,'int');
if(!$edit) $del=$this->req->get($delKey,'int');
$sAct=$this->req->url('action');
if($edit&&$sAct=='no'){
	$data=$this->db->load($sTbl,$edit);
	if(!$data) $this->req->url(['-'=>$editKey],true);
	$_SESSION['prev_zurag'.$edit]=$data['zurag'];
	$data['ognoo'].=' '.$data['tsag'];
	unset($data['tsag']);
}
elseif($del){
	$dat=$this->db->load($sTbl,$del);
	if(!$dat) $this->req->url(['-'=>$delKey],true);
	if(isset($_POST['confirm'])&&$_POST['confirm']=='ok'){
		foreach(['','t/'] as $dir){
			$p=EVNT.$dir.$dat['zurag'].'.jpg';
			if(file_exists($p)) unlink($p);
		}
		$this->db->modify($sTbl,$del);
		$this->req->url(['-'=>$delKey],true);
	}
	else $this->msg('<form method="post"><input type="hidden" value="ok" name="confirm" /><div class="question">'.($r['zurag']&&file_exists(EVNT.'t/'.$r['zurag'].'.jpg')?'<div class="img"><img src="e/t/'.$r['zurag'].'.jpg" /></div>':'').'<b>'.$dat['garchig'].'</b> '.$sConfirmMsg.'?</div><div class="btns"><input type="submit" value="Устгах" class="red" /> <input type="button" value="Болих" onclick="location.href=\''.$this->req->url(['-'=>$delKey]).'\';" /></div></form>','confirm');
}
if(substr($sAct,0,4)=='save'){
	$data=$this->req->get($dataKey);
	if(!$data['garchig']) $this->msg('Арга хэмжээний гарчгийг оруулна уу','form');
	if(!$data['ognoo']) $this->msg('Огноо оруулна уу','form');
	if(!$this->has()){
		if(!$edit){
			$data['time']=time();
			$data['hits']=0;
			$data['last_hit']=0;
		}
		if(isset($_FILES['image']['tmp_name'])&&$_FILES['image']['tmp_name']){
			if($edit&&isset($_SESSION['prev_zurag'.$edit])){
				foreach(['t/',''] as $dir){
					$p=EVNT.$dir.$_SESSION['prev_zurag'.$edit].'.jpg';
					if(file_exists($p)) unlink($p);
				}
				unset($_SESSION['prev_zurag'.$edit]);
			}
			$d=date('ym');
			$this->load('Image','img',[EVNT]);
			$fn=$this->img->genFn();
			$this->img->name($fn)->dir($d)->size('240:140:f','t')->size('1000:1000:a')->upload('image');
			$data['zurag']=$d.'/'.$fn;
		}
		list($data['ognoo'],$data['tsag'])=explode(' ',$data['ognoo']);
		$id=$this->db->modify($sTbl,$data,$edit);
		if($edit) $id=$edit;
		$rm=$add=[];
		if($sAct=='saveedit') $add[$editKey]=$id;else $rm[]=$editKey;
		$this->req->url(['-'=>$rm,'+'=>$add],true);
	}
}
if(!isset($data)) $data=[];
if(isset($data['id'])) unset($data['id']);
$this->tit('Арга хэмжээг');
$this->js('tm/editor')->both('prv/fm')->both('tools/dtp');
if(isset($data['zurag'])) unset($data['zurag']);
$content='';
if(isset($data['aguulga'])){
	$content=$data['aguulga'];
	unset($data['aguulga']);
}
?>
<form method="post" enctype="multipart/form-data">
<div class="form">
<div><?if($edit&&isset($_SESSION['prev_zurag'.$edit])&&file_exists(EVNT.'t/'.$_SESSION['prev_zurag'.$edit].'.jpg')) echo '<img src="e/t/'.$_SESSION['prev_zurag'.$edit].'.jpg" style="float:right;" />';?><label for="img" class="label">Зураг</label><div><input type="file" name="image" id="img" /></div></div>
<div><label for="ognoo" class="label">Огноо</label><div><input type="text" name="<?=$dataKey?>[ognoo]" class="fld date" data-format="Y-m-d H:i" id="ognoo" /></div></div>
<div><label for="garchig" class="label">Гарчиг</label><div><input type="text" name="<?=$dataKey?>[garchig]" required="true" class="fld" autofocus="true" id="garchig" /></div></div>
<div><label for="aguulga" class="label"><a href="javascript:;" id="push-img" data-type="image" editor="aguulga" forcetype="true">Зураг нэмэх</a>Дэлгэрэнгүй агуулга</label><div><textarea name="<?=$dataKey?>[aguulga]" css="news" class="fld editor" style="height:600px;" id="aguulga"><?=$content?></textarea></div><div id="img-pos" editor="aguulga">Сонгосон зургийг: <a href="javascript:;" rel="r">Баруун талд шахах</a> &nbsp; | &nbsp; <a href="javascript:;" rel="l">Зүүн талд шахах</a> &nbsp; | &nbsp; <a href="javascript:;" rel="c">Голлуулах</a><br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <a href="javascript:;" rel="add">Зурганд тайлбар бичих</a> &nbsp; | &nbsp; <a href="javascript:;" rel="del">Зургийн тайлбар устгах</a></div></div>
<div class="buttons<?=$edit?' editing':''?>"><?if($edit):?><a href="<?=$this->req->url(['-'=>$editKey])?>">Шинэ +1</a><?endif?><input type="submit" name="do[save]" class="main" value="<?=$edit?'SAVE':'ADD'?>" /> <input type="submit" name="do[saveedit]" value="Edit" /></div>
</div></form>
<script type="text/javascript">$(document).ready(function(){$('#push-img').fileManager()});$.set(<?=json_encode($data)?>)</script>
<div class="datas"><h3>Арга хэмжээнүүд</h3>
<div class="list">
<?
$h=$this->db->fetch('SELECT * FROM '.$this->db->tbl($sTbl).' ORDER BY ognoo DESC,tsag DESC');
while($r=$this->db->each($h)){
	echo '<div>'.($r['zurag']&&file_exists(EVNT.'t/'.$r['zurag'].'.jpg')?'<div class="img"><img src="e/t/'.$r['zurag'].'.jpg" /></div>':'').'<b>'.$r['garchig'].'</b> <a href="'.$this->req->url(['+'=>[$editKey=>$r['id']],'-'=>$delKey]).'">Засах</a> <a href="'.$this->req->url(['+'=>[$delKey=>$r['id']],'-'=>$editKey]).'" class="del">Устгах</a></div>';	
}?>
</div>
</div>
<?='</div>'?>