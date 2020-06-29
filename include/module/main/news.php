<?
function cut($s,$l=400){
	$a=explode(' ',mb_substr(strip_tags($s),0,$l));
	array_pop($a);
	return join(' ',$a);
}
echo '<div class="news"><div class="center"><h3>Мэдээ, мэдээлэл</h3><div class="list">';
$h=$this->db->fetch('SELECT * FROM '.$this->db->tbl('news').' WHERE cat_id=1 AND active=1 ORDER BY time DESC LIMIT 5');
while($r=$this->db->each($h)){
	echo '<div><a href="news/'.$r['alias'].'"><img src="n/t/'.$r['image'].'.jpg" /><b>'.$r['title'].'</b></a><div>'.($r['short']?:cut($r['content'])).'</div></div>';
}
echo '</div></div></div>
<div class="events"><div class="center"><h3>Үйл явдлын тойм</h3><div class="list swiper-container"><div class="swiper-wrapper">';
$h=$this->db->fetch('SELECT * FROM '.$this->db->tbl('news').' WHERE cat_id=2 AND active=1 ORDER BY time DESC LIMIT 12');
while($r=$this->db->each($h)){
	echo '<div class="swiper-slide"><a href="news/'.$r['alias'].'"><img src="n/t/'.$r['image'].'.jpg" /><b>'.$r['title'].'</b></a></div>';
}
echo '</div><div class="controls"></div></div></div></div>';
?>