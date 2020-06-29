<?
$alias=$this->req->url(0);
$a=$this->db->load('pages','alias="'.$alias.'"');
if(!$a){
	$alias='notfound';
	$a=['title'=>'Хуудас олдсонгүй','content'=>'<div class="notfound"></div>'];
}
?><div class="page" id="<?=$alias?>"><div class="center"><h3><?=$a['title']?></h3><div class="content"><?=$a['content']?></div></div></div>