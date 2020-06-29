<?
$this->both('tools/scroll')->both('page/home');
?>
<div class="intro"><div class="center"><div class="dfl">
<div id="greeting">
<?
$aGreeting=$this->db->load('pages','alias="greeting"');
echo '<h3>'.$aGreeting['title'].'</h3><div class="content swiper-container"><div class="swiper-wrapper"><div class="swiper-slide">'.$aGreeting['content'].'</div></div><div class="swiper-scrollbar"></div></div>';
?>
</div>
<div class="video"><h3>Танилцуулга видео</h3>
<iframe src="//www.youtube.com/embed/<?=$this->sett('video-code')?>" frameborder="0" width="100%" height="314" allowfullscreen="allowfullscreen"></iframe></div></div></div></div>
<?
$this->module('main/news');
?>