<?php
defined('ADMIN')&&$this->acc->admin or $this->req->url('@');
$editKey='md';
$delKey='rm';
$dataKey='data';
$sConfirmMsg=' хуудсыг үнэхээр устгах уу';
$sTbl='pages';
$del=0;
$edit=$this->req->get($editKey,'int');
if(!$edit) $del=$this->req->get($delKey,'int');
$sAct=$this->req->url('action');
if($edit&&$sAct=='no'){
	$data=$this->db->load($sTbl,$edit);
	if(!$data) $this->req->url(['-'=>$editKey],true);
}
elseif($del){
	$dat=$this->db->load($sTbl,$del);
	if(!$dat) $this->req->url(['-'=>$delKey],true);
	if(isset($_POST['confirm'])&&$_POST['confirm']=='ok'){
		$this->db->modify($sTbl,$del);
		$this->req->url(['-'=>$delKey],true);
	}
	else $this->msg('<form method="post"><input type="hidden" value="ok" name="confirm" /><div class="question"><b>'.$dat['title'].'</b> '.$sConfirmMsg.'?</div><div class="btns"><input type="submit" value="Устгах" class="red" /> <input type="button" value="Болих" onclick="location.href=\''.$this->req->url(['-'=>$delKey]).'\';" /></div></form>','confirm');
}
if(substr($sAct,0,4)=='save'){
	$data=$this->req->get($dataKey);
	if(!$data['alias']) $this->msg('Хуудасны URL-ыг оруулна уу','form');
	elseif($this->db->count($sTbl,'alias="'.$this->db->esc($data['alias']).'" AND id!='.$edit)) $this->msg('<b>'.$data['alias'].'</b> URL бүхий хуудсыг өмнө нь оруулсан байна','form');
	if(!$data['title']) $this->msg('Хуудасны гарчгийг оруулна уу','form');
	if(!$this->has()){
		if(!$data['menu_title']) $data['menu_title']=$data['title'];
		$id=$this->db->modify($sTbl,$data,$edit);
		if($edit) $id=$edit;
		$rm=$add=[];
		if($sAct=='saveedit') $add[$editKey]=$id;else $rm[]=$editKey;
		$this->req->url(['-'=>$rm,'+'=>$add],true);
	}
}
if(!isset($data)) $data=[];
if(isset($data['id'])) unset($data['id']);
$this->tit('Хуудасны агуулга');
$this->js('tm/editor')->both('prv/fm');
?>
<div class="tab-content">
<form method="post">
<div class="form">
<div><label for="alias" class="label">Хуудасны URL хаяг</label><div><input type="text" name="<?=$dataKey?>[alias]" class="fld" required="true" autofocus="true" id="alias" /></div></div>
<div><label for="title" class="label">Гарчиг</label><div><input type="text" name="<?=$dataKey?>[title]" class="fld" required="true" id="title" /></div></div>
<div><label for="menu_title" class="label">Цэсний нэр</label><div><input type="text" name="<?=$dataKey?>[menu_title]" class="fld" id="menu_title" /></div></div>
<div><label class="label">Аль цэсэнд гарах</label><div><input type="radio" name="<?=$dataKey?>[menu_pos]" value="1"<?=!isset($data)||$data['menu_pos']?' checked="true"':''?> id="menu_pos-1" /> <label for="menu_pos-1">Толгой хэсэгт</label>&nbsp;&nbsp; <input type="radio" name="<?=$dataKey?>[menu_pos]"<?=isset($data)&&!$data['menu_pos']?' checked="true"':''?> value="0" id="menu_pos-0" /> <label for="menu_pos-0">Хөл хэсэгт</label></div></div>
<div><label for="content" class="label"><a href="javascript:;" id="push-img" data-type="image" editor="content" forcetype="true">Зураг нэмэх</a>Хуудасны агуулга</label><div><textarea name="<?=$dataKey?>[content]" css="news" class="fld editor" style="height:600px;" id="content"><?=isset($data)?$data['content']:''?></textarea></div><div id="img-pos" editor="content">Сонгосон зургийг: <a href="javascript:;" rel="r">Баруун талд шахах</a> &nbsp; | &nbsp; <a href="javascript:;" rel="l">Зүүн талд шахах</a> &nbsp; | &nbsp; <a href="javascript:;" rel="c">Голлуулах</a><br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <a href="javascript:;" rel="add">Зурганд тайлбар бичих</a> &nbsp; | &nbsp; <a href="javascript:;" rel="del">Зургийн тайлбар устгах</a></div></div>
<div class="buttons<?=$edit?' editing':''?>"><?if($edit):?><a href="<?=$this->req->url(['-'=>$editKey])?>">Шинэ +1</a><?endif?><input type="submit" name="do[save]" class="main" value="<?=$edit?'SAVE':'ADD'?>" /> <input type="submit" name="do[saveedit]" value="Edit" /></div>
</div></form>
<script type="text/javascript">$(document).ready(function(){$('#push-img').fileManager()});$.set(<?=json_encode($data)?>);</script>
<div class="datas"><h3>Статик хуудсууд</h3>
<div class="list">
<?$h=$this->db->fetch('SELECT * FROM '.$this->db->tbl($sTbl).' ORDER BY id');
while($r=$this->db->each($h)){
	echo '<div><b>'.$r['title'].'</b> <a href="'.$this->req->url(['+'=>[$editKey=>$r['id']],'-'=>$delKey]).'">Засах</a> <a href="'.$this->req->url(['+'=>[$delKey=>$r['id']],'-'=>$editKey]).'" class="del">Устгах</a></div>';	
}?>
</div></div></div>