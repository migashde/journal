<?php
defined('ADMIN')&&$this->acc->admin or $this->req->url('@');
echo '<div class="tab-content">';
$editKey='md';
$delKey='rm';
$dataKey='data';
$sConfirmMsg=' нэр дэвшигчийн мэдээллийг үнэхээр устгах уу';
$sTbl='candidates';
$del=0;
$edit=$this->req->get($editKey,'int');
if(!$edit) $del=$this->req->get($delKey,'int');
$sAct=$this->req->url('action');
if($edit&&$sAct=='no'){
	$data=$this->db->load($sTbl,$edit);
	if(!$data) $this->req->url(['-'=>$editKey],true);
	$_SESSION['prev_candidate_img'.$edit]=$data['image'];
}
elseif($del){
	$dat=$this->db->load($sTbl,$del);
	if(!$dat) $this->req->url(['-'=>$delKey],true);
	if(isset($_POST['confirm'])&&$_POST['confirm']=='ok'){
		foreach(['','t/'] as $dir){
			$p=CAND.$dir.$dat['image'].'.jpg';
			if(file_exists($p)) unlink($p);
		}
		$this->db->modify($sTbl,$del);
		$this->req->url(['-'=>$delKey],true);
	}
	else $this->msg('<form method="post"><input type="hidden" value="ok" name="confirm" /><div class="question">'.($r['image']&&file_exists(CAND.'t/'.$r['image'].'.jpg')?'<div class="img"><img src="c/t/'.$r['image'].'.jpg" /></div>':'').'<b>'.$dat['ovog'].' '.$dat['ner'].'</b> '.$sConfirmMsg.'?</div><div class="btns"><input type="submit" value="Устгах" class="red" /> <input type="button" value="Болих" onclick="location.href=\''.$this->req->url(['-'=>$delKey]).'\';" /></div></form>','confirm');
}
if(substr($sAct,0,4)=='save'){
	$data=$this->req->get($dataKey);
	if(!$data['ovog']||!$data['ner']) $this->msg('Овог нэрийг оруулна уу','form');
	if(!$this->has()){
		if(!$edit){
			$data['hits']=0;
			$data['last_hit']=0;
		}
		if(isset($_FILES['image']['tmp_name'])&&$_FILES['image']['tmp_name']){
			if($edit&&isset($_SESSION['prev_candidate_img'.$edit])){
				foreach(['t/',''] as $dir){
					$p=CAND.$dir.$_SESSION['prev_candidate_img'.$edit].'.jpg';
					if(file_exists($p)) unlink($p);
				}
				unset($_SESSION['prev_candidate_img'.$edit]);
			}
			$d=date('ym');
			$this->load('Image','img',[CAND]);
			$fn=$this->img->genFn();
			$this->img->name($fn)->dir($d)->size('300:300:f','t')->size('1500:1500:a')->upload('image');
			$data['image']=$d.'/'.$fn;
		}
		$data['alias']=strtolower($this->str->toLatin($data['ovog'])).'-'.strtolower($this->str->toLatin($data['ner']));
		foreach(['rss','web','email','phone','instagram','youtube','linkedin','twitter','facebook','image'] as $fld) if(isset($data[$fld])&&!$data[$fld]) unset($data[$fld]);
		$id=$this->db->modify($sTbl,$data,$edit);
		if($edit) $id=$edit;
		$rm=$add=[];
		if($sAct=='saveedit') $add[$editKey]=$id;else $rm[]=$editKey;
		$this->req->url(['-'=>$rm,'+'=>$add],true);
	}
}
if(!isset($data)) $data=[];
if(isset($data['id'])) unset($data['id']);
$this->tit('Нэр дэвшигчид');
$this->js('tm/editor')->both('prv/fm');
$aRounds=[];
for($i=1;$i<=76;$i++) $aRounds[$i]=$i.'- тойрог';
$bio=$edu=$mis='';
if(isset($data['bio'])){
	$bio=$data['bio'];
	$mis=$data['mission'];
	$edu=$data['education'];
	unset($data['mission'],$data['bio'],$data['image'],$data['education']);
}
if(isset($data['phone'])&&!$data['phone']) $data['phone']='';
$aGender=['m'=>'Эрэгтэй','f'=>'Эмэгтэй'];
?>
<form method="post" enctype="multipart/form-data">
<div class="form">
<div><label for="around_id" class="label">Нэр дэвшиж буй тойрог</label><div><select id="around_id" class="fld" name="<?=$dataKey?>[around_id]"><?=$this->options($aRounds)?></select></div></div>
<div><label for="ovog" class="label">Овог</label><div><input type="text" name="<?=$dataKey?>[ovog]" required="true" class="fld" autofocus="true" id="ovog" /></div></div>
<div><label for="ner" class="label">Нэр</label><div><input type="text" name="<?=$dataKey?>[ner]" required="true" class="fld" id="ner" /></div></div>
<div><?if($edit&&isset($_SESSION['prev_candidate_img'.$edit])&&file_exists(NEWS.'t/'.$_SESSION['prev_candidate_img'.$edit].'.jpg')) echo '<img src="c/t/'.$_SESSION['prev_candidate_img'.$edit].'.jpg" style="float:right;" />';?><label for="img" class="label">Зураг</label><div><input type="file" name="image" id="img" /></div></div>
<div><label for="position" class="label">Одоо эрхэлж буй ажил</label><div><input type="text" name="<?=$dataKey?>[position]" class="fld" id="position" /></div></div>
<div><label for="mission" class="label">Зорилго</label><div><textarea name="<?=$dataKey?>[mission]" css="news" class="fld editor" style="height:200px;" id="mission"><?=$mis?></textarea></div></div>
<div><label for="gender" class="label">Хүйс</label><div><select id="gender" class="fld" name="<?=$dataKey?>[gender]"><?=$this->options($aGender)?></select></div></div>
<div><label for="age" class="label">Нас</label><div><input type="number" name="<?=$dataKey?>[age]" class="fld" id="age" /></div></div>
<div><label for="bio" class="label"><a href="javascript:;" id="push-img" data-type="image" editor="bio" forcetype="true">Зураг нэмэх</a>Намтар</label><div><textarea name="<?=$dataKey?>[bio]" css="news" class="fld editor" style="height:400px;" id="bio"><?=$bio?></textarea></div><div id="img-pos" editor="bio">Сонгосон зургийг: <a href="javascript:;" rel="r">Баруун талд шахах</a> &nbsp; | &nbsp; <a href="javascript:;" rel="l">Зүүн талд шахах</a> &nbsp; | &nbsp; <a href="javascript:;" rel="c">Голлуулах</a><br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <a href="javascript:;" rel="add">Зурганд тайлбар бичих</a> &nbsp; | &nbsp; <a href="javascript:;" rel="del">Зургийн тайлбар устгах</a></div></div>
<div><label for="education" class="label">Боловсрол</label><div><textarea name="<?=$dataKey?>[education]" css="news" class="fld editor" style="height:200px;" id="education"><?=$edu?></textarea></div></div>
<div><label for="degree" class="label">Эрдмийн зэрэг цол</label><div><input type="text" name="<?=$dataKey?>[degree]" class="fld" id="degree" /></div></div>
<div><label for="profession" class="label">Мэргэжил</label><div><input type="text" name="<?=$dataKey?>[profession]" class="fld" id="profession" /></div></div>
<div><label for="email" class="label">И-мэйл</label><div><input type="text" name="<?=$dataKey?>[email]" class="fld" id="email" /></div></div>
<div><label for="phone" class="label">Утасны дугаар</label><div><input type="number" min="80000000" max="99999999" step="1" name="<?=$dataKey?>[phone]" class="fld" id="phone" /></div></div>
<div><label for="web" class="label">Web site</label><div><input type="text" name="<?=$dataKey?>[web]" class="fld" id="web" /></div></div>
<div><label for="facebook" class="label">Facebook</label><div><input type="text" name="<?=$dataKey?>[facebook]" class="fld" id="facebook" /></div></div>
<div><label for="twitter" class="label">Twitter</label><div><input type="text" name="<?=$dataKey?>[twitter]" class="fld" id="twitter" /></div></div>
<div><label for="linkedin" class="label">LinkedIn</label><div><input type="text" name="<?=$dataKey?>[linkedin]" class="fld" id="linkedin" /></div></div>
<div><label for="youtube" class="label">Youtube channel</label><div><input type="text" name="<?=$dataKey?>[youtube]" class="fld" id="youtube" /></div></div>
<div><label for="instagram" class="label">Instagram</label><div><input type="text" name="<?=$dataKey?>[instagram]" class="fld" id="instagram" /></div></div>
<div><label for="rss" class="label">RSS feed URL</label><div><input type="text" name="<?=$dataKey?>[rss]" class="fld" id="rss" /></div></div>
<div><label for="bank_account" class="label">Хандив хүлээн авах данс</label><div><input type="text" name="<?=$dataKey?>[bank_account]" class="fld" id="bank_account" /></div></div>
<div class="buttons<?=$edit?' editing':''?>"><?if($edit):?><a href="<?=$this->req->url(['-'=>$editKey])?>">Шинэ +1</a><?endif?><input type="submit" name="do[save]" class="main" value="<?=$edit?'SAVE':'ADD'?>" /> <input type="submit" name="do[saveedit]" value="Edit" /></div>
</div></form>
<script type="text/javascript">$(document).ready(function(){$('#push-img').fileManager()});$.set(<?=json_encode($data)?>);</script>
<div class="datas"><h3>Нэр дэвшигчид</h3>
<div class="list">
<?
$sCond=1;
if($iRound=$this->req->get('round','int')) $sCond=' around_id='.$iRound;
$h=$this->db->fetch('SELECT * FROM '.$this->db->tbl($sTbl).' WHERE '.$sCond.' ORDER BY ner');
while($r=$this->db->each($h)){
	echo '<div>'.($r['image']&&file_exists(CAND.'t/'.$r['image'].'.jpg')?'<div class="img"><img src="c/t/'.$r['image'].'.jpg" /></div>':'').'<b>'.$r['ovog'].' '.$r['ner'].'</b> <a href="'.$this->req->url(['+'=>[$editKey=>$r['id']],'-'=>$delKey]).'">Засах</a> <a href="'.$this->req->url(['+'=>[$delKey=>$r['id']],'-'=>$editKey]).'" class="del">Устгах</a></div>';	
}?>
</div>
</div>
<?='</div>'?>