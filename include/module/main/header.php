<?$donate=$this->req->url(0)!=='candidate';?>
<div class="header"><div class="center"><a href="" class="logo"></a>
<div class="menu" onclick="$('body').cls('msh','~')"><div><ul><li><a href="">Бидний тухай</a>
    <ul><li><a href="greeting">Мэндчилгээ</a></li>
    <li><a href="introduction">Эвслийн танилцуулга</a></li>
	<li><a href="boardmembers">Удирдах зөвлөл</a></li></ul>
</li>
<li><a href="program">Мөрийн хөтөлбөр</a></li>
<li><a href="news">Мэдээ, мэдээлэл</a></li>
<li><a href="candidates">Нэр дэвшигчид</a></li>
<li><a href="contact">Холбоо барих</a></li>
</ul>
<?if($donate):?><a href="news/handivyn-dans-neegdlee" class="donate">Хандив өгөх</a><?endif?>
</div>
</div>
<b onclick="$('body').cls('msh','~')"></b>
</div></div>