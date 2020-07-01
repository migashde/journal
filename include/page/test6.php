<?
if($this->acc->id) $this->acc->logout();
$this->req->url(isset($_SERVER['HTTP_REFERER'])?$_SERVER['HTTP_REFERER']:'');
?>