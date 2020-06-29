<?php
$h=$this->db->fetch('SELECT * FROM '.$this->db->tbl('events').' ORDER BY ognoo');
echo '<div class="news">';
while($r=$this->db->each($h)){
	echo '<div class="item"><h3>'.$r['title'].'</h3><p>'.$r['short'].'</p><a href="news/'.($r['alias']?:$r['id']).'">Цааш унших</a></div>';
}
echo '</div>';
?>