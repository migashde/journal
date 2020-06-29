<?php
defined('ADMIN')&&$this->acc->admin or $this->req->url('@');
$sTbl='setting';
if($this->req->url('action')=='save'){
	$aSett=$this->req->get('sett','array');
	foreach($aSett as $key=>$val) $this->db->modify($sTbl,['sval'=>$val],'skey="'.$key.'"');
	$this->cch->set('setting')->rm();
	$this->req->url(true);
}
elseif($this->req->url('action')==='add'){
	$data=$this->req->get('new','array');
	$data['skey']=str_replace([' ','_'],'-',strtolower(trim($data['skey'])));
	if($data['skey']&&$data['title']){
		if($this->db->count($sTbl,'skey="'.$data['skey'].'"')) $this->msg('<b>'.$data['skey'].'</b> түлхүүр үг бүхий тохиргоо өмнө нь үүссэн байна');
		else{
			$this->db->modify($sTbl,$data);
			$this->cch->set('setting')->rm();
			$this->req->url(true);
		}
	}
	else $this->req->url(true);
}
?>
<style type="text/css">
ul.sett{list-style:none;padding:0;margin:0;}
ul.sett>li{margin-bottom:20px;}
ul.sett>li>b{font-size:18px;display:block;margin-bottom:10px;}
ul.sett>li>div{}
</style>
<?
$h=$this->db->fetch('SELECT * FROM '.$this->db->tbl($sTbl));
echo '<div class="pad"><form method="post"><ul class="sett">';
while($r=$this->db->each($h)){
	echo '<li><b>'.$r['title'].'</b><div><textarea title="'.$r['skey'].'" onchange="$(this).attr({name:\'sett['.$r['skey'].']\'})">'.$r['sval'].'</textarea></div></li>';
}
echo '</ul>
<input type="submit" value="Хадгалах" name="do[save]" /></form><br /><br />
<hr /><br /><br /><h3>Тохиргооны утга шинээр нэмэх</h3>
<form method="post">
<table><tr><td><input type="text" name="new[title]" required="true" placeholder="Тохиргооны нэр, гарчиг" /> </td>
<td><input type="text" name="new[skey]" placeholder="Түлхүүр үг" required="true" pattern="^[a-zA-Z][A-Za-z0-9\-]{2,}" /> </td>
<td><input type="text" name="new[sval]" placeholder="Тохиргооны утга" required="true" /> </td>
<td><input type="submit" value="Нэмэх" name="do[add]" /></td></tr></table></div>';
?>