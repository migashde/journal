<?php
$this->both('page/news');
if($key=$this->req->url(1)){
	$this->both('tools/slide');
	$aNews=$this->db->load('news',is_numeric($key)?$key:'alias="'.$this->db->esc($key).'"');
	$this->db->modify('news',['hits'=>'+1','last_hit'=>time()],$aNews['id']);
	$next=$prev=[];
	if($aNews['id']!=11){
		$next=$this->db->fetch('SELECT alias,title,image FROM '.$this->db->tbl('news').' WHERE active=1 AND time>'.$aNews['time'].' ORDER BY time LIMIT 1',4);
		$prev=$this->db->fetch('SELECT alias,title,image FROM '.$this->db->tbl('news').' WHERE active=1 AND time<'.$aNews['time'].' ORDER BY time DESC LIMIT 1',4);
	}
	$sContent=str_replace(["\n","\t","\r",'> <','<p><iframe','</iframe></p>'],['','','','><','<iframe','</iframe>'],$aNews['content']);
	function cut($s,$l=400){
		$a=explode(' ',mb_substr(strip_tags($s),0,$l));
		array_pop($a);
		return join(' ',$a);
	}
	$desc=cut($aNews['content']);
	$this->G['meta']="\t".'<meta property="og:url" class="meta" content="'.$this->req->url('full').'">
	<meta property="og:title" class="meta" content="'.str_replace('"','&quot;',$aNews['title']).'">'.($aNews['image']&&file_exists(NEWS.$aNews['image'].'.jpg')?'
	<meta property="og:image" class="meta" content="'.$this->req->url('base').'n/'.$aNews['image'].'.jpg">':'').'
	<meta property="og:description" class="meta" content="'.str_replace(["\n","\r",'<br />','"'],[' ',' ','','&quot;'],$desc).'">
	<meta property="og:type" class="meta" content="website">
	<meta property="og:site_name" class="meta" content="Зөв Хүн Электорат эвсэл">';
	$this->tit($aNews['title']);
?>
<div class="articles"><div class="center"><div class="news-body"><h2><?=$aNews['title']?></h2><div class="content"><?=$sContent?></div></div>
<div class="pnn">
<?if($prev) echo '<a href="news/'.$prev['alias'].'" class="near prev" title="Өмнөх мэдээ"><img src="n/t/'.$prev['image'].'.jpg" /><b>'.$prev['title'].'</b></a>';
if($next) echo '<a href="news/'.$next['alias'].'" class="near next" title="Дараагийн мэдээ"><img src="n/t/'.$next['image'].'.jpg" /><b>'.$next['title'].'</b></a>';?>
</div>
</div></div>
	<div tabIndex="-1" role="dialog" class="swiper" aria-hidden="true" id="swipe-handle"><div class="sw-bg"></div><div class="sw-scroll-wrap"><div class="sw-container"><div class="sw-item"></div><div class="sw-item"></div><div class="sw-item"></div></div><div class="sw-ui sw-ui-hidden"><div class="sw-top-bar"><div class="sw-counter"></div><button class="sw-button sw-button-close" title="Хаах (Esc)"></button><button class="sw-button sw-button-share" title="Хуваалцах"></button><button class="sw-button sw-button-fs" title="Дэлгэц дүүргэх"></button><button class="sw-button sw-button-zoom"></button><div class="sw-preloader"><div class="sw-preloader_icn"><div class="sw-preloader_cut"><div class="sw-preloader_donut"></div></div></div></div></div><div class="sw-share-modal sw-share-modal-hidden sw-single-tap"><div class="sw-share-tooltip"><a href="#" class="sw-share-facebook"></a><a href="#" class="sw-share-twitter"></a><a href="#" class="sw-share-pinterest"></a><a href="#" class="sw-share-download"></a></div></div><button class="sw-button sw-button-arrow-left" title="Өмнөх"></button><button class="sw-button sw-button-arrow-right" title="Дараах"></button><div class="sw-caption"><div class="sw-caption_center"></div></div></div></div></div>
<?}
else{
	$cat=$this->req->get('cat','int',1);
	if(!$cat) $cat=1;
	$cond=' AND cat_id='.intval($cat);
	if($tag=$this->req->get('tag','str')) $cond.=' AND tags "%,'.$this->db->esc($tag).',%"';
	$h=$this->db->fetch('SELECT * FROM '.$this->db->tbl('news').' WHERE active=1'.$cond.' ORDER BY time DESC');
	echo '<div class="articles"><div class="center"><h3>Мэдээ, мэдээлэл</h3><div class="tab">';
	$aCat=$this->cch->set('options',1)->get();
	foreach($aCat as $id=>$s) echo '<a href="'.$this->req->url(['+'=>['cat'=>$id]]).'"'.($id==$cat?' class="active"':'').'>'.$s.'</a>';
	echo '</div><div class="tab-content"><div class="list">';//'.($cat==3?' videos':'').'
	while($r=$this->db->each($h)){
		//if($cat!=3){
			//<p>'.($r['short']?$r['short']:cut($r['content'],300)).'</p>
			echo '<div class="item"><a href="news/'.($r['alias']?:$r['id']).'"><img src="n/t/'.$r['image'].'.jpg" /><b>'.$r['title'].'</b></a></div>';
		/*}
		else echo '<div class="video"><h5>'.$r['title'].'</h5><div>'.$r['content'].'</div></div>';*/
	}
	echo '</div></div></div></div>';
}?>