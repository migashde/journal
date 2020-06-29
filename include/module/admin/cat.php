<?php
defined('ADMIN')&&$this->acc->admin or $this->req->url('@');
$grp=$this->req->get('grp','int',1);
$aTab=[1=>'Мэдээний ангилал'];
if(!$grp||!isset($aTab[$grp])) $this->req->url(['-'=>'grp'],true);
echo '<div class="tab">';
foreach($aTab as $id=>$s) echo '<a href="'.$this->req->url(['+'=>['grp'=>$id]]).'"'.($id==$grp?' class="active"':'').'>'.$s.'</a>';
echo '</div><div class="tab-content">';
$editKey='md';
$delKey='rm';
$dataKey='data';
$sConfirmMsg=' ангиллыг үнэхээр устгах уу';
$sTbl='datas';
$del=0;
$edit=$this->req->get($editKey,'int');
if(!$edit) $del=$this->req->get($delKey,'int');
$sAct=$this->req->url('action');
if(isset($_POST['id'],$_POST['order'])){
	while(@ob_end_clean());
	$id=intval($_POST['id']);
	$ord=intval($_POST['order']);
	if($ord){
		$this->db->modify($sTbl,['ordering'=>$_POST['order']],$id);
		$this->cch->set('options',$grp)->rm();
	}
	die();
}
if($edit&&$sAct=='no'){
	$data=$this->db->load($sTbl,$edit);
	if(!$data) $this->req->url(['-'=>$editKey],true);
}
elseif($del){
	$dat=$this->db->load($sTbl,$del);
	if(!$dat) $this->req->url(['-'=>$delKey],true);
	if(isset($_POST['confirm'])&&$_POST['confirm']=='ok'){
		$this->db->modify($sTbl,$del);
		$this->cch->set('options',$dat['grp'])->rm();
		$this->req->url(['-'=>$delKey],true);
	}
	else $this->msg('<form method="post"><input type="hidden" value="ok" name="confirm" /><div class="question"><b>'.$dat['value'].'</b> '.$sConfirmMsg.'?</div><div class="btns"><input type="submit" value="Устгах" class="red" /> <input type="button" value="Болих" onclick="location.href=\''.$this->req->url(['-'=>$delKey]).'\';" /></div></form>','confirm');
}
$checked=$this->req->get('forcelast',$this->req->get('fl'));
if(substr($sAct,0,4)=='save'){
	$data=$this->req->get($dataKey);
	if(!$data['value']) $this->msg('Ангилалын нэрийг оруулна уу','form');
	if(!$this->has()){
		if(!$edit){
			$data['grp']=$grp;
			$data['data_id']=$this->db->fetch('SELECT MAX(`data_id`) FROM '.$this->db->tbl($sTbl).' WHERE grp='.$grp,1)+1;
		}
 		$data['ordering']++;
	 	if($edit){
	 		$pData=$this->db->load($sTbl,$edit);
	 		$this->db->modify($sTbl,['ordering'=>'-1'],'grp='.intval($pData['grp']).' AND ordering>'.intval($pData['ordering']));
 		}
		$this->db->modify($sTbl,['ordering'=>'+1'],'grp='.$grp.' AND ordering>='.$data['ordering']);
		$id=$this->db->modify($sTbl,$data,$edit);
		if($edit) $id=$edit;
		$this->cch->set('options',$grp)->rm();
		$rm=$add=[];
		if($checked) $add['forcelast']='ok';else $rm[]='forcelast';
		if($sAct=='saveedit') $add[$editKey]=$id;else $rm[]=$editKey;
		$this->req->url(['-'=>$rm,'+'=>$add],true);
	}
}
if(!isset($data)) $data=[];
$sCond='grp='.$grp;
$last=0;
$aListing=$this->db->fetch('SELECT `ordering`,CONCAT("(",`value`,")-н дараа") FROM '.$this->db->tbl($sTbl).' WHERE '.$sCond.($edit?' AND id!='.$edit:'').' ORDER BY ordering',2);
if($checked){end($aListing);$last=key($aListing);reset($aListing);}
$data['ordering']=isset($data,$data['ordering'])?$data['ordering']-1:$last;
if(isset($data['id'])) unset($data['id']);
$h=$this->db->fetch('SELECT * FROM '.$this->db->tbl($sTbl).' WHERE grp='.$grp.' ORDER BY ordering');
$a=[];
while($r=$this->db->each($h)) $a[]=$r;
$this->tit('Мэдээний ангилал');
?>
<form method="post" enctype="multipart/form-data">
<div class="form">
<div><label for="value" class="label">Утга</label><div><input type="text" name="<?=$dataKey?>[value]" class="fld" autofocus="true" id="value" /></div></div>
<div><label for="ordering" class="label">Дараалал</label><div><select name="<?=$dataKey?>[ordering]" class="fld chb" id="ordering"><?=$this->html->options($aListing,null,'Хамгийн эхэнд')?></select></div><span><input type="checkbox" value="1" name="fl" id="forcelast"<?=$checked?' checked="true"':''?> title="Хамгийн сүүлд нэмэх" /></span></div>
<div class="buttons<?=$edit?' editing':''?>"><?if($edit):?><a href="<?=$this->req->url(['-'=>$editKey])?>">Шинэ +1</a><?endif?><input type="submit" name="do[save]" class="main" value="<?=$edit?'SAVE':'ADD'?>" /> <input type="submit" name="do[saveedit]" value="Edit" /></div>
</div></form>
<script type="text/javascript">$.set(<?=json_encode($data)?>);</script>
<div class="datas"><h3>Ангилал</h3>
<div class="list">
<?foreach($a as $r){
	echo '<div><b>'.$r['value'].'</b><input type="number" value="'.$r['ordering'].'" class="ord inline" onchange="order(this,'.$r['id'].')" title="Дараалал" /> <a href="'.$this->req->url(['+'=>[$editKey=>$r['id']],'-'=>$delKey]).'">Засах</a> <a href="'.$this->req->url(['+'=>[$delKey=>$r['id']],'-'=>$editKey]).'" class="del">Устгах</a></div>';	
}?>
</div>
</div>
<?='</div>'?>