<?php
$error = '';
if($this->acc->logged()) $this->req->url('test');

if($_SERVER["REQUEST_METHOD"] == "POST"){
	
	$t = $this->acc->byup(['u'=>$this->req->get('login'),'p'=>$this->req->get('password'),'r'=>'on']);
	if($this->acc->id) $this->req->url('test');
	else $error = 'Нэвтрэх мэдээлэл буруу байна';
}
$this->tit('Нэвтрэх хэсэг');

if (isset($_GET['url'])) {
  $prev_url = $_GET['url']
;} else {
  $prev_url = '../';
}

?>
<main id="main" class="wrapper" role="msain">
	<section class="midform">
		<h3 class="b-title">Нэвтрэх хэсэг</h3>
		<?php if($error!=''){echo '<p style="color:brown">'.$error.'</p>';}?>
		<form method="post">
			<input type="hidden" name="prev_url" value="<?php echo $prev_url;?>">
			<div class="form-group">
				<label for="login">Имэйл эсвэл утасны дугаар:</label>
				<input type="text" class="form-c" id="login" name="login" placeholder="Имэйл эсвэл утасны дугаараа энд бичнэ үү">
			</div>
			<div class="form-group">
				<label for="password">Нууц үг:</label>
				<input type="password" class="form-c" id="password" name="password" placeholder="Нууц үгээ энд бичнэ үү">
			</div>
			<div class="form-group">
				<input type="checkbox" name="remember" id="remember">
				<label for="remember" class="check">Компьютерт сануулах:</label>
			</div>
			<button type="submit" class="btn">Нэвтрэх</button>
		</form>
	</section>
</main>