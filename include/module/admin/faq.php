<?php
defined('ADMIN')&&$this->acc->admin or $this->req->url('@');
$editKey='md';
$delKey='rm';
$dataKey='data';
$sConfirmMsg=' асуултыг үнэхээр устгах уу';
$sTbl='faq';
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
	else $this->msg('<form method="post"><input type="hidden" value="ok" name="confirm" /><div class="question"><b>'.$dat['question'].'</b> '.$sConfirmMsg.'?</div><div class="btns"><input type="submit" value="Устгах" class="red" /> <input type="button" value="Болих" onclick="location.href=\''.$this->req->url(['-'=>$delKey]).'\';" /></div></form>','confirm');
}
$checked=$this->req->get('forcelast',$this->req->get('fl'));
if(substr($sAct,0,4)=='save'){
	$data=$this->req->get($dataKey);
	if(!$data['question']) $this->msg('Асуулт оруулна уу','form');
	if(!$data['answer']) $this->msg('Хариулт оруулна уу','form');
	if(!$this->has()){
		$data['ordering']++;
	 	if($edit){
	 		$pData=$this->db->load($sTbl,$edit);
	 		$this->db->modify($sTbl,['ordering'=>'-1'],'ordering>'.intval($pData['ordering']));
 		}
		$this->db->modify($sTbl,['ordering'=>'+1'],'ordering>='.$data['ordering']);
		$id=$this->db->modify($sTbl,$data,$edit);
		if($edit) $id=$edit;
		$rm=$add=[];
		if($sAct=='saveedit') $add[$editKey]=$id;else $rm[]=$editKey;
		$this->req->url(['-'=>$rm,'+'=>$add],true);
	}
}
if(!isset($data)) $data=[];
if(isset($data['id'])) unset($data['id']);
$last=0;
$aListing=$this->db->fetch('SELECT `ordering`,CONCAT("(",`question`,")-н дараа") FROM '.$this->db->tbl($sTbl).($edit?' AND id!='.$edit:'').' ORDER BY ordering',2);
if($checked){end($aListing);$last=key($aListing);reset($aListing);}
$data['ordering']=isset($data,$data['ordering'])?$data['ordering']-1:$last;
$this->tit('Хуудасны агуулга');
$this->js('tm/editor')->both('prv/fm');
?>
<div class="tab-content">
<form method="post">
<div class="form">
<div><label for="question" class="label">Асуулт</label><div><textarea name="<?=$dataKey?>[question]" class="fld" required="true" autofocus="true" id="question"></textarea></div></div>
<div><label for="answer" class="label"><a href="javascript:;" id="push-img" data-type="image" editor="answer" forcetype="true">Зураг нэмэх</a>Хариулт</label><div><textarea name="<?=$dataKey?>[answer]" css="news" class="fld editor" style="height:600px;" id="answer"><?=isset($data)?$data['answer']:''?></textarea></div><div id="img-pos" editor="answer">Сонгосон зургийг: <a href="javascript:;" rel="r">Баруун талд шахах</a> &nbsp; | &nbsp; <a href="javascript:;" rel="l">Зүүн талд шахах</a> &nbsp; | &nbsp; <a href="javascript:;" rel="c">Голлуулах</a><br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <a href="javascript:;" rel="add">Зурганд тайлбар бичих</a> &nbsp; | &nbsp; <a href="javascript:;" rel="del">Зургийн тайлбар устгах</a></div></div>
<div><label for="ordering" class="label">Дараалал</label><div><select name="<?=$dataKey?>[ordering]" class="fld chb" id="ordering"><?=$this->html->options($aListing,null,'Хамгийн эхэнд')?></select></div><span><input type="checkbox" value="1" name="fl" id="forcelast"<?=$checked?' checked="true"':''?> title="Хамгийн сүүлд нэмэх" /></span></div>
<div class="buttons<?=$edit?' editing':''?>"><?if($edit):?><a href="<?=$this->req->url(['-'=>$editKey])?>">Шинэ +1</a><?endif?><input type="submit" name="do[save]" class="main" value="<?=$edit?'SAVE':'ADD'?>" /> <input type="submit" name="do[saveedit]" value="Edit" /></div>
</div></form>
<script type="text/javascript">$(document).ready(function(){$('#push-img').fileManager()});$.set(<?=json_encode($data)?>);</script>
<div class="datas"><h3>Асуулт, хариултууд</h3>
<div class="list">
<?$h=$this->db->fetch('SELECT * FROM '.$this->db->tbl($sTbl).' ORDER BY id');
while($r=$this->db->each($h)){
	echo '<div><b>'.$r['question'].'</b> <a href="'.$this->req->url(['+'=>[$editKey=>$r['id']],'-'=>$delKey]).'">Засах</a> <a href="'.$this->req->url(['+'=>[$delKey=>$r['id']],'-'=>$editKey]).'" class="del">Устгах</a></div>';	
}?>
</div></div></div>