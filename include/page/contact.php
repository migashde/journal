<?
$this->css('page/contact');
if(!isset($_SESSION['registered'])&&$this->req->url('action')=='register'){
	$data=$this->req->get('data','array');
	$data['time']=time();
	$data['phone']=intval($data['phone']);
	$_SESSION['registered']=true;
	$this->db->modify('volunteers',$data);
	$this->req->url(true);
}
?>
<div class="contact">
<div class="cover"></div>
<div class="center">
<div class="col"><div class="form"><h3 class="title">Дэмжигчээр бүртгүүлэх</h3><form method="post">
<?if(isset($_SESSION['registered'])&&$_SESSION['registered']){
	echo '<div class="msg">Таны хүсэлтийг бүртгэж авсан, удахгүй бид тантай эргэн холбогдох болно</div>';
}?>
<input type="text" name="data[firstname]" placeholder="Овог" maxlength="50" class="fld" />
<input type="text" name="data[lastname]" placeholder="Нэр" maxlength="50" class="fld" />
<input type="number" name="data[phone]" max="99999999" min="80000000" placeholder="Утасны дугаар" class="fld" />
<input type="email" name="data[email]" placeholder="И-мэйл хаяг" class="fld" />
<textarea class="fld" name="data[msg]" placeholder="Бидэнд илгээх үгс" maxlength="500"></textarea>
<div style="text-align:center;"><input type="submit" value="Бүртгүүлэх" name="do[register]" /></div>
</form></div>
<div class="contact-us">
<h3 class="title">Холбоо барих</h3>
<div>
<?foreach(['email'=>'И-мэйл хаяг','phone'=>'Утасны дугаар','fax'=>'Факс','address'=>'Хаяг','web'=>'Вэб сайт','facebook'=>'Facebook Page','twitter'=>'Twitter account','instagram'=>'Instagram profile','linkedin'=>'LinkedIn page','youtube'=>'Youtube channel','rss'=>'RSS feed URI'] as $k=>$s){
	$val=$k=='web'?$this->req->url('base'):$this->sett($k);
	if($val) echo '<div class="'.$k.'" title="'.$s.'">'.$val.'</div>';
}?></div>
</div></div>
</div>
</div>