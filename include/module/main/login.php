<?php
if($this->acc->logged()) $this->req->url('@');
if($this->req->url('action')=='login'){
	$this->acc->byup(['u'=>$this->req->get('u'),'p'=>$this->req->get('p'),'r'=>$this->req->get('r')=='on']);
	if($this->acc->id) $this->req->url(true);
	else $this->msg('Нэвтрэх мэдээлэл буруу байна','form');
}
$this->css('login');
$this->tit('Та нэвтэрч орно уу');
?>
<div class="login">
	<div class="handler">
		<a href="<?=$this->req->url('base')?>" target="_blank" class="logo"></a>
		<form method="post">
			<input type="text" class="fld" name="u" placeholder="Утас, И-мэйл, Нэвтрэх нэр" tabindex="1" autofocus="true" />
			<input type="password" class="fld" name="p" placeholder="Нууц үг" tabindex="2" />
			<input type="checkbox" name="r" id="r" tabindex="3" /> <label for="r">Компьютерт сануулах</label>
			<input type="submit" name="do[login]" value="Нэвтрэх" tabindex="4" />
		</form>
	</div>
	<script type="text/javascript">var el=$('.handler'),w=Math.abs($(window).width()-el.outerWidth()),h=Math.abs($(document).height()-el.outerHeight());el.css({top:Math.round(Math.random()*h),left:Math.round(Math.random()*w)})</script>
</div>