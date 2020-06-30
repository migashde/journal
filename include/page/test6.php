<?
$this->cs->rm('login');
$this->cs->rm('id');
$this->cs->rm('type');
$this->req->url(isset($_SERVER['HTTP_REFERER'])?$_SERVER['HTTP_REFERER']:'');
?>