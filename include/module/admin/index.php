<?php
defined('ADMIN')&&$this->acc->admin or $this->req->url('@');
$dataKey='data';
$sTbl='admins';
$data=$this->acc->a;
$edit=$this->acc->id;
if($this->req->url('action')=='save'){
	$data=$this->req->get($dataKey);
	$rePass=$this->req->get('repass','str');
	if(!$data['firstname']) $this->msg('Овог оруулна уу','form');
	if(!$data['lastname']) $this->msg('Нэр оруулна уу','form');
	if(!$data['gender']) $this->msg('Хүйс сонгоно уу','form');
	if(!$data['username']&&!$data['email']&&!$data['phone']) $this->msg('Утасны дугаар, И-мэйл хаяг, Нэвтрэх нэрийн аль нэгийг нь заавал оруулна уу','form');
	else{
		if($data['username']&&$this->db->count($sTbl,'username="'.$data['username'].'" AND id!='.$edit)) $this->msg('<b>'.$data['username'].'</b> нэвтрэх нэрийг сонгох боломжгүй','form');
		if($data['email']&&$this->db->count($sTbl,'email="'.$data['email'].'" AND id!='.$edit)) $this->msg('<b>'.$data['email'].'</b> и-мэйл хаягийг сонгох боломжгүй','form');
		if($data['phone']&&$this->db->count($sTbl,'phone="'.$data['phone'].'" AND id!='.$edit)) $this->msg('<b>'.$data['phone'].'</b> утасны дугаарыг сонгох боломжгүй','form');
	}
	if($data['password']&&$data['password']!=$rePass) $this->msg('Нууц үг давтахдаа буруу бичсэн байна','form');
	if(!$this->has()){
		if($data['password']) $data['password']=$this->acc->encrypt($data['password']);
		else unset($data['password']);
		if($_FILES['image']['tmp_name']){
			if($edit){
				$prevImg=$this->db->load($sTbl,$edit,'image');
				$p=AVTR.$prevImg.'.jpg';
				if(file_exists($p)) unlink($p);
			}
			$this->load('Image','img',[AVTR]);
			$data['image']=$this->img->genFn();
			$this->img->name($data['image'])->size('100:100:f')->upload('image');
		}
		if(!$data['nickname']) $data['nickname']=$data['lastname'];
		$this->db->modify($sTbl,$data,$edit);
		$this->acc->reload();
		$this->req->url(true);
	}
}
if(!isset($data)) $data=[];
$this->tit('Хувийн мэдээллээ засах');
if(isset($data['id'])) unset($data['id'],$data['password']);
if(isset($data['image'])){
	$sImg=$data['image'];
	unset($data['image']);
}
?>
<div class="pad">
<form method="post" enctype="multipart/form-data">
<div class="form">
<div><label for="firstname" class="rq">Овог</label><div><input type="text" name="<?=$dataKey?>[firstname]" autofocus="true" id="firstname" /></div></div>
<div><label for="lastname" class="rq">Нэр</label><div><input type="text" name="<?=$dataKey?>[lastname]" id="lastname" /></div></div>
<div><label for="nickname">Богино нэр</label><div><input type="text" name="<?=$dataKey?>[nickname]" id="nickname" /></div></div>
<div><label class="rq">Хүйс</label><div><label><input type="radio" name="<?=$dataKey?>[gender]" value="m" id="gender-m" /> Эрэгтэй</label> &nbsp; <label><input type="radio" name="<?=$dataKey?>[gender]" value="f" id="gender-f" /> Эмэгтэй</label></div></div>
<div><label for="image">Зураг</label><div><input type="file" name="image" id="image" accept="image/png,image/jpeg" /></div><img src="<?=$this->acc->img(['image'=>$sImg,'gender'=>$data['gender']])?>" /></div>
<div><label for="position">Албан тушаал</label><div><input type="text" name="<?=$dataKey?>[position]" id="position" /></div></div>
<div><label for="email">И-мэйл хаяг</label><div><input type="text" name="<?=$dataKey?>[email]" id="email" /></div></div>
<div><label for="phone">Утасны дугаар</label><div><input type="text" name="<?=$dataKey?>[phone]" id="phone" /></div></div>
<div><label for="username">Нэвтрэх нэр</label><div><input type="text" name="<?=$dataKey?>[username]" id="username" /></div></div>
<div><label for="password">Нууц үг өөрчлөх бол оруулна уу</label><div><input type="password" name="<?=$dataKey?>[password]" id="password" /></div></div>
<div><label for="repass">Нууц үгээ давтан оруулна уу</label><div><input type="password" name="repass" id="repass" /></div></div>
<div class="buttons"><input type="submit" name="do[save]" class="main" value="SAVE" /></div>
</div></form>
<script type="text/javascript">$.set(<?=json_encode($data)?>);</script>