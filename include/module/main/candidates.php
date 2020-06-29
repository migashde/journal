<?
$h=$this->db->fetch('SELECT * FROM '.$this->db->tbl('candidates').' ORDER BY around_id');
echo '<div class="candidates'.($inhome?' home':'').'"><div class="center"><h3>Нэр дэвшигчид</h3>';
if(!$inhome){
    $this->css('page/candidate');
    echo '<div class="list">';
    while($r=$this->db->each($h)) echo '<div><a href="candidate/'.$r['alias'].'"><img src="c/t/'.$r['image'].'.jpg" /><div><b>'.$r['ovog'].' <span>'.$r['ner'].'</span></b></div></a><span>'.$r['position'].'</span></div>';
    echo '</div>';
}
else{
    echo '<div class="swiper-container" id="swipeit"><div class="swiper-wrapper">';
    while($r=$this->db->each($h)) echo '<div class="swiper-slide"><a href="candidate/'.$r['alias'].'"><img src="c/t/'.$r['image'].'.jpg" /><div><b>'.$r['ovog'].' <span>'.$r['ner'].'</span></b><span>'.$r['around_id'].'-р тойрог</span></div></a></div>';
    echo '</div><div class="controls"></div></div>';
}
echo '</div></div>';
?>