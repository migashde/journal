<?
$key=$this->req->url(1);
if(!$key) $this->req->url('');
$data=$this->db->load('candidates','alias="'.$key.'"');
$this->db->modify('candidates',['last_hit'=>time(),'hits'=>'+1'],$data['id']);
$this->css('page/candidate');
$aRound=['','Архангай аймаг','Баян-Өлгий аймаг','Баянхонгор аймаг','Булган аймаг','Говь-Алтай аймаг','Дундговь, Говьсүмбэр аймаг','Дорнод аймаг','Дорноговь аймаг','Завхан аймаг','Өвөрхангай аймаг','Өмнөговь аймаг','Сүхбаатар аймаг','Сэлэнгэ аймаг','Төв аймаг','Увс аймаг','Ховд аймаг','Хөвсгөл аймаг','Хэнтий аймаг','Дархан-Уул аймаг','Орхон аймаг','Налайх, Багануур, Багахангай дүүрэг','Баянзүрх дүүрэг','Баянзүрх дүүрэг','Сүхбаатар дүүрэг','Чингэлтэй дүүрэг','Баянгол дүүрэг','Сонгинохайрхан дүүрэг','Сонгинохайрхан дүүрэг','Хан-Уул дүүрэг'];
?>
<div class="candidate"><div class="center">
<div class="bg"><div id="img-c">
<div class="top"><div class="picture"><img src="c/t/<?=$data['image']?>.jpg" onclick="bigger(this)" /><b><?=$data['ovog'].' <span>'.$data['ner'].'</span>'?></b><?=$data['age']?'<span>'.$data['age'].' настай</span>':''?></div>
<div class="blits"><?if($data['bank_account']):?>
<div class="donate"><a href="javascript:;" class="bttn" onclick="$(this).parent().cls('show','~')">Хандив өгөх</a><div><h3>Хандивын данс</h3><b><?=$data['bank_account']?></b><em><b>Жич:</b> Хандив өгч байгаа  иргэн, хуулийн этгээд нь гүйлгээний утга дээр Нэр, регистрийн дугаар, хандивын эх үүсвэрээ заавал бичнэ үү.</em></div></div>
<?endif?><h4><?=$data['around_id'].'-р тойрог ('.$aRound[$data['around_id']]?>)-т нэр дэвшиж байна</h4>
<?
echo '<ul>';
foreach(['degree'=>'Эрдмийн зэрэг, цол','profession'=>'Мэргэжил','position'=>'Одоо эрхэлж буй ажил','phone'=>'Утасны дугаар','email'=>'И-мэйл хаяг','web'=>'Албан ёсны вэб хуудас'] as $fld=>$label){
	if($data[$fld]){
		switch($fld){
			case 'web':{$data[$fld]='<a href="'.$data[$fld].'" target="_blank">'.$data[$fld].'</a>';}break;
			case 'email':{$data[$fld]='<a href="mailto:'.$data[$fld].'">'.$data[$fld].'</a>';}break;
			case 'phone':{$data[$fld]='<a href="tel:'.$data[$fld].'">'.$data[$fld].'</a>';}break;
		}
		echo '<li><b>'.$label.'</b><span title="Санах ойд хуулах">'.$data[$fld].'</span></li>';
	}
}
echo '</ul><div class="soic">';
foreach(['facebook'=>'Сошиал орчинд','twitter'=>'Жиргээний талбар','linkedin'=>'Ажил хэргийн орон зай','youtube'=>'Видео суваг','instagram'=>'Фото ертөнц','rss'=>'RSS feed'] as $fld=>$label){
	if($data[$fld]) echo '<a href="'.$data[$fld].'" target="_blank" title="'.$label.'" class="'.$fld.'"></a>';
}
echo '</div>';?>
<?if($data['mission']):?><div class="mission"><h3>Зорилго</h3><?=$data['mission']?></div><?endif?></div></div>
<div style="height:0;overflow:hidden;"><img src="img/loading.gif" /></div>
<?if($data['bio']):?><div class="more biography"><h3>Товч намтар</h3><div><?=$data['bio']?></div></div><?endif;
if($data['education']):?><div class="more education"><h3>Боловсрол</h3><div><?=$data['education']?></div></div><?endif?>
</div></div></div></div>
<script type="text/javascript">
function bigger(o){
	if($(o).data('clicked')=='ok') return;
	var ipr=$('#img-c');$(o).data('clicked','ok'),
	$(o).parent().cls('loading',!0),
	$('<img/>',{src:o.src.replace('/t/','/')}).width(300).load(function(){$(this).cls('show'),$(this).animate({width:'100%'},500,'easeInQuad',function(){var h=$(this).height();$('.picture').cls('loading',!1);if(ipr.height()<h) ipr.height(h)})}).click(function(){$(this).animate({width:300},500,'easeOutQuad',function(){$(this).remove(),$('.picture>img').removeData('clicked'),ipr.removeAttr('style')})}).appendTo(ipr)
}
$('.blits>ul>li').click(function(e){if(e.target.tagName.toLowerCase()!=='a'){var o=$(this).children('span');if(o.find('a').length) o=o.find('a');$.copy(o,function(){
	$(this).closest('li').find('span').attr('txt','Хуулагдлаа !'),setTimeout(function(){$(this).closest('li').find('span').removeAttr('txt')}.bind(this),5e3)
})}})
$(document).click(function(e){
	if(!$(e.target).closest('.donate').length) $('.donate').cls('show',!1)
})
</script>