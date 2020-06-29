<menu>
<?
$aMenu=[
	'news'=>'Мэдээ, мэдээлэл',
	'candidate'=>'Нэр дэвшигчид',
	'program'=>'Мөрийн хөтөлбөр',
	'event'=>'Арга хэмжээ',
	'faq'=>'Асуулт хариулт',
	'page'=>'Хуудас',
	'file'=>'Файлын сан',
	'setting'=>'Тохиргоо',
	'volunteers'=>'Сайн дурынхан',
	'cat'=>'Ангилал'
];
$f=$this->req->url(1);
foreach($aMenu as $u=>$s) echo '<a href="'.$this->req->url(['@'.$u]).'"'.($u==$f?' class="active"':'').'>'.$s.'</a>';
?>
</menu>
<div class="acc"><?=$this->acc->name(true)?><a href="<?=$this->req->url(['@'])?>" class="sett">Хувийн мэдээлэл</a><a href="logout" class="logout">Гарах</a></div>